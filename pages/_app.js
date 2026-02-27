import '@/styles/overrides.css'
import '@/styles/custom.css'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function initScrollReveal() {
  const webflowActive = typeof window !== 'undefined' && window.Webflow && window.Webflow.require
  const candidates = document.querySelectorAll('[data-w-id]')
  const pageId = document.documentElement.getAttribute('data-wf-page')
  const toReveal = []

  candidates.forEach(el => {
    const animName = getComputedStyle(el).animationName
    if (animName && animName !== 'none') return

    if (webflowActive && pageId) {
      const shortPageId = pageId.slice(-8)
      const matchingWNode = el.closest(`[id$="-${shortPageId}"]`)
      if (matchingWNode) return
    }

    if (el.style.opacity === '0') {
      el.style.transform = 'translateY(20px)'
      el.style.transition = 'opacity 0.65s ease, transform 0.65s ease'
      toReveal.push(el)
    }
  })

  // Also handle [data-reveal] elements (custom scroll-reveal, e.g. corridor boxes)
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (el.style.opacity === '0') {
      if (!el.style.transform) el.style.transform = 'translateY(20px)'
      if (!el.style.transition) el.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
      toReveal.push(el)
    }
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

export default function App({ Component, pageProps }) {
  const router = useRouter()

  useEffect(() => {
    let observer = initScrollReveal()
    let imageObserver = initImageOverlays()

    const handleRouteChange = () => {
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      setTimeout(() => {
        observer = initScrollReveal()
        imageObserver = initImageOverlays()
      }, 50)
    }

    router.events.on('routeChangeComplete', handleRouteChange)

    return () => {
      observer.disconnect()
      if (imageObserver) imageObserver.disconnect()
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [])

  return <Component {...pageProps} />
}
