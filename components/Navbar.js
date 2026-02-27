export default function Navbar({ currentPage }) {
  const isCurrentPage = (page) => currentPage === page ? 'w--current' : ''
  const ariaCurrent = (page) => currentPage === page ? 'page' : undefined

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
          <a
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
          </a>
          <nav role="navigation" className="nav-menu w-nav-menu">
            <div data-w-id="676be7f9-dd44-5120-e296-de49d3466873" className="nav-link-wrap">
              <a
                href="/"
                aria-current={ariaCurrent('/')}
                className={`nav-link w-nav-link ${isCurrentPage('/')}`}
              >
                Home
              </a>
              <div className="nav-link-underline"></div>
            </div>
            <div
              data-hover="true"
              data-delay="0"
              data-w-id="676be7f9-dd44-5120-e296-de49d346687f"
              className="nav-link w-dropdown"
            >
              <div className="dropdown-toggle w-dropdown-toggle">
                <div>Services</div>
                <div className="dropdown-icon w-icon-dropdown-toggle"></div>
              </div>
              <nav className="dropdown-list w-dropdown-list dropdown-services-list">
                <a href="/services/air-freight" aria-current={ariaCurrent('/services/air-freight')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/air-freight')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <img src="/brand/service-01.svg" alt="Air Freight" className="dropdown-service-icon" />
                  </div>
                  <span>Air Cargo</span>
                </a>
                <a href="/services/sea-freight" aria-current={ariaCurrent('/services/sea-freight')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/sea-freight')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <img src="/brand/service-03.svg" alt="Sea Freight" className="dropdown-service-icon" />
                  </div>
                  <span>Ocean Solutions</span>
                </a>
                <a href="/services/road-freight" aria-current={ariaCurrent('/services/road-freight')} className={`dropdown-service-item w-dropdown-link ${isCurrentPage('/services/road-freight')}`}>
                  <div className="dropdown-service-icon-wrap">
                    <img src="/brand/service-02.svg" alt="Road Freight" className="dropdown-service-icon" />
                  </div>
                  <span>Road Transport</span>
                </a>
              </nav>
            </div>
            <div data-w-id="676be7f9-dd44-5120-e296-de49d3466877" className="nav-link-wrap">
              <a
                href="/about"
                aria-current={ariaCurrent('/about')}
                className={`nav-link w-nav-link ${isCurrentPage('/about')}`}
              >
                About
              </a>
              <div className="nav-link-underline"></div>
            </div>
            <div data-w-id="676be7f9-dd44-5120-e296-de49d346687b" className="nav-link-wrap">
              <a
                href="/contact"
                aria-current={ariaCurrent('/contact')}
                className={`nav-link w-nav-link ${isCurrentPage('/contact')}`}
              >
                Contact
              </a>
              <div className="nav-link-underline"></div>
            </div>
          </nav>
          <div
            id="w-node-_676be7f9-dd44-5120-e296-de49d3466897-d346686d"
            className="right-navbar"
          >
            <a
              data-w-id="676be7f9-dd44-5120-e296-de49d3466898"
              href="/request-a-quote"
              className="button-primary mobile-hide w-inline-block"
            >
              <div className="button-primary-text">Get a quote</div>
              <div className="button-primary-hover"></div>
            </a>
            <div className="menu-button w-nav-button">
              <div className="w-icon-nav-menu"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
