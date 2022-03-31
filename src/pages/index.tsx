import dynamic from 'next/dynamic'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Page, PageHeader } from 'components/layouts'
import { ShoesList } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

const QuickView = dynamic<{}>(() => import('components/shoes').then(mod => mod.QuickView))

export default function NewReleasePage() {
  const router = useRouter()

  return (
    <ErrorBoundary resetKeys={[router.query.shoes]}>
      <ShoesList />
      <QuickView />
    </ErrorBoundary>
  )
}

NewReleasePage.getLayout = function NewReleaseLayout(page: React.ReactNode) {
  const { t } = useTranslation('new-release')

  return (
    <Page>
      <PageHeader>{t('title')}</PageHeader>

      {page}
    </Page>
  )
}
