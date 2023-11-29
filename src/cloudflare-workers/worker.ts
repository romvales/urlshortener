import { Request, ExecutionContext } from '@cloudflare/workers-types'
import { error, json } from 'itty-router'
import { router } from './router'

export { fetch }

async function fetch(req: Request, env: any, ctx?: ExecutionContext): Promise<Response> {
  return router.handle(req, env).then(json).catch(error)
}

export default { fetch }