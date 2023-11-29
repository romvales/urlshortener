/// <reference types="bun-types" />
/// <reference lib="dom" lib="dom.iterable" />

import { error, json } from 'itty-router'
import { router } from './router'

Bun.serve({
  port: process.env.PORT,

  fetch(req) {
    return router.handle(req, process.env).then(json).catch(error)
  },
})