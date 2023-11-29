import './Shell.pcss'

import type { FunctionComponent, ReactNode } from 'react'
import React from 'react'
import { PageContext } from './types'
import { PageContextProvider } from './pageContext'

export { Shell }

type ShellComponent = FunctionComponent<{
  pageContext: PageContext,
  children?: ReactNode,
}>

const Shell: ShellComponent = props => {
  const { pageContext, children } = props

  return (
    <React.StrictMode>
      <PageContextProvider pageContext={pageContext}>
        {children}
      </PageContextProvider>
    </React.StrictMode>
  )
}