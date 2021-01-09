import { NextPage } from 'next'
import { Page, PageHeader } from 'components/layouts'
import { ShoesList } from 'components/shoes'
import { ErrorBoundary } from 'components/ui/error-fallback'

const Home: NextPage = () => (
  <Page>
    <PageHeader>New Release</PageHeader>
    <ErrorBoundary>
      <ShoesList />
    </ErrorBoundary>
  </Page>
)

export default Home
