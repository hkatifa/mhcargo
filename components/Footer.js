import { useTranslation } from 'next-i18next/pages'
import Link from 'next/link'

export default function Footer() {
  const { t } = useTranslation('common')

  return (
    <footer className="footer">
      <div className="w-layout-blockcontainer container-full w-container">
        <div className="w-layout-grid grid-footer">
          <div
            id="w-node-fbd7bb69-3220-e6a2-2761-71c20a58d136-0a58d133"
            data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d136"
          >
            <Link
              data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d137"
              href="/"
              className="footer-logo-link w-inline-block"
            >
              <img
                src="/brand/Logo mh cargo White.svg"
                loading="eager"
                alt="MH Cargo Logo"
                className="footer-logo"
              />
            </Link>
            <p className="footer-text" style={{ opacity: 0.7 }}>
              {t('footer.tagline')}
            </p>
            <div className="w-layout-grid grid-footer-link">
              <div
                id="w-node-fbd7bb69-3220-e6a2-2761-71c20a58d13a-0a58d133"
                data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d13a"
              >
                <h2 className="footer-title">{t('footer.pages')}</h2>
                <div className="footer-link-wrap">
                  <Link href="/" className="footer-link">{t('footer.home')}</Link>
                  <Link href="/about" className="footer-link">{t('footer.about-us')}</Link>
                  <Link href="/services" className="footer-link">{t('footer.services-link')}</Link>
                  <Link href="/contact" className="footer-link">{t('footer.contact')}</Link>
                  <Link href="/blog" className="footer-link">{t('footer.blog')}</Link>
                </div>
              </div>
              <div
                id="w-node-fbd7bb69-3220-e6a2-2761-71c20a58d13a-0a58d134"
                data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d13b"
              >
                <h2 className="footer-title">{t('footer.services')}</h2>
                <div className="footer-link-wrap">
                  <Link href="/services/air-freight" className="footer-link">{t('footer.air-cargo')}</Link>
                  <Link href="/services/road-freight" className="footer-link">{t('footer.road-transport')}</Link>
                  <Link href="/services/sea-freight" className="footer-link">{t('footer.ocean-solutions')}</Link>
                  <Link href="/services/storage" className="footer-link">{t('footer.storage')}</Link>
                </div>
              </div>
              <div
                id="w-node-fbd7bb69-3220-e6a2-2761-71c20a58d162-0a58d133"
                data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d162"
              >
                <h3 className="footer-title">{t('footer.contact-info')}</h3>
                <div className="footer-meta-wrap">
                  <div className="footer-meta">
                    <img
                      src="/brand/location.svg"
                      loading="eager"
                      alt="Location Icon"
                      className="footer-meta-icon"
                    />
                    <div>{t('footer.address')}</div>
                  </div>
                  <a href="tel:+212522314567" className="footer-meta w-inline-block">
                    <img
                      src="/brand/phone.svg"
                      loading="eager"
                      alt="Button Icon"
                      className="footer-meta-icon"
                    />
                    <div>+212 522 31 45 67</div>
                  </a>
                </div>
                <div>
                  <h3 className="footer-title">{t('footer.follow-us')}</h3>
                  <div className="footer-social-wrap">
                    <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="footer-social-link w-inline-block">
                      <img src="/brand/linkedin.svg" loading="eager" alt="Social Icon" className="footer-social-icon" />
                    </a>
                    <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="footer-social-link w-inline-block">
                      <img src="/brand/dark-instagram.svg" loading="eager" alt="Social Icon" className="footer-social-icon" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div id="w-node-fbd7bb69-3220-e6a2-2761-71c20a58d184-0a58d133">
            <div
              data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d185"
              className="footer-map-title-wrap"
            >
              <h2 className="footer-map-title">{t('footer.map-title')}</h2>
              <Link href="/contact" className="button-primary-lg w-button">
                {t('footer.ship-package')}
              </Link>
            </div>
            <img
              src="/brand/Map footer.png"
              loading="eager"
              data-w-id="fbd7bb69-3220-e6a2-2761-71c20a58d18a"
              alt="Map Image"
              className="map-image"
            />
          </div>
        </div>
          <p className="copyright-content">
            {t('footer.copyright')}
          </p>
      </div>
    </footer>
  )
}
