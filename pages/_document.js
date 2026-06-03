import NextDocument, { Html, Head, Main, NextScript } from 'next/document'

export default class Document extends NextDocument {
  render() {
    // Pages Router + next-i18next: the active locale is injected into
    // __NEXT_DATA__ on every request, so SSR emits the correct <html lang>.
    const lang = this.props.__NEXT_DATA__?.locale || 'en'

    return (
      <Html lang={lang} data-wf-domain="cargon-wbs.webflow.io" data-wf-site="658a73e52a1131d1c3f0a037">
        <Head>
          {/* Webflow CSS — served locally */}
          <link href="/lib/webflow.css" rel="stylesheet" type="text/css" />

          {/* DM Sans font — Google Fonts link (no JS required) */}
          <link href="https://fonts.googleapis.com" rel="preconnect" />
          <link href="https://fonts.gstatic.com" rel="preconnect" crossOrigin="anonymous" />
          <link
            href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&display=swap"
            rel="stylesheet"
          />

          {/* Mark JS as available (before paint) so the reveal fail-safe CSS can
              keep content visible when JS is disabled or fails to run. */}
          <script
            dangerouslySetInnerHTML={{
              __html: `document.documentElement.classList.add('js')`,
            }}
          />

          <link href="/brand/favicon.svg" rel="shortcut icon" type="image/x-icon" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
