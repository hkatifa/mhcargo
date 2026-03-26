import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function Storage() {
  const { t } = useTranslation(['common', 'storage'])

  return (
    <Layout
      title="Storage & Warehousing | MH Cargo"
      currentPage="/services/storage"
      pageId="658fc80c237aa7cdad09b4e5"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <section className="service-detail-section">
        <div className="w-layout-blockcontainer container w-container">
          <div data-w-id="f50eba78-75c9-ab47-4869-fd427a409e12" style={{opacity: 0}} className="service-detail-hero-wrap">
            <h1 data-w-id="bcad01a5-ab09-5b58-0c42-99cf5fe8db5c" style={{opacity: 0}} className="heading-h2 text-white">{t('storage:page.title')}</h1>
            <img src="/brand/big-service-04.png" loading="eager" style={{opacity: 0}} data-w-id="407d0a5f-2cba-e22a-be98-b0e96a15cd33" alt="Service Image" className="service-detail-image" />
          </div>
        </div>
      </section>

      <section className="service-info-section">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-service-info">
            <div id="w-node-_81d7f483-d870-be31-a398-cab606ea51c2-ad09b4e5">
              <div>
                <h2 data-w-id="5a582872-4b96-4b79-4811-0d2dcd269d52" style={{opacity: 0}} className="heading-h5">{t('storage:hero.heading')}</h2>
                <p data-w-id="be9e43a5-4fce-0a9f-b8c6-a4986c61be56" style={{opacity: 0}}>{t('storage:hero.desc')}</p>
                <img className="service-info-image" src="/brand/service-storage-info-01.jpg" alt="Service Info Image" style={{opacity: 0}} data-w-id="c263b62d-2212-4c42-de5e-7ac8c5e9d39a" loading="eager" />
                <h2 data-w-id="931a641f-a55c-b361-60fb-6edd2a6ad601" style={{opacity: 0}} className="heading-h5">{t('storage:included.title')}</h2>
                <p data-w-id="ca642dbd-33fc-4133-7abc-6e0e785619b4" style={{opacity: 0}}>{t('storage:included.desc')}</p>
              </div>
              <div className="service-feature-list">
                <div data-w-id="75c80190-f89e-3138-6153-fa5c64fbb874" style={{opacity: 0}}>
                  <h2 className="heading-h5">{t('storage:feature1.title')}</h2>
                  <p>{t('storage:feature1.desc')}</p>
                </div>
                <div data-w-id="c16f76fb-6140-547a-0720-176fbb00f924" style={{opacity: 0}}>
                  <h2 className="heading-h5">{t('storage:feature2.title')}</h2>
                  <p>{t('storage:feature2.desc')}</p>
                </div>
                <div data-w-id="13e67113-896c-802c-30b2-14b31e044264" style={{opacity: 0}}>
                  <h2 className="heading-h5">{t('storage:feature3.title')}</h2>
                  <p>{t('storage:feature3.desc')}</p>
                </div>
              </div>
              <div className="w-layout-grid grid-why-choose-us">
                <div id="w-node-c0cb7bd5-f3c7-51cc-4a91-1932f9ae21e2-ad09b4e5" data-w-id="c0cb7bd5-f3c7-51cc-4a91-1932f9ae21e2" style={{opacity: 0}} className="why-choose-us-image-wrap">
                  <img src="/brand/service-storage-info-02.jpg" loading="eager" alt="Service Info Image" className="why-choose-us-image" />
                </div>
                <div id="w-node-e68b6a9f-55c2-9351-2506-62b164b07f25-ad09b4e5">
                  <h2 data-w-id="96fecc7f-1fe9-db1c-f759-48e1fc50e623" style={{opacity: 0}} className="heading-h5">{t('storage:why.title')}</h2>
                  <p data-w-id="96fecc7f-1fe9-db1c-f759-48e1fc50e625" style={{opacity: 0}}>{t('storage:why.desc')}</p>
                  <div data-w-id="68ae620d-8387-df3c-8913-8517c8c062cb" style={{opacity: 0}} className="why-choose-us-list">
                    <div className="why-choose-us-list-item"><img src="/brand/dark-list-icon.svg" loading="eager" alt="" className="why-choose-us-icon" /><div>{t('storage:why.bullet1')}</div></div>
                    <div className="why-choose-us-list-item"><img src="/brand/dark-list-icon.svg" loading="eager" alt="" className="why-choose-us-icon" /><div>{t('storage:why.bullet2')}</div></div>
                    <div className="why-choose-us-list-item"><img src="/brand/dark-list-icon.svg" loading="eager" alt="" className="why-choose-us-icon" /><div>{t('storage:why.bullet3')}</div></div>
                    <div className="why-choose-us-list-item"><img src="/brand/dark-list-icon.svg" loading="eager" alt="" className="why-choose-us-icon" /><div>{t('storage:why.bullet4')}</div></div>
                    <div className="why-choose-us-list-item"><img src="/brand/dark-list-icon.svg" loading="eager" alt="" className="why-choose-us-icon" /><div>{t('storage:why.bullet5')}</div></div>
                  </div>
                </div>
              </div>
            </div>
            <div id="w-node-_6ae38059-c327-06aa-2e7b-7befd42be52c-ad09b4e5">
              <div data-w-id="520d0d71-5b9c-2ec7-6f06-42aa84cd8d15" style={{opacity: 0}} className="service-info-contact">
                <h3 className="heading-h6">{t('service-contact.heading')}</h3>
                <div className="service-info-list">
                  <div className="service-info-item">
                    <div className="tracking-contact-icon-wrap"><img src="/brand/phone.svg" loading="eager" alt="Button Icon" className="tracking-contact-icon" /></div>
                    <div>{t('service-contact.support')}</div>
                    <div className="service-info-wrap"><a href="tel:+212522314567" className="service-info-title">+212 522 31 45 67</a></div>
                  </div>
                  <div className="service-info-item">
                    <div className="tracking-contact-icon-wrap"><img src="/brand/email.svg" loading="eager" alt="Email Icon" className="tracking-contact-icon" /></div>
                    <div>{t('service-contact.email-label')}</div>
                    <a href="mailto:sales@mhcargo.ma" className="service-info-title">sales@mhcargo.ma</a>
                  </div>
                </div>
                <Link href="/contact" className="button-icon w-inline-block">
                  <img src="/brand/phone.svg" loading="lazy" alt="Button Icon" className="button-image" />
                  <div>{t('service-contact.contact-us')}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="service-section section-spacing">
        <div className="w-layout-blockcontainer container-full w-container">
          <div data-w-id="804e3648-389e-d9ec-22f4-b69045303d50" className="section-title section-title-wrap">
            <h2>{t('related-services')}</h2>
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
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'storage'])),
    },
  }
}
