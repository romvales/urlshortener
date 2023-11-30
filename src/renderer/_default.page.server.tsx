import { renderToString } from 'react-dom/server'
import { escapeInject } from 'vike/server'
import type { PageContextServer } from './types'

import { DocumentRoot } from './DocumentRoot'
import { Shell } from './Shell'
import { dangerouslySkipEscape } from 'vike/server'
import { PageContextProvider } from './pageContext'
import React from 'react'

export { render, passToClient }

async function render(ctx: PageContextServer) {
  const { Page, pageProps } = ctx

  const renderedPage = renderToString(  
    <Shell pageContext={ctx}>
      <Page pageProps={pageProps} />
    </Shell>
  )

  const documentHtml = escapeInject`
  <!doctype html>
  ${dangerouslySkipEscape(renderToString(
    <PageContextProvider pageContext={ctx}>
      <DocumentRoot renderedPage={renderedPage} pageContext={ctx} />
    </PageContextProvider>
  ))}
  `

  return {
    documentHtml,
    pageContext: {},
  }
}

const passToClient = [ 'pageProps', 'routeParams' ]
