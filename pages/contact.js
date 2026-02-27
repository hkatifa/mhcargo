import Layout from '@/components/Layout';

export default function ContactPage() {
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
          <h1 data-w-id="735e61b1-33b8-f27b-ace3-40189e156e16" style={{opacity:0}}>Get in Touch for <span className="text-primary-1">Logistics</span> Needs</h1>
          <p data-w-id="fcc49c5e-4037-87b8-4a69-556d5a37531a" style={{opacity:0}}>Have an inquiry about our transport solutions? Our dedicated team is ready to provide swift and tailored assistance for all your import and export needs. </p>
        </div>
      </section>

      <section className="contact-form-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-contact-form">

            <div id="w-node-_2bf85d6e-6997-48b0-86b5-a65e979ad9a3-dc6f3a3e" className="contact-form-title-wrap">
              <div data-w-id="b0fd36b2-73dd-ccd8-fc55-6fba04b77dca" style={{opacity:0}}>
                <h2 className="heading-h3">Need any help?</h2>
                <p>Contact us today and our dedicated team will provide swift, tailored assistance to meet your international transport needs.</p>
              </div>

              <div className="contact-meta-wrap">
                <div data-w-id="bb283def-ce75-a7fc-74d8-2b1597e3ba96" style={{opacity:0}} className="contact-meta-item">
                  <h3 className="heading-h6">Opening Hours</h3>
                  <div>Monday to Friday: 08:30 – 18:00</div>
                  <div>Saturday: 08:30 – 12:00<br /></div>
                  <div>Sunday: Close<br /></div>
                </div>
                <div data-w-id="72252cd7-3604-8a08-59f0-7755eccae54c" style={{opacity:0}} className="contact-meta-item">
                  <h3 className="heading-h6">Address</h3>
                  <div>Place Paquet, Angle Rue Mohamed Smiha et Rue Pierre Parent Espace Paquet Bureau 302 - Casablanca</div>
                </div>
                <div data-w-id="35990eb5-5a31-423d-fe29-86a3cd6f9fea" style={{opacity:0}} className="contact-meta-item">
                  <h3 className="heading-h6">Address</h3>
                  <div className="contact-support-wrap">
                    <a href="tel:+91123456789">+212 522 31 45 67</a>
                  
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
                    <label htmlFor="name">Name</label>
                    <input
                      className="form-input contact-input w-input"
                      maxLength="256"
                      name="name"
                      data-name="Name"
                      placeholder="Enter name"
                      type="text"
                      id="name"
                    />
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group no-margin">
                      <label htmlFor="Email">Email</label>
                      <input
                        className="form-input contact-input w-input"
                        maxLength="256"
                        name="Email"
                        data-name="Email"
                        placeholder="Enter email"
                        type="email"
                        id="Email"
                        required
                      />
                    </div>
                    <div className="input-group no-margin">
                      <label htmlFor="Phone-No">Phone No</label>
                      <input
                        className="form-input contact-input w-input"
                        maxLength="256"
                        name="Phone-No"
                        data-name="Phone No"
                        placeholder="Enter phone no"
                        type="tel"
                        id="Phone-No"
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="Message">Message</label>
                    <textarea
                      id="Message"
                      name="Message"
                      maxLength="5000"
                      data-name="Message"
                      placeholder="Please type your message here..."
                      className="form-input contact-input form-textarea w-input"
                    ></textarea>
                  </div>
                  <input
                    type="submit"
                    data-wait="Please wait..."
                    className="button-primary-lg w-button"
                    value="Submit"
                  />
                </form>
                <div className="success-message w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="error-message w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </Layout>
  );
}
