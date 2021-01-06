import { render as rtlRender, screen, waitForElementToBeRemoved } from '@testing-library/react'
import { AllProvider } from 'pages/_app'

export * from '@testing-library/react'

export const render = (ui, options) => rtlRender(ui, { wrapper: AllProvider, ...options })

export const waitForLoadingToFinish = () =>
  waitForElementToBeRemoved(() => [...screen.queryAllByLabelText(/loading/i), ...screen.queryAllByText(/loading/i)], { timeout: 4000 })
