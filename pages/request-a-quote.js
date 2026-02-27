import Layout from '@/components/Layout'

export default function RequestAQuote() {
  return (
    <Layout
      title="Request a Quote | MH Cargo"
      currentPage="/request-a-quote"
      pageId="6593b799237f27f93f4293aa"
      pageScript="https://cdn.prod.website-files.com/658a73e52a1131d1c3f0a037/js/webflow.3f6e7923.a1d814f359403fa3.js"
      pageScriptIntegrity="sha384-L4LcgnZBNUS2eLrBGiOfEHG5r5XDdtXBZK7JW/PC1gokmmEe3OJIzq0jpde7FCPY"
    >
      <section className="hero-inner text-center">
        <div className="w-layout-blockcontainer container-medium w-container">
          <div className="request-hero-wrap">
            <h1 data-w-id="9e30f066-9cd3-f283-b232-2c625fe99301" style={{opacity: 0}}>Get a Quote for Your Next Shipment.</h1>
            <p data-w-id="34aaf31f-6b52-906e-21ba-7f55bf1a3b61" style={{opacity: 0}}>Contact our experts for a tailored international transport solution. Fill in the form below and our team will get back to you within 24 hours.</p>
          </div>
        </div>
      </section>

      <section className="request-quote-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div className="w-layout-grid grid-request-quote">
            <div id="w-node-_0269d436-5e94-4750-2694-fbbce154a170-3f4293aa" className="request-image-wrap">
              <img
                src="/brand/request-01.jpg"
                loading="eager"
                style={{opacity: 0}}
                data-w-id="5e6e0ab9-db87-36d6-62b2-7473421ba945"
                alt="Request Image"
                className="request-image"
              />
            </div>
            <div data-w-id="e6d8b316-7a2a-6188-dbb1-05034adfcbe6" style={{opacity: 0}} className="request-quote-form">
              <h2 className="request-form-title heading-h3">Request a quote</h2>
              <div className="w-form">
                <form
                  id="wf-form-Request-Form"
                  name="wf-form-Request-Form"
                  data-name="Request Form"
                  method="get"
                  data-wf-page-id="6593b799237f27f93f4293aa"
                  data-wf-element-id="0dc16da9-79ef-95ba-a780-f8962477785b"
                >
                  <div className="input-group-wrap">
                    <div className="input-group">
                      <input className="form-input request-input w-input" maxLength="256" name="Full-Name" data-name="Full Name" placeholder="Full Name" type="text" id="full-name" required />
                    </div>
                    <div className="input-group">
                      <input className="form-input request-input w-input" maxLength="256" name="Email" data-name="Email" placeholder="Email Address" type="email" id="email" required />
                    </div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group">
                      <input className="form-input request-input w-input" maxLength="256" name="Phone" data-name="Phone" placeholder="Phone Number" type="tel" id="phone" />
                    </div>
                    <div className="input-group">
                      <select id="direction" name="Direction" data-name="Direction" className="form-select request-input w-select">
                        <option value="">Direction</option>
                        <option value="Import">Import to Morocco</option>
                        <option value="Export">Export from Morocco</option>
                      </select>
                    </div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group">
                      <select id="transport-mode" name="Transport-Mode" data-name="Transport Mode" className="form-select request-input w-select">
                        <option value="">Transport Mode</option>
                        <option value="Air">Air</option>
                        <option value="Sea">Sea</option>
                        <option value="Road">Road</option>
                      </select>
                    </div>
                    <div className="input-group">
                      <input className="form-input request-input w-input" maxLength="256" name="Departure" data-name="Departure" placeholder="Departure City / Country" type="text" id="departure" />
                    </div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group">
                      <input className="form-input request-input w-input" maxLength="256" name="Delivery" data-name="Delivery" placeholder="Delivery City / Country" type="text" id="delivery" />
                    </div>
                    <div className="input-group">
                      <input className="form-input request-input w-input" maxLength="256" name="Goods-Type" data-name="Type of Goods" placeholder="Type of Goods" type="text" id="goods-type" />
                    </div>
                  </div>
                  <div className="input-group-wrap">
                    <div className="input-group">
                      <input className="form-input request-input w-input" name="Weight" data-name="Weight" placeholder="Weight (kg)" type="number" id="weight" min="0" step="0.01" />
                    </div>
                    <div className="input-group">
                      <input className="form-input request-input w-input" name="Volume" data-name="Volume" placeholder="Volume (m³)" type="number" id="volume" min="0" step="0.01" />
                    </div>
                  </div>
                  <div className="input-group-wrap" style={{alignItems:'flex-end'}}>
                    <div className="input-group no-margin">
                      <select id="incoterms" name="Incoterms" data-name="Incoterms" className="form-select request-input w-select">
                        <option value="">Incoterms (Optional)</option>
                        <option value="EXW">EXW</option>
                        <option value="FOB">FOB</option>
                        <option value="CIF">CIF</option>
                        <option value="DAP">DAP</option>
                      </select>
                    </div>
                    <div className="input-group no-margin" style={{marginLeft:'auto'}}>
                      <input type="submit" data-wait="Please wait..." className="button-primary-lg w-button" value="Get My Quote" style={{height:'56px'}} />
                    </div>
                  </div>
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

      <section className="service-process-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-medium w-container">
          <div className="section-title section-title-center">
            <h2 data-w-id="f611a05a-15b3-6fb1-7773-46cf02f47e95" style={{opacity: 0}}>How it work</h2>
          </div>
          <div className="w-layout-grid grid-service-process">
            <div id="w-node-dbe4e874-3658-49d0-4bf7-1da4ecf0f872-3f4293aa" data-w-id="dbe4e874-3658-49d0-4bf7-1da4ecf0f872" style={{opacity: 0}} className="service-process-item">
              <div className="service-process-wrap">
                <div>01</div>
              </div>
              <h3 className="heading-h6 text-white">Get an Estimate to Plan</h3>
              <p className="text-gray-3">Fill in your shipment details and receive a competitive, customized quote within 24 hours.</p>
            </div>
            <div id="w-node-c2ccbd91-22b2-c4f0-ce0b-7f23ade435a4-3f4293aa" data-w-id="c2ccbd91-22b2-c4f0-ce0b-7f23ade435a4" style={{opacity: 0}} className="light-service-process-item">
              <div className="light-service-process-wrap">
                <div>02</div>
              </div>
              <h3 className="heading-h6">Ongoing Expert Support</h3>
              <p>Our dedicated account managers guide you through every step — customs, routing, and documentation.</p>
            </div>
            <div id="w-node-e98a3574-a63f-2f98-9657-23490e4519aa-3f4293aa" data-w-id="e98a3574-a63f-2f98-9657-23490e4519aa" style={{opacity: 0}} className="service-process-item">
              <div className="service-process-wrap">
                <div>03</div>
              </div>
              <h3 className="heading-h6 text-white">Relax While We Move</h3>
              <p className="text-gray-3">Sit back while HM Cargo handles your cargo from pickup to final delivery, anywhere in the world.</p>
            </div>
          </div>
        </div>
      </section>

      <section className="service-scroll-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container-full w-container">
          <div data-w-id="da79e972-0b14-c317-d304-cbc9a972a09a" style={{opacity: 0}} className="service-title-wrap">
            <div className="section-title-wrap">
              <h2 className="no-margin">We offer to highest quality services</h2>
            </div>
            <a data-w-id="da79e972-0b14-c317-d304-cbc9a972a09e" href="/services" className="button-primary w-inline-block">
              <div className="button-primary-text">View all services</div>
              <div style={{width: '0%', height: '100%'}} className="button-primary-hover"></div>
            </a>
          </div>
          <div data-w-id="da79e972-0b14-c317-d304-cbc9a972a0a2" style={{opacity: 0}} className="service-scroll-wrap">
            <div className="service-scroll-list">
              <a id="w-node-da79e972-0b14-c317-d304-cbc9a972a0a4-3f4293aa" data-w-id="da79e972-0b14-c317-d304-cbc9a972a0a4" href="#" className="service-scroll-item w-inline-block">
                <div className="service-scroll-image-wrap">
                  <img
                    src="/brand/big-service-01.svg"
                    loading="eager"
                    data-w-id="da79e972-0b14-c317-d304-cbc9a972a0a6"
                    alt="Service Image"
                    className="service-scroll-image"
                  />
                </div>
                <div>
                  <h3 className="heading-h4">Air Freight</h3>
                  <div>Express solutions for time-critical shipments</div>
                </div>
                <div className="service-arrow-link">
                  <img
                    src="/brand/dark-arrow.svg"
                    loading="eager"
                    data-w-id="da79e972-0b14-c317-d304-cbc9a972a0ad"
                    alt=""
                    className="service-arrow-link-icon"
                  />
                </div>
              </a>
              <a id="w-node-da79e972-0b14-c317-d304-cbc9a972a0ae-3f4293aa" data-w-id="da79e972-0b14-c317-d304-cbc9a972a0ae" href="#" className="service-scroll-item w-inline-block">
                <div className="service-scroll-image-wrap">
                  <img
                    src="/brand/big-service-02.svg"
                    loading="eager"
                    data-w-id="da79e972-0b14-c317-d304-cbc9a972a0b0"
                    alt="Service Image"
                    className="service-scroll-image"
                  />
                </div>
                <div>
                  <h3 className="heading-h4">Road freight</h3>
                  <div>Daily departures Morocco ↔ Europe</div>
                </div>
                <div className="service-arrow-link">
                  <img
                    src="/brand/dark-arrow.svg"
                    loading="eager"
                    data-w-id="da79e972-0b14-c317-d304-cbc9a972a0b7"
                    alt=""
                    className="service-arrow-link-icon"
                  />
                </div>
              </a>
              <a id="w-node-da79e972-0b14-c317-d304-cbc9a972a0b8-3f4293aa" data-w-id="da79e972-0b14-c317-d304-cbc9a972a0b8" href="#" className="service-scroll-item w-inline-block">
                <div className="service-scroll-image-wrap">
                  <img
                    src="/brand/big-service-03.svg"
                    loading="eager"
                    data-w-id="da79e972-0b14-c317-d304-cbc9a972a0ba"
                    alt="Service Image"
                    className="service-scroll-image"
                  />
                </div>
                <div>
                  <h3 className="heading-h4">Ocean freight</h3>
                  <div>FCL & LCL via Tanger Med & Casablanca</div>
                </div>
                <div className="service-arrow-link">
                  <img
                    src="/brand/dark-arrow.svg"
                    loading="eager"
                    data-w-id="da79e972-0b14-c317-d304-cbc9a972a0c1"
                    alt=""
                    className="service-arrow-link-icon"
                  />
                </div>
              </a>
              
            </div>
          </div>
        </div>
      </section>

      <section className="action-box-section section-spacing-bottom">
        <div className="w-layout-blockcontainer container w-container">
          <div data-w-id="6a5b6711-8875-297c-219e-75c37a42728a" style={{opacity: 0}} className="w-layout-grid grid-action-box">
            <div id="w-node-_6a5b6711-8875-297c-219e-75c37a42728b-3f4293aa">
              <h2 data-w-id="6a5b6711-8875-297c-219e-75c37a42728c" style={{opacity: 0}} className="text-white">Feel free to reach out and ask us anything!</h2>
            </div>
            <a id="w-node-_6a5b6711-8875-297c-219e-75c37a42728e-3f4293aa" data-w-id="6a5b6711-8875-297c-219e-75c37a42728e" href="/contact" className="action-box-button w-inline-block">
              <div className="action-box-title">Let&#x27;s Talk</div>
              <div style={{transform: 'translate3d(0, 0, 0) scale3d(0, 0, 1) rotateX(0) rotateY(0) rotateZ(0) skew(0, 0)'}} className="action-box-button-hover"></div>
            </a>
          </div>
        </div>
      </section>
    </Layout>
  )
}
