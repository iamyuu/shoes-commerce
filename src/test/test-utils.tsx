import { render as rtlRender, screen, waitForElementToBeRemoved, RenderOptions } from '@testing-library/react'
import { RouterContext } from 'next/dist/next-server/lib/router-context'
import { NextRouter } from 'next/router'
import { AllProvider } from 'pages/_app'

type RenderUI = Parameters<typeof rtlRender>[0]

interface CustomRenderOptions extends RenderOptions {
  router?: Partial<NextRouter>
}

export * from '@testing-library/react'

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: jest.fn(),
  replace: jest.fn(),
  reload: jest.fn(),
  back: jest.fn(),
  prefetch: jest.fn(),
  beforePopState: jest.fn(),
  events: {
    on: jest.fn(),
    off: jest.fn(),
    emit: jest.fn()
  },
  isLocaleDomain: true,
  isFallback: false,
  isPreview: false,
  isReady: true
}

export function render(ui: RenderUI, { router, ...options }: CustomRenderOptions = {}) {
  return rtlRender(ui, {
    wrapper: props => (
      <RouterContext.Provider value={{ ...mockRouter, ...router }}>
        <AllProvider>{props.children}</AllProvider>
      </RouterContext.Provider>
    ),
    ...options
  })
}

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)], { timeout: 4000 })
