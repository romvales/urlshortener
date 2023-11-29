
import { createContext, useContext } from 'react'
import type { FunctionComponent, ReactNode } from 'react'
import { PageContext } from './types'

export { PageContextProvider, usePageContext }

type PageContextProviderComponent = FunctionComponent<{
  pageContext: PageContext,
  children: ReactNode,
}>

const Context = createContext(undefined as unknown as PageContext)

const PageContextProvider: PageContextProviderComponent = props => {
  const { pageContext, children } = props
  
  return <Context.Provider value={pageContext}>{children}</Context.Provider>
}

const usePageContext = () => {
  const pageContext = useContext(Context)
  return pageContext
}