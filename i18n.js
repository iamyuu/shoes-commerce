/** @type {import('next-translate').I18nConfig} */
module.exports = {
  locales: ['en', 'id'],
  defaultLocale: 'en',
  loadLocaleFrom: (lang, ns) => import(`./src/translations/${lang}/${ns}.json`).then(m => m.default),
  pages: {
    '*': ['layout', 'common'],
    '/': ['new-release', 'detail'],
    'rgx:^/shoes': ['detail'],
    '/bag': ['bag'],
    '/payment-success': ['payment-success']
  }
}
