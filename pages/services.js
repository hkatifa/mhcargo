import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Link from 'next/link'
import Layout from '@/components/Layout'
import Script from 'next/script'

export default function Services() {
  const { t } = useTranslation(['common', 'services'])

  return (
    <Layout
      title="Services | MH Cargo"
      currentPage="/services"
      pageId="6592715418147d2fdfc71ef1"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <section className="service-hero-section">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-service-hero">
            <div id="w-node-_4bbf207f-652d-1d86-67f2-88c9685d9ee9-dfc71ef1" className="service-hero-content">
              <div>
                <h1 data-w-id="d864f65b-f9ea-ec3f-343b-b73d185b55c3" style={{opacity: 0}}>{t('services:hero.title-pre')} <span className="text-primary-1">{t('services:hero.title-highlight')}</span></h1>
                <p data-w-id="6e23ddf2-190f-3e66-87a6-05dbfbb15527" style={{opacity: 0}}>{t('services:hero.desc')}</p>
              </div>
              <Link data-w-id="ef674c8a-2fc1-d20f-f01b-a4aa025affa6" style={{opacity: 0}} href="/contact" className="button-primary w-inline-block">
                <div className="button-primary-text">{t('services:hero.cta')}</div>
                <div style={{width: '0%', height: '100%'}} className="button-primary-hover"></div>
              </Link>
            </div>
            <div id="w-node-_21618275-47b8-66ce-e38b-630a2de5d185-dfc71ef1" data-w-id="21618275-47b8-66ce-e38b-630a2de5d185" className="service-hero-image-wrap">
              <img src="/brand/truck-01.png" loading="eager" style={{WebkitTransform: 'translate3d(110%, -50px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(110%, -50px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(110%, -50px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(110%, -50px, 0) scale3d(1, 1, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'}} alt="Truck Image" className="service-hero-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="step-section section-spacing">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-step-wrap">
            <div id="w-node-_0c551e51-f1f1-70e0-8cc2-18842133d63a-dfc71ef1" data-w-id="0c551e51-f1f1-70e0-8cc2-18842133d63a" style={{opacity: 0}} className="step-image-wrap">
              <img src="/brand/Step-01.jpg" loading="eager" alt="Step Image" className="step-image" />
            </div>
            <div id="w-node-_7a0ad679-ab26-af59-ebcb-893bd41c06e0-dfc71ef1" className="step-content">
              <div className="step-white-decoration"></div>
              <div className="step-wrap">
                <div className="section-title">
                  <h2 data-w-id="751dae83-8a20-0428-3ba3-0c6ba27c9179" style={{opacity: 0}} className="text-white">{t('steps.title')}</h2>
                </div>
                <div className="w-layout-grid grid-step">
                  <div id="w-node-_751dae83-8a20-0428-3ba3-0c6ba27c917c-dfc71ef1" data-w-id="751dae83-8a20-0428-3ba3-0c6ba27c917c" style={{opacity: 0}} className="step-item">
                    <div className="step-number-wrap">
                      <div className="step-number">01</div>
                      <div className="step-number-rounded"></div>
                    </div>
                    <h3 className="heading-h6 text-white">{t('steps.step1.title')}</h3>
                    <p className="text-gray-3">{t('steps.step1.desc')}</p>
                  </div>
                  <div id="w-node-_751dae83-8a20-0428-3ba3-0c6ba27c9185-dfc71ef1" data-w-id="751dae83-8a20-0428-3ba3-0c6ba27c9185" style={{opacity: 0}} className="step-item">
                    <div className="step-number-wrap">
                      <div className="step-number-rounded"></div>
                      <div className="step-number">02</div>
                    </div>
                    <h3 className="heading-h6 text-white">{t('steps.step2.title')}</h3>
                    <p className="text-gray-3">{t('steps.step2.desc')}</p>
                  </div>
                  <div id="w-node-_751dae83-8a20-0428-3ba3-0c6ba27c918e-dfc71ef1" data-w-id="751dae83-8a20-0428-3ba3-0c6ba27c918e" style={{opacity: 0}} className="step-item">
                    <div className="step-number-wrap">
                      <div className="step-number">03</div>
                      <div className="step-number-rounded"></div>
                    </div>
                    <h3 className="heading-h6 text-white">{t('steps.step3.title')}</h3>
                    <p className="text-gray-3">{t('steps.step3.desc')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section section-spacing">
        <div className="w-layout-blockcontainer container-full w-container">
          <div data-w-id="804e3648-389e-d9ec-22f4-b69045303d50" className="section-title section-title-wrap">
            <h2>{t('services.section-title')}</h2>
          </div>
          <div data-w-id="1850ee1d-112c-9c94-95db-178150dee8a9" className="service-list">
            <Link data-w-id="52b43a66-918b-d8e9-9ed9-f4dfa30f6b79" href="/services/air-freight" className="grid-service-item w-inline-block">
              <div><h3 className="service-number">01</h3><p>{t('services.air.desc')}</p></div>
              <div className="text-center"><h3 className="service-title">{t('services.air.title')}</h3></div>
              <div className="service-image-wrap"><img src="/brand/service-01.svg" loading="eager" alt="Service Image" className="service-image" /></div>
              <div><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div className="service-divider"></div>
            </Link>
            <Link data-w-id="c0d2b5a8-ea50-aa8f-fe89-a1a8acd819d2" href="/services/road-freight" className="grid-service-item w-inline-block">
              <div><h3 className="service-number">02</h3><p>{t('services.road.desc')}</p></div>
              <div className="text-center"><h3 className="service-title">{t('services.road.title')}</h3></div>
              <div className="service-image-wrap"><img src="/brand/service-02.svg" loading="eager" alt="Service Image" className="service-image" /></div>
              <div><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div className="service-divider"></div>
            </Link>
            <Link data-w-id="18263d14-2db4-39ef-95d2-fbc85aa9be80" href="/services/sea-freight" className="grid-service-item w-inline-block">
              <div><h3 className="service-number">03</h3><p>{t('services.sea.desc')}</p></div>
              <div className="text-center"><h3 className="service-title">{t('services.sea.title')}</h3></div>
              <div className="service-image-wrap"><img src="/brand/service-03.svg" loading="eager" alt="Service Image" className="service-image" /></div>
              <div><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div className="service-divider"></div>
            </Link>
            <Link data-w-id="18263d14-2db4-39ef-95d2-fbc85aa9be80c" href="/services/storage" className="grid-service-item w-inline-block">
              <div><h3 className="service-number">04</h3><p>{t('services.storage.desc')}</p></div>
              <div className="text-center"><h3 className="service-title">{t('services.storage.title')}</h3></div>
              <div className="service-image-wrap"><img src="/brand/service-04.png" loading="eager" alt="Service Image" className="service-image" /></div>
              <div><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div className="service-divider"></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="action-box-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container w-container">
          <div data-w-id="f04c381c-a085-c13b-3786-f5925b3ce476" style={{opacity: 0}} className="w-layout-grid grid-action-box">
            <div id="w-node-_4f1c7dee-3812-14a9-30fb-67322b2f42b5-dfc71ef1" data-w-id="4f1c7dee-3812-14a9-30fb-67322b2f42b5" style={{opacity: 0}}>
              <h2 className="text-white">{t('action-box.text')}</h2>
            </div>
            <Link id="w-node-_8de905c7-16c1-0a78-2c7e-44254c5ce911-dfc71ef1" data-w-id="8de905c7-16c1-0a78-2c7e-44254c5ce911" href="/contact" className="action-box-button w-inline-block">
              <div className="action-box-title">{t('action-box.button')}</div>
              <div style={{WebkitTransform: 'translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', MozTransform: 'translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', msTransform: 'translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)', transform: 'translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'}} className="action-box-button-hover"></div>
            </Link>
          </div>
        </div>
      </section>

      <Script id="step-scroll-reveal" strategy="afterInteractive" dangerouslySetInnerHTML={{ __html: `
        (function() {
          var el = document.querySelector('.step-content');
          if (!el) return;
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          new IntersectionObserver(function(entries, io) {
            if (entries[0].isIntersecting) {
              el.style.transition = 'opacity 0.65s ease, transform 0.65s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
              io.disconnect();
            }
          }, { threshold: 0.15 }).observe(el);
        })();
      `}} />
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'services'])),
    },
  }
}
