
export { onCreateUrlToken_Telefunc, onRemoveUrlToken_Telefunc }


const env = (import.meta as any).env
const cloudflareUrl = env.VITE_CLOUDFLARE_WORKER_URL

async function onCreateUrlToken_Telefunc(create_full_url: string): Promise<object> {
  const url = new URL(cloudflareUrl)

  url.pathname = '/create'
  
  return await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ url: create_full_url }),
  }).then(res => res.json()) as object
}

async function onRemoveUrlToken_Telefunc(token: string) {
  const url = new URL(cloudflareUrl)

  url.pathname = '/remove'
  url.searchParams.set('urlToken', token)

  return await fetch(url, { method: 'DELETE' }).then(res => res.json())
}
