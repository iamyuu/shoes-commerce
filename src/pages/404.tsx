import useTranslation from 'next-translate/useTranslation'
import { Page, PageHeader } from 'components/layouts'
import { NotFound } from 'components/ui/error-fallback'

export default function NotFoundPage() {
  return <NotFound />
}

NotFoundPage.getLayout = function NotFoundLayout(page: React.ReactNode) {
  const { t } = useTranslation('common')

  return (
    <Page>
      <PageHeader>{t('not-found.title')}</PageHeader>

      {page}
    </Page>
  )
}
