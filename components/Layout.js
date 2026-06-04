import Head from 'next/head'
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
  ogImage,
  ogType = 'website',
  noindex = false,
  // Optional per-locale paths, e.g. { en: '/blog/<enSlug>', fr: '/blog/<frSlug>' }.
  // Used by blog posts where EN/FR have different slugs. A locale may be absent
  // (untranslated). When omitted, both locales share `currentPage` (most pages).
  localeAlternates,
}) {
  const { locale } = useRouter()
  const { t } = useTranslation('common')

  const activeLocale = locale || 'en'
  const pageTitle = title || 'MH Cargo - Logistics & Transportation'
  const metaDescription = description || t('seo.default.description')

  const enPath = localeAlternates ? localeAlternates.en : currentPage
  const frPath = localeAlternates ? localeAlternates.fr : currentPage
  const activePath = (localeAlternates && localeAlternates[activeLocale]) || currentPage
  const canonical = localeUrl(activePath, activeLocale)
  const enUrl = enPath ? localeUrl(enPath, 'en') : null
  const frUrl = frPath ? localeUrl(frPath, 'fr') : null
  const xDefaultUrl = enUrl || frUrl
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
            {enUrl && <link rel="alternate" hrefLang="en" href={enUrl} />}
            {frUrl && <link rel="alternate" hrefLang="fr" href={frUrl} />}
            {xDefaultUrl && <link rel="alternate" hrefLang="x-default" href={xDefaultUrl} />}

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
      <Navbar currentPage={currentPage} localeAlternates={localeAlternates} />
      {children}
      <Footer />
    </>
  )
}
