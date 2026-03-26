import { useTranslation } from 'next-i18next/pages'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function Navbar({ currentPage }) {
  const { t } = useTranslation('common')
  const router = useRouter()

  const isCurrentPage = (page) => currentPage === page ? 'w--current' : ''
  const ariaCurrent = (page) => currentPage === page ? 'page' : undefined

  const switchLocale = (locale) => {
    router.push(router.pathname, router.asPath, { locale })
  }

  return (
    <div
      data-animation="default"
      data-collapse="medium"
      data-duration="400"
      data-easing="ease"
      data-easing2="ease"
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
          <nav role="navigation" className="nav-menu w-nav-menu">
            <div data-w-id="676be7f9-dd44-5120-e296-de49d346687" className="nav-link-wrap">
              <Link
                href="/"
                aria-current={ariaCurrent('/')}
                className={`nav-link w-nav-link ${isCurrentPage('/')}`}
              >
                {t('nav.home')}
              </Link>
              <div className="nav-link-underline"></div>
            </div>
            <div
              data-hover="true"
              data-delay="0"
              data-w-id="676be7f9-dd44-5120-e296-de49d346687f"
              className="nav-link w-dropdown"
            >
              <div className="dropdown-toggle w-dropdown-toggle">
                <div>{t('nav.services')}</div>
                <div className="dropdown-icon w-icon-dropdown-toggle"></div>
              </div>
              <nav className="dropdown-list w-dropdown-list dropdown-services-list">
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
                    <img src="/brand/service-04.png" alt="storage" className="dropdown-service-icon" />
                  </div>
                  <span>{t('nav.storage')}</span>
                </Link>
              </nav>
            </div>
            <div data-w-id="676be7f9-dd44-5120-e296-de49d3466877" className="nav-link-wrap">
              <Link
                href="/about"
                aria-current={ariaCurrent('/about')}
                className={`nav-link w-nav-link ${isCurrentPage('/about')}`}
              >
                {t('nav.about')}
              </Link>
              <div className="nav-link-underline"></div>
            </div>
            <div data-w-id="676be7f9-dd44-5120-e296-de49d346687b" className="nav-link-wrap">
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
              data-w-id="676be7f9-dd44-5120-e296-de49d3466898"
              href="/request-a-quote"
              className="button-primary mobile-hide w-inline-block"
            >
              <div className="button-primary-text">{t('nav.get-quote')}</div>
              <div className="button-primary-hover"></div>
            </Link>
            <div className="menu-button w-nav-button">
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
