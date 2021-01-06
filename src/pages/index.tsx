import { NextPage } from 'next'
import { Page, PageHeader } from 'components/layouts'
import { ShoesList } from 'components/shoes'

const Home: NextPage = () => (
  <Page>
    <PageHeader>New Release</PageHeader>
    <ShoesList />
  </Page>
)

export default Home
