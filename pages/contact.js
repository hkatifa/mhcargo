import { useTranslation } from 'next-i18next/pages'
import { serverSideTranslations } from 'next-i18next/pages/serverSideTranslations'
import Layout from '@/components/Layout'

export default function ContactPage() {
  const { t } = useTranslation(['common', 'contact'])

  return (
    <Layout
      title="Contact | MH Cargo"
      currentPage="/contact"
      pageId="6593b13bd4215558dc6f3a3e"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.3f6e7923.a1d814f359403fa3.js"
      pageScriptIntegrity="sha384-L4LcgnZBNUS2eLrBGiOfEHG5r5XDdtXBZK7JW/PC1gokmmEe3OJIzq0jpde7FCPY"
    >
      <section className="hero-inner text-center">
        <div className="w-layout-blockcontainer container-medium w-container">
          <h1 data-w-id="735e61b1-33b8-f27b-ace3-40189e156e16" style={{opacity:0}}>{t('contact:hero.title-pre')} <span className="text-primary-1">{t('contact:hero.title-highlight')}</span> {t('contact:hero.title-post')}</h1>
          <p data-w-id="fcc49c5e-4037-87b8-4a69-556d5a37531a" style={{opacity:0}}>{t('contact:hero.desc')}</p>
        </div>
      </section>

      <section className="contact-form-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-contact-form">

            <div id="w-node-_2bf85d6e-6997-48b0-86b5-a65e979ad9a3-dc6f3a3e" className="contact-form-title-wrap">
              <div data-w-id="b0fd36b2-73dd-ccd8-fc55-6fba04b77dca" style={{opacity:0}}>
                <h2 className="heading-h3">{t('contact:sidebar.title')}</h2>
                <p>{t('contact:sidebar.desc')}</p>
              </div>

              <div className="contact-meta-wrap">
                <div data-w-id="bb283def-ce75-a7fc-74d8-2b1597e3ba96" style={{opacity:0}} className="contact-meta-item">
                  <h3 className="heading-h6">{t('contact:sidebar.hours.title')}</h3>
                  <div>{t('contact:sidebar.hours.weekdays')}</div>
                  <div>{t('contact:sidebar.hours.saturday')}<br /></div>
                  <div>{t('contact:sidebar.hours.sunday')}<br /></div>
                </div>
                <div data-w-id="72252cd7-3604-8a08-59f0-7755eccae54c" style={{opacity:0}} className="contact-meta-item">
                  <h3 className="heading-h6">{t('contact:sidebar.address.title')}</h3>
                  <div>{t('footer.address')}</div>
                </div>
                <div data-w-id="35990eb5-5a31-423d-fe29-86a3cd6f9fea" style={{opacity:0}} className="contact-meta-item">
                  <h3 className="heading-h6">{t('contact:sidebar.phone.title')}</h3>
                  <div className="contact-support-wrap">
                    <a href="tel:+212522314567">+212 522 31 45 67</a>
                  </div>
                </div>
              </div>
            </div>

            <div id="w-node-cd2b66f5-ee05-c605-5da3-4bb2e25dd72f-dc6f3a3e" data-w-id="cd2b66f5-ee05-c605-5da3-4bb2e25dd72f" style={{opacity:0}} className="contact-form-wrap">
              <div className="w-form">
                <form
                  id="wf-form-Contact-Form"
                  name="wf-form-Contact-Form"
                  data-name="Contact Form"
                  method="get"
                  data-wf-page-id="6593b13bd4215558dc6f3a3e"
                  data-wf-element-id="1fa5fb58-f458-3f49-84e6-d5cd312993af"
                >
                  <div className="input-group">
                    <label htmlFor="name">{t('contact:form.name-label')}</label>
                    <input
                      className="form-input contact-input w-input"
                      maxLength="256"
                      name="name"
                      data-name="Name"
                      placeholder={t('contact:form.name-placeholder')}
                      type="text"
                      id="name"
                    />
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group no-margin">
                      <label htmlFor="Email">{t('contact:form.email-label')}</label>
                      <input
                        className="form-input contact-input w-input"
                        maxLength="256"
                        name="Email"
                        data-name="Email"
                        placeholder={t('contact:form.email-placeholder')}
                        type="email"
                        id="Email"
                        required
                      />
                    </div>
                    <div className="input-group no-margin">
                      <label htmlFor="Phone-No">{t('contact:form.phone-label')}</label>
                      <input
                        className="form-input contact-input w-input"
                        maxLength="256"
                        name="Phone-No"
                        data-name="Phone No"
                        placeholder={t('contact:form.phone-placeholder')}
                        type="tel"
                        id="Phone-No"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Message">{t('contact:form.message-label')}</label>
                    <textarea
                      id="Message"
                      name="Message"
                      maxLength="5000"
                      data-name="Message"
                      placeholder={t('contact:form.message-placeholder')}
                      className="form-input contact-input form-textarea w-input"
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    data-wait={t('form.please-wait')}
                    className="button-primary-lg w-button"
                    value={t('contact:form.submit')}
                  />
                </form>
                <div className="success-message w-form-done">
                  <div>{t('form.success')}</div>
                </div>
                <div className="error-message w-form-fail">
                  <div>{t('form.error')}</div>
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
      ...(await serverSideTranslations(locale, ['common', 'contact'])),
    },
  }
}
