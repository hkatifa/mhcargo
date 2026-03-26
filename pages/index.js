import { useEffect } from 'react'
import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { getAllPosts } from '@/lib/posts'

function formatDate(dateString, locale) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Home({ latestPosts }) {
  const { t } = useTranslation(['common', 'home'])
  const { locale } = useRouter()

  useEffect(() => {
    const items = document.querySelectorAll('.service-list .grid-service-item')
    if (!items.length) return

    const cleanups = []
    items.forEach((item) => {
      const img = item.querySelector('.service-image')
      if (!img) return

      item.style.opacity = '0.5'
      item.style.transition = ''
      img.style.opacity = '0'
      img.style.transform = 'translate(0px, 0px)'
      img.style.transition = ''

      const onEnter = () => {
        item.style.transition = 'opacity 0.3s ease'
        img.style.transition = 'opacity 0.5s ease, transform 0.6s ease'
        item.style.opacity = '1'
        img.style.opacity = '1'
        img.style.transform = 'translate(50px, 20px)'
      }
      const onLeave = () => {
        item.style.transition = 'opacity 0.5s ease'
        img.style.transition = 'opacity 0.5s ease, transform 0.5s ease'
        item.style.opacity = '0.5'
        img.style.opacity = '0'
        img.style.transform = 'translate(0px, 0px)'
      }

      item.addEventListener('mouseenter', onEnter)
      item.addEventListener('mouseleave', onLeave)
      cleanups.push(() => {
        item.removeEventListener('mouseenter', onEnter)
        item.removeEventListener('mouseleave', onLeave)
      })
    })

    return () => cleanups.forEach((fn) => fn())
  }, [])

  return (
    <Layout
      title="Home | MH Cargo - Logistics &amp; Transportation"
      currentPage="/"
      pageId="658a73e52a1131d1c3f0a02c"
      pageScript="/lib/webflow-page.js"
    >
      <section className="hero-section">
        <div className="feature-white-decoration"></div>
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-hero">
            <div id="w-node-_2fad2054-8dfe-247d-df08-28e787dcb3aa-c3f0a02c" className="hero-content-wrap">
              <div className="hero-content">
                <p className="hero-pretitle" style={{fontSize:'15px', fontWeight:'400', color:'#666', marginBottom:'8px', letterSpacing:'0.01em'}}>{t('home:hero.pretitle')}</p>
                <h1 data-w-id="0b060154-62d9-422b-c874-69e1a7c20992" className="hero-title" style={{fontSize:'60px'}}>
                  {t('home:hero.title-pre')} <img src="/brand/Small icon.png" className="hero-span-image" alt="Morocco flag" style={{height:'0.75em', verticalAlign:'middle', display:'inline-block', marginBottom:'0.08em'}} /> <span style={{fontWeight:'200'}}>{t('home:hero.title-post')}</span>
                </h1>
                <p data-w-id="f831e8ad-c258-e23c-9412-7462f8016117" className="hero-description">
                  {t('home:hero.description')}
                </p>
                <div data-w-id="0da84b6e-f7f1-04ec-05f3-3225c0ec46d1" className="hero-form-block w-form">
                  <Link href="/contact" className="button-primary-lg w-button">{t('home:hero.cta')}</Link>
                </div>
                <div data-w-id="e512f508-8677-bb15-8e3d-304159882078" className="hero-decoration-wrap">
                  <img src="/brand/decoration-02.svg" loading="eager" alt="" className="decoration-line-one" />
                  <img src="/brand/decoration-03.svg" loading="eager" data-w-id="651365cf-d875-5df2-c9d7-fcce34ccd2e6" alt="" className="decoration-one" />
                </div>
              </div>
              <div id="w-node-_80a4f565-1a6f-d5aa-1ea7-38e2a9d4a9d6-c3f0a02c" className="feature-left-side">
                <h1 data-w-id="ebe1e6df-23c8-23c0-a806-c7342dce3d72" className="hero-feature-title">{t('home:features.title')}</h1>
                <div className="feature-list-wrap">
                  <div data-w-id="39a5f6f6-fc06-a8f2-ec05-2096bce91a76" className="feature-list">
                    <div className="feature-list-item"><img src="/brand/list-icon.svg" loading="eager" alt="" className="feature-list-icon" /><div className="feature-dot"></div><div>{t('home:features.safe-packing')}</div></div>
                    <div className="feature-list-item"><img src="/brand/list-icon.svg" loading="eager" alt="" className="feature-list-icon" /><div className="feature-dot"></div><div>{t('home:features.ship-everywhere')}</div></div>
                    <div className="feature-list-item"><img src="/brand/list-icon.svg" loading="eager" alt="" className="feature-list-icon" /><div className="feature-dot"></div><div>{t('home:features.zero-risk')}</div></div>
                  </div>
                  <div data-w-id="60f8cd3f-35b7-0e37-e3c3-5b6823910215" className="feature-list">
                    <div className="feature-list-item"><img src="/brand/list-icon.svg" loading="eager" alt="" className="feature-list-icon" /><div className="feature-dot"></div><div>{t('home:features.in-time-delivery')}</div></div>
                    <div className="feature-list-item"><img src="/brand/list-icon.svg" loading="eager" alt="" className="feature-list-icon" /><div className="feature-dot"></div><div>{t('home:features.cost-saving')}</div></div>
                    <div className="feature-list-item"><img src="/brand/list-icon.svg" loading="eager" alt="" className="feature-list-icon" /><div className="feature-dot"></div><div>{t('home:features.fastest-shipping')}</div></div>
                  </div>
                </div>
                <div data-w-id="81b2524b-8651-0c5f-e560-cf0ee6273a03" className="feature-button-wrap">
                  <Link href="/about" className="button-primary-lg w-button">{t('home:features.read-more')}</Link>
                  <a href="tel:+212522314567" className="feature-contact-link w-inline-block">
                    <div className="contact-icon-wrap"><img src="/brand/dark-phone.svg" loading="eager" alt="" className="contact-link-icon" /></div>
                    <div>+212 522 31 45 67</div>
                  </a>
                </div>
              </div>
            </div>
            <div id="w-node-_20c15b7f-0f41-1b39-ea82-72856d949171-c3f0a02c">
              <div className="hero-image-wrap">
                <img src={locale === 'fr' ? '/brand/container-fr.png' : '/brand/container.png'} loading="eager" alt="Container Image" className="hero-image" />
              </div>
            </div>
          </div>
          <div className="counter-wrap">
            <h3 data-w-id="47cb5fd3-f2ce-edc7-f633-f5440b7bb52c" className="hero-counter-title">{t('home:counter.company')}</h3>
            <div className="w-layout-grid grid-counter">
              <div id="w-node-_4f50568c-3c8c-5c62-ab55-6aca66cf7010-c3f0a02c" data-w-id="4f50568c-3c8c-5c62-ab55-6aca66cf7010" className="counter-item">
                <h4 className="counter-title">15<span className="text-primary-1">+</span></h4>
                <div>{t('home:counter.years')}</div>
              </div>
              <div id="w-node-aebf088e-dfdf-c627-be9b-a7bb6573cf32-c3f0a02c" data-w-id="aebf088e-dfdf-c627-be9b-a7bb6573cf32" className="counter-item">
                <h4 className="counter-title">200<span className="text-primary-1">+</span></h4>
                <div>{t('home:counter.partners')}</div>
              </div>
              <div id="w-node-ea71da65-b2b4-eb8c-23e8-33f85a4cb0a6-c3f0a02c" data-w-id="ea71da65-b2b4-eb8c-23e8-33f85a4cb0a6" className="counter-item">
                <h4 className="counter-title">99<span className="text-primary-1">%</span></h4>
                <div>{t('home:counter.ontime')}</div>
              </div>
              <div id="w-node-_4c41dc15-cb65-b036-0886-5c3c1b55a74c-c3f0a02c" data-w-id="4c41dc15-cb65-b036-0886-5c3c1b55a74c" className="counter-item">
                <h4 className="counter-title">120<span className="text-primary-1">+</span></h4>
                <div>{t('home:counter.countries')}</div>
              </div>
            </div>
          </div>
        </div>
        <div className="hero-dark-bg-decoration"></div>
      </section>

      <section className="service-section section-spacing">
        <div data-w-id="dc5daad8-04db-60cd-e966-713ce4ec1cd7" className="service-decoration-wrap">
          <img src="/brand/decoration-01.svg" loading="eager" alt="" className="service-decoration-one" />
          <img src="/brand/decoration-03.svg" loading="eager" data-w-id="14bc2eb7-1dd2-fe7a-176c-d7e74936a209" alt="" className="service-decoration-car" />
        </div>
        <div className="w-layout-blockcontainer container-full w-container">
          <div data-w-id="804e3648-389e-d9ec-22f4-b69045303d50" className="section-title section-title-wrap">
            <h2>{t('services.section-title')}</h2>
          </div>
          <div data-w-id="1850ee1d-112c-9c94-95db-178150dee8a9" className="service-list">
            <Link href="/services/air-freight" className="grid-service-item w-inline-block">
              <div id="w-node-f6f9e720-20c7-32d8-2136-0ec48c8c26b4-c3f0a02c"><h3 className="service-number">01</h3><p>{t('services.air.desc')}</p></div>
              <div id="w-node-_998cc494-49d7-9dca-543c-8f867cf83729-c3f0a02c" className="text-center"><h3 className="service-title">{t('services.air.title')}</h3></div>
              <div id="w-node-f9b5dbff-44fc-0ded-4673-01903ac337ac-c3f0a02c" className="service-image-wrap">
                <img src="/brand/service-01.svg" loading="eager" alt="Service Image" className="service-image" />
              </div>
              <div id="w-node-b331480c-3e5f-fd69-13b0-77edd42e4260-c3f0a02c"><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div id="w-node-c1d6a8ab-cf27-c697-1005-e02b7c1b102d-c3f0a02c" className="service-divider"></div>
            </Link>
            <Link href="/services/road-freight" className="grid-service-item w-inline-block">
              <div id="w-node-c0d2b5a8-ea50-aa8f-fe89-a1a8acd819d3-c3f0a02c"><h3 className="service-number">02</h3><p>{t('services.road.desc')}</p></div>
              <div id="w-node-c0d2b5a8-ea50-aa8f-fe89-a1a8acd819d8-c3f0a02c" className="text-center"><h3 className="service-title">{t('services.road.title')}</h3></div>
              <div id="w-node-c0d2b5a8-ea50-aa8f-fe89-a1a8acd819db-c3f0a02c" className="service-image-wrap">
                <img src="/brand/service-02.svg" loading="eager" alt="Service Image" className="service-image" />
              </div>
              <div id="w-node-c0d2b5a8-ea50-aa8f-fe89-a1a8acd819dd-c3f0a02c"><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div id="w-node-c0d2b5a8-ea50-aa8f-fe89-a1a8acd819df-c3f0a02c" className="service-divider"></div>
            </Link>
            <Link href="/services/sea-freight" className="grid-service-item w-inline-block">
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be81-c3f0a02c"><h3 className="service-number">03</h3><p>{t('services.sea.desc')}</p></div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be86-c3f0a02c" className="text-center"><h3 className="service-title">{t('services.sea.title')}</h3></div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be89-c3f0a02c" className="service-image-wrap">
                <img src="/brand/service-03.svg" loading="eager" alt="Service Image" className="service-image" />
              </div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be8b-c3f0a02c"><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be8d-c3f0a02c" className="service-divider"></div>
            </Link>
            <Link href="/services/storage" className="grid-service-item w-inline-block">
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be81-c3f0a02c2"><h3 className="service-number">04</h3><p>{t('services.storage.desc')}</p></div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be86-c3f0a02c2" className="text-center"><h3 className="service-title">{t('services.storage.title')}</h3></div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be89-c3f0a02c2" className="service-image-wrap">
                <img src="/brand/service-04.png" loading="eager" alt="Service Image" className="service-image" />
              </div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be8b-c3f0a02c2"><img src="/brand/arrow.svg" loading="eager" alt="" className="service-arrow-icon" /></div>
              <div id="w-node-_18263d14-2db4-39ef-95d2-fbc85aa9be8d-c3f0a02c2" className="service-divider"></div>
            </Link>
          </div>
        </div>
      </section>

      <section className="about-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-about">
            <div id="w-node-_4dd21052-da4d-9b62-e88a-ba41eac34005-c3f0a02c" data-w-id="4dd21052-da4d-9b62-e88a-ba41eac34005" className="about-image-wrap">
              <img src="/brand/Why.jpg" loading="eager" alt="Trade Corridors" className="about-image" />
              <div className="image-scroll-overlay"></div>
            </div>
            <div id="w-node-_507e27fb-a5b0-fd1c-c8bd-2589e7f4736a-c3f0a02c" className="about-content">
              <h2 data-w-id="d8206fca-f836-0a0f-ce18-add80a4edd76" className="about-title">{t('home:corridors.title')}</h2>
              <div className="corridor-list" style={{display:'flex', flexDirection:'column', gap:'40px', marginTop:'60px', marginBottom:'60px'}}>
                <div data-reveal style={{padding:'22px 28px', background:'#f7f7f7', borderRadius:'8px', opacity:0, transition:'opacity 0.5s ease 0s, transform 0.5s ease 0s'}}>
                  <h3 className="heading-h6" style={{marginBottom:'10px'}}>{t('home:corridors.europe.title')}</h3>
                  <p style={{margin:0}}>{t('home:corridors.europe.desc')}</p>
                </div>
                <div data-reveal style={{padding:'22px 28px', background:'#f7f7f7', borderRadius:'8px', opacity:0, transition:'opacity 0.5s ease 0.12s, transform 0.5s ease 0.12s'}}>
                  <h3 className="heading-h6" style={{marginBottom:'10px'}}>{t('home:corridors.asia.title')}</h3>
                  <p style={{margin:0}}>{t('home:corridors.asia.desc')}</p>
                </div>
                <div data-reveal style={{padding:'22px 28px', background:'#f7f7f7', borderRadius:'8px', opacity:0, transition:'opacity 0.5s ease 0.24s, transform 0.5s ease 0.24s'}}>
                  <h3 className="heading-h6" style={{marginBottom:'10px'}}>{t('home:corridors.middle-east.title')}</h3>
                  <p style={{margin:0}}>{t('home:corridors.middle-east.desc')}</p>
                </div>
              </div>
              <Link data-w-id="b4dfc5bf-cb19-945b-24e1-f8fe6261520b" href="/about" className="button-primary w-inline-block">
                <div className="button-primary-text">{t('home:corridors.cta')}</div>
                <div style={{width:'0%',height:'100%'}} className="button-primary-hover"></div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="request-form-section">
        <img className="decoration-two" src="/brand/Globe.svg" alt="Globe Image" data-w-id="1989de4c-9039-e6d3-e457-1b6f0bf1b7d8" loading="eager" />
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-request-form">
            <div id="w-node-cd58853e-5cb0-5b74-958d-4b8d32eb85d7-c3f0a02c" className="step-wrap">
              <div className="section-title">
                <h2 data-w-id="bc669376-877d-54d5-8a3b-4a94ff84f9da" className="text-white">{t('steps.title')}</h2>
              </div>
              <div className="w-layout-grid grid-step">
                <div id="w-node-_918de1bd-fe7a-df4c-e8ba-d02866f4c5d0-c3f0a02c" data-w-id="918de1bd-fe7a-df4c-e8ba-d02866f4c5d0" className="step-item">
                  <div className="step-number-wrap"><div className="step-number">01</div></div>
                  <h3 className="heading-h6 text-white">{t('steps.step1.title')}</h3>
                  <p className="text-gray-3">{t('steps.step1.desc')}</p>
                </div>
                <div id="w-node-_92fe7bbb-5cd2-613a-50d5-8db8f43a8edc-c3f0a02c" data-w-id="92fe7bbb-5cd2-613a-50d5-8db8f43a8edc" className="step-item">
                  <div className="step-number-wrap"><div className="step-number">02</div></div>
                  <h3 className="heading-h6 text-white">{t('steps.step2.title')}</h3>
                  <p className="text-gray-3">{t('steps.step2.desc')}</p>
                </div>
                <div id="w-node-_9fcc0c8c-37fd-2765-83c5-4f9e12e31ee7-c3f0a02c" data-w-id="9fcc0c8c-37fd-2765-83c5-4f9e12e31ee7" className="step-item">
                  <div className="step-number-wrap"><div className="step-number">03</div></div>
                  <h3 className="heading-h6 text-white">{t('steps.step3.title')}</h3>
                  <p className="text-gray-3">{t('steps.step3.desc')}</p>
                </div>
              </div>
            </div>
            <div id="w-node-dfed5db0-959a-8ea3-5ed1-d794ae2ba3af-c3f0a02c" data-w-id="dfed5db0-959a-8ea3-5ed1-d794ae2ba3af" className="request-form-wrap">
              <div className="section-title"><h2 className="text-white">{t('request-quote.section-title')}</h2></div>
              <div className="w-form">
                <form id="wf-form-Request-Form" name="wf-form-Request-Form" data-name="Request Form" method="get" data-wf-page-id="658a73e52a1131d1c3f0a02c" data-wf-element-id="1b21da79-8f4c-58e7-26db-1bf7d1eaa571">
                  <div className="input-group-wrap">
                    <div className="input-group"><input className="form-input request-input w-input" maxLength="256" name="Full-Name" data-name="Full Name" placeholder={t('form.full-name')} type="text" id="full-name" required /></div>
                    <div className="input-group"><input className="form-input request-input w-input" maxLength="256" name="Email" data-name="Email" placeholder={t('form.email')} type="email" id="email" required /></div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group"><input className="form-input request-input w-input" maxLength="256" name="Phone" data-name="Phone" placeholder={t('form.phone')} type="tel" id="phone" /></div>
                    <div className="input-group">
                      <select id="direction" name="Direction" data-name="Direction" className="form-select request-input w-select">
                        <option value="">{t('form.direction')}</option>
                        <option value="Import">{t('form.direction.import')}</option>
                        <option value="Export">{t('form.direction.export')}</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group">
                      <select id="transport-mode" name="Transport-Mode" data-name="Transport Mode" className="form-select request-input w-select">
                        <option value="">{t('form.transport-mode')}</option>
                        <option value="Air">{t('form.transport-mode.air')}</option>
                        <option value="Sea">{t('form.transport-mode.sea')}</option>
                        <option value="Road">{t('form.transport-mode.road')}</option>
                      </select>
                    </div>
                    <div className="input-group"><input className="form-input request-input w-input" maxLength="256" name="Departure" data-name="Departure" placeholder={t('form.departure')} type="text" id="departure" /></div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group"><input className="form-input request-input w-input" maxLength="256" name="Delivery" data-name="Delivery" placeholder={t('form.delivery')} type="text" id="delivery" /></div>
                    <div className="input-group"><input className="form-input request-input w-input" maxLength="256" name="Goods-Type" data-name="Type of Goods" placeholder={t('form.goods-type')} type="text" id="goods-type" /></div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group"><input className="form-input request-input w-input" name="Weight" data-name="Weight" placeholder={t('form.weight')} type="number" id="weight" min="0" step="0.01" /></div>
                    <div className="input-group"><input className="form-input request-input w-input" name="Volume" data-name="Volume" placeholder={t('form.volume')} type="number" id="volume" min="0" step="0.01" /></div>
                  </div>
                  <div className="input-group-wrap" style={{alignItems:'flex-end'}}>
                    <div className="input-group no-margin">
                      <select id="incoterms" name="Incoterms" data-name="Incoterms" className="form-select request-input w-select">
                        <option value="">{t('form.incoterms')}</option>
                        <option value="EXW">EXW</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="DAP">DAP</option>
                      </select>
                    </div>
                    <div className="input-group no-margin" style={{marginLeft:'auto'}}>
                      <input type="submit" data-wait={t('form.please-wait')} className="button-primary-lg w-button" value={t('form.submit-quote')} style={{height:'56px'}} />
                    </div>
                  </div>
                </form>
                <div className="success-message w-form-done"><div>{t('form.success')}</div></div>
                <div className="error-message w-form-fail"><div>{t('form.error')}</div></div>
              </div>
            </div>
          </div>
        </div>
        <div className="request-white-decoration"></div>
      </section>

      <section className="blog-section section-spacing">
        <div className="w-layout-blockcontainer container-full w-container">
          <div data-w-id="c8df2449-9489-3018-4636-130eacea45ad" className="section-title section-title-center">
            <h2>{t('home:blog.title')}</h2>
          </div>
          <div data-w-id="965759bf-3184-cebf-1152-958c0f0dedae" className="w-dyn-list">
            {latestPosts.length > 0 ? (
              <div role="list" className="grid-blog-list w-dyn-items">
                {latestPosts.map((post) => (
                  <div key={post.slug} role="listitem" className="w-dyn-item">
                    <Link
                      aria-label="link"
                      data-w-id="766a3a2c-3b2c-dd63-5a82-fce6724cc60d"
                      href={`/blog/${post.slug}`}
                      className="blog-item w-inline-block"
                    >
                      <div className="blog-image-wrap">
                        {post.mainImage ? (
                          <img
                            alt={locale === 'fr' && post.title_fr ? post.title_fr : post.title}
                            loading="eager"
                            src={post.mainImage}
                            className="blog-image"
                          />
                        ) : (
                          <img
                            alt={locale === 'fr' && post.title_fr ? post.title_fr : post.title}
                            loading="eager"
                            src="https://placehold.co/550x370"
                            className="blog-image"
                          />
                        )}
                        <div style={{opacity:0,width:'0%',height:'100%'}} className="blog-hover-overlay"></div>
                      </div>
                      <div>
                        <div className="blog-date">{formatDate(post.publishedAt, locale)}</div>
                        <h3 className="blog-title">{locale === 'fr' && post.title_fr ? post.title_fr : post.title}</h3>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  const latestPosts = getAllPosts().slice(0, 3)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'home'])),
      latestPosts,
    },
  }
}
