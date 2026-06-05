import '@/styles/overrides.css'
import '@/styles/custom.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next/pages'
import { GoogleAnalytics } from '@next/third-parties/google'
import { DM_Sans } from 'next/font/google'

// Self-hosted, non-render-blocking DM Sans (replaces the Google Fonts <link>).
// Variable font covers all weights used (300–700) + italic; opsz axis preserves
// the original optical sizing. Exposed as a CSS variable consumed by overrides.css.
const dmSans = DM_Sans({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  axes: ['opsz'],
  display: 'swap',
  variable: '--font-dm-sans',
})

function initScrollReveal() {
  const candidates = document.querySelectorAll('[data-w-id]')
  const toReveal = []

  candidates.forEach(el => {
    // Use computed opacity — CSS animations with fill-mode:both keep computed
    // opacity at 1 after completion even if the inline attr still says 0.
    // This prevents rescans from overriding finished CSS animations.
    const computed = getComputedStyle(el)
    if (parseFloat(computed.opacity) > 0) return

    el.style.transform = 'translateY(20px)'
    el.style.transition = 'opacity 0.65s ease, transform 0.65s ease'
    toReveal.push(el)
  })

  // Also handle [data-reveal] elements (custom scroll-reveal, e.g. corridor boxes)
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (parseFloat(getComputedStyle(el).opacity) > 0) return
    if (!el.style.transform) el.style.transform = 'translateY(20px)'
    if (!el.style.transition) el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
    toReveal.push(el)
  })

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1'
        entry.target.style.transform = entry.target.dataset.revealTransform || 'translateY(0)'
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.1 })

  toReveal.forEach(el => observer.observe(el))
  return observer
}

function initImageOverlays() {
  // Replace Webflow's slow image-scroll-overlay (1000ms delay + 800ms) with a fast slide-in
  const wraps = document.querySelectorAll('.about-image-wrap')
  if (!wraps.length) return null

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target.querySelector('.about-image')
        if (img) {
          img.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
          img.style.opacity = '1'
          img.style.transform = 'translateX(0)'
        }
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.2 })

  wraps.forEach(el => observer.observe(el))
  return observer
}

function App({ Component, pageProps }) {
  const router = useRouter()

  // Keep <html lang> correct on client-side locale switches (SSR sets it in _document).
  useEffect(() => {
    if (router.locale) document.documentElement.lang = router.locale
  }, [router.locale])

  useEffect(() => {
    let observer = initScrollReveal()
    let imageObserver = initImageOverlays()

    const handleRouteChange = () => {
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      setTimeout(() => {
        observer = initScrollReveal()
        imageObserver = initImageOverlays()
      }, 100)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return (
    <div className={dmSans.variable}>
      <Component {...pageProps} />
      {process.env.NEXT_PUBLIC_GA_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
      )}
    </div>
  )
}

export default appWithTranslation(App)
