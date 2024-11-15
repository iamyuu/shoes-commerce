import dynamic from 'next/dynamic'
import useTranslation from 'next-translate/useTranslation'
import { useRouter } from 'next/router'
import { Page, PageHeader } from 'components/layouts'
import { ShoesList } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

const QuickView = dynamic(() => import('components/shoes').then(mod => mod.QuickView))
const ProductFilter = dynamic(() => import('components/shoes').then(mod => mod.ProductFilter))

export default function NewReleasePage() {
  const router = useRouter()
  const resetErrorKeys = Object.keys(router.query)

  return (
    <ErrorBoundary resetKeys={resetErrorKeys}>
      <ShoesList />
      <QuickView />
      <ProductFilter />
    </ErrorBoundary>
  )
}

NewReleasePage.getLayout = function NewReleaseLayout(page: React.ReactNode) {
  const router = useRouter()
  const { t } = useTranslation('layout')

  const titleByCategory: Record<string, string> = {
    men: t('navigation.men'),
    women: t('navigation.women'),
    child: t('navigation.kids'),
    unisex: t('navigation.unisex')
  }

  const title = titleByCategory[String(router.query.category)] || t('navigation.new-release')

  return (
    <Page>
      <PageHeader>{title}</PageHeader>

      {page}
    </Page>
  )
}
