import { FunctionComponent } from 'react'

export type {
  PageContextServer,

  PageContextWithServerRouting as PageContext,
  PageContextClientWithServerRouting as PageContextClient,

} from 'vike/types'
export type { PageProps }

declare global {
  namespace Vike {
    interface PageContext {
      Page: Page,
      pageProps: PageProps,
      urlPathname: string,
      exports: {
        documentProps?: Record<string, unknown>
      }
    }
  }
}

type Page = FunctionComponent<{ pageProps?: PageProps }>
type PageProps = Record<string, unknown>