import React, { createRef, useState } from 'react'
import $content from './index.page.json'
import { onCreateUrlToken_Telefunc, onRemoveUrlToken_Telefunc } from './actions.telefunc'

export { Page }

const Page: React.FunctionComponent = () => {
  const { header, main } = $content
  const [toggledForm, setForm] = useState<'create' | 'remove'>('create')

  const [result, setResult] = useState<any>({})

  const [hasCreated, setCreateStatus] = useState(false)
  const [hasUnlinked, setUnlinkedStatus] = useState(false)

  const [urlToken, setUrlToken] = useState<string>()

  const onCreateUrlToken = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    
    const form = ev.target as HTMLFormElement
    const data = new FormData(form)

    if (form.checkValidity()) {
      onCreateUrlToken_Telefunc(data.get('url') as string)
        .then(res => {
          setCreateStatus(true)
          setResult(res)
          form.reset()
        })
    }
  }

  const onRemoveUrlToken = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const form = ev.target as HTMLFormElement
    const data = new FormData(form)

    if (form.checkValidity()) {
      onRemoveUrlToken_Telefunc(data.get('token') as string)
        .then(res => {
          if (res.op) {
            setUrlToken(data.get('token') as string)
            setUnlinkedStatus(true)
            setResult(res)
          }
        })
    }
  }

  return (
    <>
      <header className='shadow p-6 bg-neutral-900/20'>
        <div className='container lg:w-[1278px] mx-auto'>
          <ul>
            <li>
              <h1 
                className='text-2xl font-bold' 
                aria-description='u.romvales | A Dead Simple URL Shortener'>{header.logo}</h1>
            </li>
            <li>
              <nav>
              
              </nav>
            </li>
          </ul>
        </div>
      </header>

      <section className='py-[5rem] pb-[4rem] text-center px-8'>
        <div className='container lg:w-[1278px] mx-auto'>
          <h1 className='lg:text-5xl font-semibold mb-5 text-4xl'>{main.headline}</h1>
          <p className='lg:text-2xl text-lg lg:w-[728px] mx-auto'>{main.headline_message}</p>
        </div>
      </section>

      <main className='px-8'>
        <section className='container lg:w-[1278px] lg:text-lg mx-auto'>
          
          <div className='bg-neutral-900 lg:w-[800px] p-7 py-9 rounded-xl mx-auto'>
            <h2 className='lg:text-3xl text-2xl font-bold mb-3'>
              {
                toggledForm == 'create' ? main['$forms'].create_url_token.title : main['$forms'].remove_url_token.title
              }
            </h2>

            <nav>
              <ul className='flex gap-8'>
                <li>
                  <button 
                    onClick={() => {
                      setForm('create')
                      setUnlinkedStatus(false)
                      setUrlToken('')
                      setCreateStatus(false)
                      setResult({})
                    }}
                    type='button'
                    className='py-4 px-5'>{main["$forms"].tab0}</button>
                </li>
                <li>
                  <button 
                    onClick={() => {
                      setForm('remove')
                      setUnlinkedStatus(false)
                      setUrlToken('')
                      setCreateStatus(false)
                      setResult({})
                    }}
                    type='button'
                    className='py-4 px-5'>{main["$forms"].tab1}</button>
                </li>
              </ul>
            </nav>

            <hr className='border-neutral-700/25 mb-2' />

            <Show when={toggledForm == 'create' && !hasCreated}>
              <form
                autoComplete={'off'}
                className='grid gap-8'
                onSubmit={onCreateUrlToken}>
                <label className='flex flex-col'>
                  <span className='mb-2 font-bold'>{main['$forms'].create_url_token.input0.title}</span>
                  <input
                    className='p-4 outline-none text-zinc-300 bg-neutral-800 placeholder-neutral-600 rounded-lg'
                    placeholder={main['$forms'].create_url_token.input0.placeholder} 
                    type='url'
                    required
                    aria-required={true}
                    name='url' />
                </label>

                <div className='flex justify-end'>
                  <button
                    className='bg-blue-600 p-4 font-semibold rounded-xl'
                    type='submit'>
                    {main['$forms'].create_url_token.submit}
                  </button>
                </div>
              </form>
            </Show>

            <Show when={toggledForm == 'create' && hasCreated}>
              <div className='grid'>
                <section className='flex justify-between p-8 my-4 bg-green-600/10 rounded-xl text-green-100 font-normal'>
                  <p>
                    {main['$forms'].created_url_token.message} 
                    <a 
                      id='created_result'
                      className='inline-block font-semibold text-green-200 bg-green-400/10 p-2 rounded-md ml-2 my-1'
                      href={`/${result.url_token}`}
                      target='_blank'>u.romvales.com/{result.url_token}</a>.
                  </p>

                  <button 
                    onClick={(ev) => {
                      const btn = ev.target as HTMLButtonElement
                      const result = document.querySelector('#created_result') as HTMLAnchorElement

                      navigator.clipboard.writeText(`https://${result.innerText}`)
                        .then(
                          () => btn.innerHTML = 'Copied!'
                        )
                    }}
                    className='uppercase text-green-200/40'>
                    Copy
                  </button>
                </section>
                <div className='flex justify-end'>
                  <button  
                    onClick={() => {
                      setCreateStatus(false)
                      setResult({})
                    }}
                    className='bg-blue-600 p-4 font-semibold rounded-xl'
                    type='submit'>
                    {main['$forms'].created_url_token.new_link}
                  </button>
                </div>
              </div>
            </Show>

            <Show when={toggledForm == 'remove' && !hasUnlinked}>
              <form 
                autoComplete={'off'}
                className='grid gap-8'
                onSubmit={onRemoveUrlToken}>

                <label className='flex flex-col'>
                  <span className='mb-2 font-bold'>{main['$forms'].remove_url_token.input0.title}</span>
                  <input
                    className='p-4 outline-none text-zinc-300 bg-neutral-800 placeholder-neutral-600 rounded-lg'
                    placeholder={main['$forms'].remove_url_token.input0.placeholder}
                    required
                    aria-required={true}
                    name='token' />
                </label>

                <div className='flex justify-end'>
                  <button 
                    className='bg-rose-600 p-4 font-semibold rounded-xl'
                    type='submit'>
                    {main['$forms'].remove_url_token.submit}
                  </button>
                </div>
              </form>
            </Show>

            <Show when={toggledForm == 'remove' && hasUnlinked}>
              <div className='grid'>
                <section className='flex justify-between p-8 my-4 bg-rose-600/10 rounded-xl font-semibold'>
                  <span>
                    Deleted url token <span className='inline-block font-semibold text-rose-200 bg-rose-400/10 p-2 rounded-md ml-1 my-1'>{urlToken}</span> 🗑️.
                  </span>
                </section>
                <div className='flex justify-end'>
                  <button  
                    onClick={() => {
                      setForm('create')
                      setUnlinkedStatus(false)
                      setUrlToken('')
                      setCreateStatus(false)
                      setResult({})
                    }}
                    className='bg-blue-600 p-4 font-semibold rounded-xl'
                    type='submit'>
                    {main['$forms'].created_url_token.new_link}
                  </button> 
                </div>
              </div>
            </Show>
          </div>


        </section>
      </main>

      <footer>

      </footer>
    </>
  )
}

const Show: React.FunctionComponent<{ when: boolean, children?: React.ReactElement }> = props => {
  const { when, children } = props
  if (when) return children
  return <></>
}