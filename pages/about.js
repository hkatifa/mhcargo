import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Link from 'next/link'
import Layout from '@/components/Layout'

export default function About() {
  const { t } = useTranslation(['common', 'about'])

  return (
    <Layout
      title="About | MH Cargo - Logistics &amp; Transportation"
      currentPage="/about"
      pageId="658ff12c60c313eea3532edf"
      pageScript="/lib/webflow-page.js"
    >
      <section className="about-hero-section">
        <div className="w-layout-blockcontainer container-full w-container">
          <div id="w-node-faa651a6-d729-4282-bf38-57fea1d829bf-a3532edf">
            <h1 data-w-id="a802fa52-5cc4-0f34-c956-62d9e7a6b781" style={{opacity:0}} className="about-hero-title">Your <span className="text-primary-1">{t('about:hero.title-highlight')}</span> {t('about:hero.title-post')}</h1>
          </div>
          <div className="w-layout-grid grid-about-hero">
            <div id="w-node-_502a0203-b0e3-cc2b-7958-07c3226875a6-a3532edf" data-w-id="502a0203-b0e3-cc2b-7958-07c3226875a6" style={{opacity:0}} className="about-hero-image-wrap">
              <div className="about-hero-image"></div>
            </div>
            <div id="w-node-ba15fed9-a70e-bb39-cfd0-7cf0715c27d3-a3532edf" className="about-hero-contact">
              <p data-w-id="fdd0fbec-ea9c-8bcb-665e-93f307a47142" style={{opacity:0}}>{t('about:hero.desc')}</p>
              <div className="w-layout-grid grid-about-hero-counter">
                <div id="w-node-_59479764-46e4-396c-43fe-157b20c55667-a3532edf" data-w-id="59479764-46e4-396c-43fe-157b20c55667" style={{opacity:0}} className="about-hero-counter-item">
                  <h2 className="about-hero-counter-title">15<span className="text-primary-1">+</span></h2>
                  <div>{t('about:hero.years')}</div>
                </div>
                <div id="w-node-_59479764-46e4-396c-43fe-157b20c5566e-a3532edf" data-w-id="59479764-46e4-396c-43fe-157b20c5566e" style={{opacity:0}} className="about-hero-counter-item">
                  <h2 className="about-hero-counter-title">200<span className="text-primary-1">+</span></h2>
                  <div>{t('about:hero.partners')}</div>
                </div>
                <div id="w-node-_59479764-46e4-396c-43fe-157b20c55675-a3532edf" data-w-id="59479764-46e4-396c-43fe-157b20c55675" style={{opacity:0}} className="about-hero-counter-item">
                  <h2 className="about-hero-counter-title">99<span className="text-primary-1">%</span></h2>
                  <div>{t('about:hero.ontime')}</div>
                </div>
                <div id="w-node-_59479764-46e4-396c-43fe-157b20c5567c-a3532edf" data-w-id="59479764-46e4-396c-43fe-157b20c5567c" style={{opacity:0}} className="about-hero-counter-item">
                  <h2 className="about-hero-counter-title">120<span className="text-primary-1">+</span></h2>
                  <div>{t('about:hero.countries')}</div>
                </div>
              </div>
              <Link data-w-id="0bcbee58-1b60-a3af-6cbe-e61b06f28e42" style={{opacity:0}} href="/services" className="button-primary w-inline-block">
                <div className="button-primary-text">{t('about:hero.view-services')}</div>
                <div style={{width:'0%',height:'100%'}} className="button-primary-hover"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="our-value-section section-spacing">
        <div className="w-layout-blockcontainer container w-container">
          <div className="w-layout-grid grid-our-value-title">
            <div id="w-node-_04e4da99-0fc2-3bb9-88ad-9b5de9867047-a3532edf" data-w-id="04e4da99-0fc2-3bb9-88ad-9b5de9867047" style={{opacity:0}}>
              <h2>{t('about:values.title')}</h2>
            </div>
            <div id="w-node-f649aa17-6be6-0ac4-100c-d7d02704ce3e-a3532edf">
              <p data-w-id="734c662f-bcc6-e542-949a-55de71368f8d" style={{opacity:0}}>{t('about:values.desc')}</p>
            </div>
          </div>
          <div className="w-layout-grid grid-our-value">
            <div id="w-node-_4d42ca71-f84a-d213-6b9b-6addd2fb6029-a3532edf" data-w-id="4d42ca71-f84a-d213-6b9b-6addd2fb6029" style={{opacity:0}} className="our-value-item">
              <img src="/brand/value-01.svg" loading="eager" alt="Our Value Icon" className="our-value-icon" />
              <h3 className="heading-h6">{t('about:values.global-reach.title')}</h3>
              <p>{t('about:values.global-reach.desc')}</p>
            </div>
            <div id="w-node-_884760a1-a773-ad82-be79-48e7137ce298-a3532edf" data-w-id="884760a1-a773-ad82-be79-48e7137ce298" style={{opacity:0}} className="our-value-item">
              <img src="/brand/value-02.svg" loading="eager" alt="Our Value Icon" className="our-value-icon" />
              <h3 className="heading-h6">{t('about:values.reliability.title')}</h3>
              <p>{t('about:values.reliability.desc')}</p>
            </div>
            <div id="w-node-_7cfb212c-7393-f2e3-c669-f9c9f7178510-a3532edf" data-w-id="7cfb212c-7393-f2e3-c669-f9c9f7178510" style={{opacity:0}} className="our-value-item">
              <img src="/brand/value-03.svg" loading="eager" alt="Our Value Icon" className="our-value-icon" />
              <h3 className="heading-h6">{t('about:values.integrity.title')}</h3>
              <p>{t('about:values.integrity.desc')}</p>
            </div>
            <div id="w-node-_51202d30-126c-99a2-bb24-3602708e6dcb-a3532edf" data-w-id="51202d30-126c-99a2-bb24-3602708e6dcb" style={{opacity:0}} className="our-value-item">
              <img src="/brand/value-04.svg" loading="eager" alt="Our Value Icon" className="our-value-icon" />
              <h3 className="heading-h6">{t('about:values.commitment.title')}</h3>
              <p>{t('about:values.commitment.desc')}</p>
            </div>
            <div id="w-node-_53d7cff9-676a-69fe-2f55-874c8f33e598-a3532edf" data-w-id="53d7cff9-676a-69fe-2f55-874c8f33e598" style={{opacity:0}} className="our-value-item">
              <img src="/brand/value-05.svg" loading="eager" alt="Our Value Icon" className="our-value-icon" />
              <h3 className="heading-h6">{t('about:values.expertise.title')}</h3>
              <p>{t('about:values.expertise.desc')}</p>
            </div>
            <div id="w-node-_8294bbaa-9409-f16a-283f-77a428e60b89-a3532edf" data-w-id="8294bbaa-9409-f16a-283f-77a428e60b89" style={{opacity:0}} className="our-value-item">
              <img src="/brand/value-06.svg" loading="eager" alt="Our Value Icon" className="our-value-icon" />
              <h3 className="heading-h6">{t('about:values.partnership.title')}</h3>
              <p>{t('about:values.partnership.desc')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-spacing mh-mission-section" style={{backgroundColor:'#212C42'}}>
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="mh-mission-grid" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'80px', alignItems:'center'}}>
            <div data-reveal style={{opacity:0, borderRadius:'12px', overflow:'hidden'}}>
              <img
                src="/brand/about-mission.png"
                loading="eager"
                alt="Our Mission"
                style={{width:'100%', height:'100%', objectFit:'cover', display:'block'}}
              />
            </div>
            <div>
              <div className="section-title" style={{marginBottom:'16px'}}>
                <h2 style={{color:'#F3F0EC'}}>Our <span className="text-primary-1">{t('about:mission.title-highlight')}</span></h2>
              </div>
              <p data-reveal style={{opacity:0, marginBottom:'40px', lineHeight:'1.7', color:'rgba(243,240,236,0.75)'}}>
                {t('about:mission.intro')}
              </p>
              <div style={{display:'flex', flexDirection:'column', gap:'28px'}}>
                <div data-reveal style={{opacity:0, display:'flex', gap:'20px', alignItems:'flex-start', transition:'opacity 0.5s ease 0s, transform 0.5s ease 0s'}}>
                  <img src="/brand/list-icon.svg" alt="" style={{width:'24px', height:'25px', flexShrink:0, marginTop:'2px'}} />
                  <p style={{lineHeight:'1.6', color:'rgba(243,240,236,0.85)'}}>{t('about:mission.point1')}</p>
                </div>
                <div data-reveal style={{opacity:0, display:'flex', gap:'20px', alignItems:'flex-start', transition:'opacity 0.5s ease 0.12s, transform 0.5s ease 0.12s'}}>
                  <img src="/brand/list-icon.svg" alt="" style={{width:'24px', height:'25px', flexShrink:0, marginTop:'2px'}} />
                  <p style={{lineHeight:'1.6', color:'rgba(243,240,236,0.85)'}}>{t('about:mission.point2')}</p>
                </div>
                <div data-reveal style={{opacity:0, display:'flex', gap:'20px', alignItems:'flex-start', transition:'opacity 0.5s ease 0.24s, transform 0.5s ease 0.24s'}}>
                  <img src="/brand/list-icon.svg" alt="" style={{width:'24px', height:'25px', flexShrink:0, marginTop:'2px'}} />
                  <p style={{lineHeight:'1.6', color:'rgba(243,240,236,0.85)'}}>{t('about:mission.point3')}</p>
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
            <Link data-w-id="18263d14-2db4-39ef-95d2-fbc85aa9be80b" href="/services/storage" className="grid-service-item w-inline-block">
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
          <div data-reveal style={{opacity: 0}} className="w-layout-grid grid-action-box">
            <div id="w-node-_6a5b6711-8875-297c-219e-75c37a42728b-3f4293aa">
              <h2 data-reveal style={{opacity: 0}} className="text-white">{t('action-box.text')}</h2>
            </div>
            <Link id="w-node-_6a5b6711-8875-297c-219e-75c37a42728e-3f4293aa" data-w-id="6a5b6711-8875-297c-219e-75c37a42728e" href="/contact" className="action-box-button w-inline-block">
              <div className="action-box-title">{t('action-box.button')}</div>
              <div style={{transform: 'translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'}} className="action-box-button-hover"></div>
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
      ...(await serverSideTranslations(locale, ['common', 'about'])),
    },
  }
}
