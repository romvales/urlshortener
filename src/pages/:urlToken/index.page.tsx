import { redirect } from 'vike/abort'
import { usePageContext } from '../../renderer/pageContext'

export { Page }

const Page = () => {
  const { routeParams } = usePageContext()
  const CLOUDFLARE_WORKER_URL = import.meta.env.VITE_CLOUDFLARE_WORKER_URL
  const urlToken = routeParams?.urlToken

  if (urlToken?.length) {
    const url = new URL(CLOUDFLARE_WORKER_URL)

    url.searchParams.set('urlToken', urlToken)

    const urlComp = encodeURIComponent(url.toString())

    fetch(`${CLOUDFLARE_WORKER_URL}/cors?resourceUrl=${urlComp}`).then(res => res.json()).then(json => console.log(json))
    
  } else {
    throw redirect('/', 302)
  }

  return (
    <>

    </>
  )
}