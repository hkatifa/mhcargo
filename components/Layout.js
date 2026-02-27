import Head from 'next/head'
import Script from 'next/script'
import Navbar from './Navbar'
import Footer from './Footer'

export default function Layout({ children, title, currentPage, pageId, pageScript }) {
  return (
    <>
      <Head>
        <title>{title || 'MH Cargo - Logistics & Transportation'}</title>
      </Head>
      {pageId && (
        <Script
          id={`wf-page-${pageId}`}
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute('data-wf-page','${pageId}');`,
          }}
        />
      )}
      <Navbar currentPage={currentPage} />
      {children}
      <Footer />
      {pageScript && (
        <Script
          src={pageScript}
          strategy="afterInteractive"
        />
      )}
    </>
  )
}
