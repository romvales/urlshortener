
import express from 'express'
import { renderPage } from 'vike/server'
import { __dirname } from './path.js'
import { getPagesPathByHostname } from './hostnames.js'

const isProduction = process.env.NODE_ENV === 'production'

createServer()
  .then(app => {
    
    app.listen({ port: process.env.PORT })
    console.log('Server running at PORT=3000.')
  })

async function createServer() {
  const app = express()

  if (isProduction) {
    const sirv = (await import('sirv')).default
    app.use(sirv(`${__dirname}/dist/client`))
  } else {
    const { createServer } = await import('vite')
    const devMiddleware = (
      await createServer({
        appType: 'custom',
        root: __dirname,
        server: {
          middlewareMode: true,
        },
        build: {
          target: 'esnext',
        },
      })
    ).middlewares

    app.use(devMiddleware)
  }

  app.get('**', async (req, res, next) => {
    const initContext = {
      urlOriginal: [getPagesPathByHostname(req.hostname), req.originalUrl].join(''),
      __hostname: getPagesPathByHostname(req.hostname),
    }
    
    const ctx = await renderPage(initContext)
    const { httpResponse } = ctx
    
    if (!httpResponse) {
      next()
    } else {
      const { body, statusCode, headers } = httpResponse

      for (const [key, value] of headers) res.setHeader(key, value)

      res.status(statusCode).send(body)
    }

  })

  return app
}
