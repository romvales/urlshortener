

import { hydrateRoot, createRoot } from 'react-dom/client'
import type { PageContextClient } from './types'
import { Shell } from './Shell'

export const clientRouting = true
export const hydrationCanBeAborted = true
export const prefetchStaticAssets = 'viewport'

export { render }

async function render(ctx: PageContextClient) {
  const { Page, pageProps, isHydration } = ctx

  const el = document.querySelector('#entrypoint') as HTMLDivElement
  const ShellNode = (
    <Shell pageContext={ctx}>
      <Page pageProps={pageProps} />
    </Shell>
  ) 
  
  if (isHydration) hydrateRoot(el, ShellNode)
  else createRoot(el).render(ShellNode)
}