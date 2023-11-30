import type { FunctionComponent } from 'react'
import type { PageContextServer } from 'vike/types'
import React from 'react'

export { DocumentRoot }

// @ts-ignore
import thumbnail from '../assets/thumbnail.png'
import $content from '../pages/index/index.page.json'

type DocumentRootComponent = FunctionComponent<{
  pageContext: PageContextServer,
  renderedPage: string,
}>

const DocumentRoot: DocumentRootComponent = props => {
  const { renderedPage } = props

  const { main } = $content
  const title = '🔗 u.romvales - A Dead Simple URL Shortener'

  const render = { __html: renderedPage }
  
  return (
    <>
      <html lang={'en'}>
      <head>
        <meta charSet={'utf-8'} />
        <meta name={'viewport'} content={'width=device-width, initial-scale=1.0'} />
      </head>
      <body>
        
      </body>
      </html>
      <html lang={'en'}>
        <head>
          <title>{title}</title>

          <meta charSet={'utf-8'} />
          <meta name='viewport' content='width=device-width, initial-scale=1.0' />
          <meta name='description' content={main.headline_message} />

          <meta property='og:title' content={title} />
          <meta property='og:type' content={'website'} />
          <meta property='og:description' content={main.headline_message} />
          <meta property='og:url' content={main.headline_url} />
          <meta property='og:image' content={thumbnail} />

          <meta name='twitter:card' content={'summary'} />
        </head>
        <body>
          <noscript>
            <p>This app requires the latest JavaScript engine enabled in your browser.</p>
          </noscript>

          <div 
            id='entrypoint' 
            className='me__app min-h-[100vh] bg-zinc-950 text-slate-100'
            dangerouslySetInnerHTML={render}></div>

        </body>
        </html>
    </>
  )
}