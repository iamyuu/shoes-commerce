import useTranslation from 'next-translate/useTranslation'
import { Text } from '@chakra-ui/react'
import { CheckCircleIcon } from '@chakra-ui/icons'
import { Page, PageHeader } from 'components/layouts'

export default function PaymentSuccessPage() {
  const { t } = useTranslation('payment-success')

  return (
    <Text fontSize="1.25rem" textAlign="center">
      {t('message')}
    </Text>
  )
}

PaymentSuccessPage.getLayout = function PaymentSuccessLayout(page: React.ReactNode) {
  const { t } = useTranslation('payment-success')

  return (
    <Page>
      <PageHeader>
        {t('title')} <CheckCircleIcon fontSize="2rem" />
      </PageHeader>

      {page}
    </Page>
  )
}
