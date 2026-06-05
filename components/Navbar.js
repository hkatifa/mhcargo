import { useState, useEffect } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar({ currentPage, localeAlternates }) {
  const { t } = useTranslation('common')
  const router = useRouter()

  // React-driven nav (replaces the removed Webflow runtime).
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)

  // Close the mobile menu / dropdown on client-side navigation.
  useEffect(() => {
    const close = () => { setMenuOpen(false); setServicesOpen(false) }
    router.events.on('routeChangeComplete', close)
    return () => router.events.off('routeChangeComplete', close)
  }, [router.events])

  const isCurrentPage = (page) => currentPage === page ? 'w--current' : ''
  const ariaCurrent = (page) => currentPage === page ? 'page' : undefined

  const switchLocale = (locale) => {
    // Blog posts pass per-locale paths because EN/FR slugs differ. Route to the
    // target locale's OWN slug; if it isn't translated, go to that locale's blog
    // index instead of reusing this slug (which would 404).
    if (localeAlternates) {
      const target = localeAlternates[locale]
      router.push(target || '/blog', undefined, { locale })
      return
    }
    // Every other page shares the same path across locales — swap locale only.
    router.push(router.pathname, router.asPath, { locale })
  }

  const onKeyToggle = (setter) => (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      setter((v) => !v)
    }
  }

  return (
    <div
      data-collapse="medium"
      role="banner"
      className="navbar w-nav"
    >
      <div className="container-full w-container">
        <div className="w-layout-grid grid-navbar">
          <Link
            id="w-node-_676be7f9-dd44-5120-e296-de49d3466870-d346686d"
            href="/"
            aria-current={ariaCurrent('/')}
            className={`brand w-nav-brand ${isCurrentPage('/')}`}
          >
            <img
              src="/brand/Logo-mh-cargo.svg"
              loading="lazy"
              alt="MH Cargo logo"
              className="logo"
            />
          </Link>
          <nav role="navigation" className={`nav-menu w-nav-menu ${menuOpen ? 'nav-open' : ''}`}>
            <div className="nav-link-wrap">
              <Link
                href="/"
                aria-current={ariaCurrent('/')}
                className={`nav-link w-nav-link ${isCurrentPage('/')}`}
              >
                {t('nav.home')}
              </Link>
              <div className="nav-link-underline"></div>
            </div>
            <div className={`nav-link w-dropdown ${servicesOpen ? 'nav-dropdown-open' : ''}`}>
              <div
                className="dropdown-toggle w-dropdown-toggle"
                role="button"
                tabIndex={0}
                aria-haspopup="true"
                aria-expanded={servicesOpen}
                onClick={() => setServicesOpen((v) => !v)}
                onKeyDown={onKeyToggle(setServicesOpen)}
              >
                <div>{t('nav.services')}</div>
                <div className="dropdown-icon w-icon-dropdown-toggle"></div>
              </div>
              <nav className={`dropdown-list w-dropdown-list dropdown-services-list ${servicesOpen ? 'w--open' : ''}`}>
                <Link href="/services/air-freight" aria-current={ariaCurrent('/services/air-freight')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/air-freight')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <img src="/brand/service-01.svg" alt="Air Freight" className="dropdown-service-icon" />
                  </div>
                  <span>{t('nav.air-cargo')}</span>
                </Link>
                <Link href="/services/sea-freight" aria-current={ariaCurrent('/services/sea-freight')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/sea-freight')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <img src="/brand/service-03.svg" alt="Sea Freight" className="dropdown-service-icon" />
                  </div>
                  <span>{t('nav.ocean-solutions')}</span>
                </Link>
                <Link href="/services/road-freight" aria-current={ariaCurrent('/services/road-freight')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/road-freight')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <img src="/brand/service-02.svg" alt="Road Freight" className="dropdown-service-icon" />
                  </div>
                  <span>{t('nav.road-transport')}</span>
                </Link>
                <Link href="/services/storage" aria-current={ariaCurrent('/services/storage')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/storage')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <Image src="/brand/service-04.png" width={40} height={40} alt="storage" className="dropdown-service-icon" />
                  </div>
                  <span>{t('nav.storage')}</span>
                </Link>
              </nav>
            </div>
            <div className="nav-link-wrap">
              <Link
                href="/about"
                aria-current={ariaCurrent('/about')}
                className={`nav-link w-nav-link ${isCurrentPage('/about')}`}
              >
                {t('nav.about')}
              </Link>
              <div className="nav-link-underline"></div>
            </div>
            <div className="nav-link-wrap">
              <Link
                href="/blog"
                aria-current={ariaCurrent('/blog')}
                className={`nav-link w-nav-link ${isCurrentPage('/blog')}`}
              >
                {t('nav.blog')}
              </Link>
              <div className="nav-link-underline"></div>
            </div>
            <div className="nav-link-wrap">
              <Link
                href="/contact"
                aria-current={ariaCurrent('/contact')}
                className={`nav-link w-nav-link ${isCurrentPage('/contact')}`}
              >
                {t('nav.contact')}
              </Link>
              <div className="nav-link-underline"></div>
            </div>
          </nav>
          <div
            id="w-node-_676be7f9-dd44-5120-e296-de49d3466897-d346686d"
            className="right-navbar"
            style={{display:'flex', flexDirection:'row', alignItems:'center', gap:'12px'}}
          >
            <div className="lang-switcher" style={{display:'flex',alignItems:'center',gap:'4px'}}>
              <button
                onClick={() => switchLocale('en')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: router.locale === 'en' ? '700' : '400',
                  color: router.locale === 'en' ? '#212C42' : '#666',
                  padding: '2px 4px',
                  letterSpacing: '0.05em',
                }}
              >
                EN
              </button>
              <span style={{color:'#ccc',fontSize:'12px'}}>|</span>
              <button
                onClick={() => switchLocale('fr')}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  fontSize: '13px',
                  fontWeight: router.locale === 'fr' ? '700' : '400',
                  color: router.locale === 'fr' ? '#212C42' : '#666',
                  padding: '2px 4px',
                  letterSpacing: '0.05em',
                }}
              >
                FR
              </button>
            </div>
            <Link
              href="/request-a-quote"
              className="button-primary mobile-hide w-inline-block"
            >
              <div className="button-primary-text">{t('nav.get-quote')}</div>
              <div className="button-primary-hover"></div>
            </Link>
            <div
              className={`menu-button w-nav-button ${menuOpen ? 'w--open' : ''}`}
              role="button"
              tabIndex={0}
              aria-label="Menu"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
              onKeyDown={onKeyToggle(setMenuOpen)}
            >
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
