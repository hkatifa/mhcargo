import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Layout from '@/components/Layout'

export default function FAQs() {
  const { t } = useTranslation(['common', 'faqs'])

  return (
    <Layout
      title="FAQs | MH Cargo"
      currentPage="/faqs"
      pageId="6593b1326df8ea43c346549e"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.4267b5ed.29252e1b82c7457f.js"
      pageScriptIntegrity="sha384-JQ8NEenuih5nSCtHH1wSH/JB9jSHPJi4KfMmJGPgwnoeGmGC3twaB2rDvt7/GD3A"
    >
      <section className="hero-inner text-center">
        <div className="w-layout-blockcontainer container-medium w-container">
          <h1 data-w-id="b55e9c78-648c-8345-f458-dd37d65ffec0" style={{opacity: 0}}>{t('faqs:hero.title')}</h1>
        </div>
      </section>

      <section className="faqs-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-faqs">
            <div id="w-node-_78ed1bda-2275-9412-6211-09fb0b5d89b8-c346549e">
              <div data-w-id="12137059-4c0f-88d6-2173-da6bdb3a3835" style={{opacity: 0}} className="faqs-category-wrap">
                <a href="#Shipping-Services" className="faqs-category-link">{t('faqs:cat.shipping')}</a>
                <a href="#Payment-and-Invoicing" className="faqs-category-link">{t('faqs:cat.payment')}</a>
                <a href="#Tracking-and-Monitoring" className="faqs-category-link">{t('faqs:cat.tracking')}</a>
                <a href="#Insurance-and-Claims" className="faqs-category-link">{t('faqs:cat.insurance')}</a>
                <a href="#Returns-and-Refunds" className="faqs-category-link">{t('faqs:cat.returns')}</a>
              </div>
            </div>

            <div id="w-node-a11abfd3-b68d-fbe8-abbe-d8bc024081b9-c346549e">
              <div id="Shipping-Services" data-w-id="c98e8288-1ce6-ab91-e086-39c86f179dfe" style={{opacity: 0}} className="faqs-wrap first">
                <h2 className="faqs-title">{t('faqs:shipping.title')}</h2>
                <div className="accordion-wrap">
                  <div data-w-id="c98e8288-1ce6-ab91-e086-39c86f179e02" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:shipping.q1')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:shipping.a1')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="71714141-10e2-b443-698b-b9612f74bed6" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:shipping.q2')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:shipping.a2')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="5eeb5ff4-471c-f0bc-2556-b7685884d8c1" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:shipping.q3')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:shipping.a3')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="7425f9be-349e-ce65-63fa-41fbbc25b04c" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:shipping.q4')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:shipping.a4')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="0291923d-ce97-feee-51e1-94a1710d3872" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:shipping.q5')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:shipping.a5')}</p>
                  </div>
                </div>
              </div>

              <div id="Payment-and-Invoicing" data-w-id="24e37f5f-2039-d225-8771-fc227f87d4cf" style={{opacity: 0}} className="faqs-wrap">
                <h2 className="faqs-title">{t('faqs:payment.title')}</h2>
                <div className="accordion-wrap">
                  <div data-w-id="24e37f5f-2039-d225-8771-fc227f87d4d3" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:payment.q1')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:payment.a1')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="24e37f5f-2039-d225-8771-fc227f87d4db" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:payment.q2')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:payment.a2')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="24e37f5f-2039-d225-8771-fc227f87d4e3" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:payment.q3')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:payment.a3')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="24e37f5f-2039-d225-8771-fc227f87d4eb" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:payment.q4')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:payment.a4')}</p>
                  </div>
                </div>
              </div>

              <div id="Tracking-and-Monitoring" data-w-id="45f3593d-7789-d166-b9d5-52739b5af5a8" style={{opacity: 0}} className="faqs-wrap">
                <h2 className="faqs-title">{t('faqs:tracking.title')}</h2>
                <div className="accordion-wrap">
                  <div data-w-id="45f3593d-7789-d166-b9d5-52739b5af5ac" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:tracking.q1')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:tracking.a1')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="45f3593d-7789-d166-b9d5-52739b5af5b4" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:tracking.q2')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:tracking.a2')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="45f3593d-7789-d166-b9d5-52739b5af5bc" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:tracking.q3')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:tracking.a3')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="45f3593d-7789-d166-b9d5-52739b5af5c4" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:tracking.q4')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:tracking.a4')}</p>
                  </div>
                </div>
              </div>

              <div id="Insurance-and-Claims" data-w-id="6ca46157-d7a9-94ef-9340-0c9096da8571" style={{opacity: 0}} className="faqs-wrap">
                <h2 className="faqs-title">{t('faqs:insurance.title')}</h2>
                <div className="accordion-wrap">
                  <div data-w-id="6ca46157-d7a9-94ef-9340-0c9096da8575" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:insurance.q1')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:insurance.a1')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="6ca46157-d7a9-94ef-9340-0c9096da857d" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:insurance.q2')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:insurance.a2')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="6ca46157-d7a9-94ef-9340-0c9096da8585" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:insurance.q3')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:insurance.a3')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="6ca46157-d7a9-94ef-9340-0c9096da858d" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:insurance.q4')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:insurance.a4')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="d35f9000-a2b9-ddd6-8721-150aaa09e8a0" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:insurance.q5')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:insurance.a5')}</p>
                  </div>
                </div>
              </div>

              <div id="Returns-and-Refunds" data-w-id="97d08078-f44e-4634-ef3d-1127c12e4852" style={{opacity: 0}} className="faqs-wrap">
                <h2 className="faqs-title">{t('faqs:returns.title')}</h2>
                <div className="accordion-wrap">
                  <div data-w-id="97d08078-f44e-4634-ef3d-1127c12e4856" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:returns.q1')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:returns.a1')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="97d08078-f44e-4634-ef3d-1127c12e485e" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:returns.q2')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:returns.a2')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="97d08078-f44e-4634-ef3d-1127c12e4866" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:returns.q3')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:returns.a3')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="97d08078-f44e-4634-ef3d-1127c12e486e" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:returns.q4')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:returns.a4')}</p>
                  </div>
                </div>
                <div className="accordion-wrap">
                  <div data-w-id="97d08078-f44e-4634-ef3d-1127c12e4876" className="accordion-heading">
                    <h3 className="accordion-title">{t('faqs:returns.q5')}</h3>
                    <img src="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/6593d22027fb6bfedb18287c_plus.svg" loading="lazy" alt="" className="accordion-icon" />
                  </div>
                  <div style={{height: '0px'}} className="accordion-content">
                    <p>{t('faqs:returns.a5')}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  )
}

export async function getStaticProps({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common', 'faqs'])),
    },
  }
}
