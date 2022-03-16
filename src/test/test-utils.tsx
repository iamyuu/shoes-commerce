import { render as rtlRender, screen, waitForElementToBeRemoved, RenderOptions } from '@testing-library/react'
import { AllProvider } from 'pages/_app'

export function render(ui: Parameters<typeof rtlRender>[0], options: RenderOptions = {}) {
  return rtlRender(ui, {
    wrapper: props => <AllProvider>{props.children}</AllProvider>,
    ...options
  })
}

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)], { timeout: 4000 })

export * from '@testing-library/react'
