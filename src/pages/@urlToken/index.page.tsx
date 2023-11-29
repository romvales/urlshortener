import { redirect } from 'vike/abort'
import { usePageContext } from '../../renderer/pageContext'

export { Page }

const Page = () => {
  const { pageProps } = usePageContext()
  const { url } = pageProps
  
  const url_token = (url as any).url_token
  const full_url = (url as any).full_url

  if (url_token && full_url) {
    throw redirect(full_url, 301)
  } else {
    throw redirect('/', 302)
  }
}