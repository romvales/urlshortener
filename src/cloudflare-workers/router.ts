
import {
  type IRequest,
  Router,
  error,
  withContent,
  withParams,
} from 'itty-router'

export { router }

const router = Router()

router
  .all('*', withParams)

  .post('/create', withContent)
  .post('/create', async (req, env) => {
    const { content } = req
    const { url } = content
    const funcUrl = env.AWS_FUNCTION_URL as string

    const res: any = await fetch(funcUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        op: 0,
        create_full_url: url,
      }),
    })
      .then(res => res.json())
      .catch(err => ({ err }))

    return Response.json(res, { status: 201 })
  })

  .get('/get', async (req, env) => {
    const { query } = req
    const { urlToken } = query
    const funcUrl = env.AWS_FUNCTION_URL as string

    const res: any = await fetch(funcUrl, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        op: 2,
        get_token_to_full_url: urlToken,
      }),
    })
      .then(res => res.json())
      .catch(err => ({ err }))

    if (!res?.full_url?.length) {
      return Response.json({}, { status: 200 })
    }

    return Response.json(res, { status: 200 })
  })

  .delete('/remove', async(req, env) => {
    const { query } = req
    const { urlToken } = query
    const funcUrl = env.AWS_FUNCTION_URL as string

    const res: any = await fetch(funcUrl, { 
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        op: 1,
        remove_url_token: urlToken,
      }),
    })
      .then(res => res.json())
      .catch(err => ({ err }))

    if (res.err) {
      return Response.json({ error: 'Not found' }, { status: 404 })
    }

    return Response.json(res, { status: 200 })
  })

  .get('/cors', async (req, env) => {
    const origins = [ 'http://u.localhost:3000', 'https://u.romvales.com' ]

    const onMethodOptions = async (req: IRequest, env: any) => {
      const headers = req.headers
      const cors = {
        'Access-Control-Allow-Origin': origins.join(','),
        'Access-Control-Allow-Methods': 'GET,HEAD,POST,DELETE,OPTIONS',
        'Access-Control-Max-Age': '86400',
      }

      const origin = headers.get('Origin')
      const acReqMethods = headers.get('Access-Control-Request-Method')
      const acReqHeaders = headers.get('Access-Control-Request-Headers')

      if (origin !== null && acReqMethods !== null && acReqHeaders !== null) {
        return new Response(null, {
          headers: {
            ...cors,
            'Access-Control-Allow-Methods': acReqHeaders ?? '',
          },
        })
      }

      return new Response(null, {
        headers: {
          Allow: 'GET, POST, DELETE, OPTIONS',
        }
      })
    }
    
    switch (req.method) {
    case 'OPTIONS': return onMethodOptions(req, env)
    }

    const url = new URL(req.url)
    const resourceUrl = url.searchParams.get('resourceUrl')

    if (/(GET|HEAD|POST|DELETE)/.test(req.method) && resourceUrl?.length) {
      req = new Request(resourceUrl, { ...req }) as any
      req.headers.set('Origin', new URL(resourceUrl).origin)
      let res = await fetch(req)
      res = new Response(res.body, req)

      res.headers.set('Access-Control-Allow-Origin', origins.join(','))
      res.headers.append('Vary', 'Origin')

      return res
    }

    return Response.json({}, { status: 405 })
  })

  .all('*', () => error(404))

