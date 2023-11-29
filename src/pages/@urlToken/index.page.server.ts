import { PageContextServer } from 'vike/types'

export { onBeforeRender }

async function onBeforeRender(pageContext: PageContextServer) {
  const { routeParams } = pageContext
  const CLOUDFLARE_WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL
  const urlToken = routeParams?.urlToken

  const url = new URL(CLOUDFLARE_WORKER_URL)

  url.pathname = '/get'
  url.searchParams.set('urlToken', urlToken)

  const res = await fetch(url)
    .then(res => res.json())

  return {
    pageContext: {
      pageProps: {
        url: res,
      },
    },
  }
}