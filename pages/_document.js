import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en" data-wf-domain="cargon-wbs.webflow.io" data-wf-site="658a73e52a1131d1c3f0a037">
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

        {/* Webflow touch detection */}
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `!function(o,c){var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}(window,document);`,
          }}
        />

        <link href="/brand/favicon.svg" rel="shortcut icon" type="image/x-icon" />
      </Head>
      <body>
        <Main />
        <NextScript />
        {/* jQuery — served locally */}
        <script src="/lib/jquery.min.js" type="text/javascript" />
        {/* Webflow JS chunks — served locally */}
        <script src="/lib/webflow-chunk1.js" type="text/javascript" />
        <script src="/lib/webflow-chunk2.js" type="text/javascript" />
        <script src="/lib/webflow-chunk3.js" type="text/javascript" />
      </body>
    </Html>
  )
}
