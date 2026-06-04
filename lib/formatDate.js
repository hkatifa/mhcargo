// Format a post date for display. Called ONLY from getStaticProps (server/build
// time); the finished string is passed to the page as a prop and the client just
// renders it verbatim — it never reformats. Pinning both the locale and
// timeZone:'UTC' means server and client always produce the identical string, so
// near-midnight UTC dates can't flip a day for positive-offset (Europe/Morocco)
// visitors and FR pages can't show English dates — eliminating the React #418
// hydration mismatch that those differences caused.
export default function formatDate(dateString, locale) {
  if (!dateString) return ''
  return new Date(dateString).toLocaleDateString(locale === 'fr' ? 'fr-FR' : 'en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  })
}
