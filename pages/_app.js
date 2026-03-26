import '@/styles/overrides.css'
import '@/styles/custom.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { appWithTranslation } from 'next-i18next/pages'

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

  useEffect(() => {
    // Load Webflow's webpack runtime after React hydration.
    if (!document.querySelector('script[src="/lib/webflow-page.js"]')) {
      const s = document.createElement('script')
      s.src = '/lib/webflow-page.js'
      s.type = 'text/javascript'
      document.body.appendChild(s)
    }

    let observer = initScrollReveal()
    let imageObserver = initImageOverlays()

    // On first visit, the CDN page script (Webflow IX2) isn't cached yet.
    // It loads after our initial scan and sets opacity:0 on elements we missed.
    // Re-scan at 1s and 3s to catch those late-hidden elements.
    const rescan = () => {
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      observer = initScrollReveal()
      imageObserver = initImageOverlays()
    }
    const t1 = setTimeout(rescan, 1000)
    const t2 = setTimeout(rescan, 3000)

    const handleRouteChange = () => {
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      setTimeout(() => {
        observer = initScrollReveal()
        imageObserver = initImageOverlays()
        // Re-initialize Webflow interactions after client-side navigation
        if (typeof window !== 'undefined' && window.Webflow) {
          window.Webflow.destroy()
          window.Webflow.ready()
        }
      }, 100)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}

export default appWithTranslation(App)
