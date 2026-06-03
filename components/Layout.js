import Head from 'next/head'
import Script from 'next/script'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next/pages'
import Navbar from './Navbar'
import Footer from './Footer'

const SITE_URL = 'https://mhcargo.ma'
const DEFAULT_OG_IMAGE = '/brand/container.png'

// en is the default locale and is served WITHOUT a prefix (mhcargo.ma/about).
// fr is served under /fr (mhcargo.ma/fr/about). Never emit an /en prefix.
function localeUrl(path, locale) {
  const clean = path === '/' ? '' : path
  return locale === 'fr' ? `${SITE_URL}/fr${clean}` : `${SITE_URL}${clean || '/'}`
}

function absoluteImage(image) {
  if (!image) return `${SITE_URL}${DEFAULT_OG_IMAGE}`
  if (/^https?:\/\//.test(image)) return image
  // encodeURI keeps slashes but escapes spaces (some brand filenames contain them).
  return `${SITE_URL}${encodeURI(image)}`
}

export default function Layout({
  children,
  title,
  description,
  currentPage,
  pageId,
  pageScript,
  ogImage,
  ogType = 'website',
  noindex = false,
}) {
  const { locale } = useRouter()
  const { t } = useTranslation('common')

  const activeLocale = locale || 'en'
  const pageTitle = title || 'MH Cargo - Logistics & Transportation'
  const metaDescription = description || t('seo.default.description')

  const canonical = localeUrl(currentPage, activeLocale)
  const enUrl = localeUrl(currentPage, 'en')
  const frUrl = localeUrl(currentPage, 'fr')
  const ogImageUrl = absoluteImage(ogImage)
  const ogLocale = activeLocale === 'fr' ? 'fr_FR' : 'en_US'
  const ogLocaleAlt = activeLocale === 'fr' ? 'en_US' : 'fr_FR'

  return (
    <>
      <Head>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {noindex ? (
          <meta name="robots" content="noindex, nofollow" />
        ) : (
          <>
            <link rel="canonical" href={canonical} />
            <link rel="alternate" hrefLang="en" href={enUrl} />
            <link rel="alternate" hrefLang="fr" href={frUrl} />
            <link rel="alternate" hrefLang="x-default" href={enUrl} />

            {/* Open Graph */}
            <meta property="og:type" content={ogType} />
            <meta property="og:site_name" content="MH Cargo" />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={metaDescription} />
            <meta property="og:url" content={canonical} />
            <meta property="og:image" content={ogImageUrl} />
            <meta property="og:locale" content={ogLocale} />
            <meta property="og:locale:alternate" content={ogLocaleAlt} />

            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={metaDescription} />
            <meta name="twitter:image" content={ogImageUrl} />
          </>
        )}
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
