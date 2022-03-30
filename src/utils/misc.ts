import router from 'next/router'
import i18nConfig from '../../i18n'

const exchangeRate = {
  SGD: 1.36,
  IDR: 14.364
}

export function formatCurrency(price: number) {
  const locale = router.locale || i18nConfig.defaultLocale || 'en'
  const currency = locale === 'en' ? 'SGD' : 'IDR'
  const finalPrice = exchangeRate[currency] * price

  return finalPrice.toLocaleString(locale, {
    style: 'currency',
    currency
  })
}
