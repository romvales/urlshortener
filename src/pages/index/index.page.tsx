import React, { useState } from 'react'
import $content from './index.page.json'

export { Page }

const Page: React.FunctionComponent = () => {
  const { header, main } = $content
  const [toggledForm, setForm] = useState<'create' | 'remove'>('create')

  const onCreateUrlToken = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const data = new FormData(ev.target as HTMLFormElement)

  }

  const onRemoveUrlToken = (ev: React.FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const data = new FormData(ev.target as HTMLFormElement)

    alert(data.get('token'))
  }

  return (
    <>
      <header className='shadow p-8 bg-neutral-900/20'>
        <div className='container lg:w-[1278px] mx-auto'>
          <ul>
            <li>
              <h1 
                className='text-3xl font-bold' 
                aria-description='u.romvales | A Dead Simple URL Shortener'>{header.logo}</h1>
            </li>
            <li>
              <nav>
              
              </nav>
            </li>
          </ul>
        </div>
      </header>

      <section className='py-[5rem] text-center px-8'>
        <div className='container lg:w-[1278px] mx-auto'>
          <h1 className='lg:text-5xl font-semibold mb-5 text-3xl'>{main.headline}</h1>
          <p className='text-2xl lg:w-[728px] mx-auto'>{main.headline_message}</p>
        </div>
      </section>

      <main className='px-8'>
        <section className='container lg:w-[1278px] lg:text-lg mx-auto'>
          
          <div className='bg-neutral-900 lg:w-[800px] p-7 py-9 rounded-xl mx-auto'>
            <h2 className='text-3xl font-bold mb-3'>{main['$forms'].main_title}</h2>

            <nav>
              <ul className='flex gap-8'>
                <li>
                  <button 
                    onClick={() => setForm('create')}
                    type='button'
                    className='p-8'>{main["$forms"].tab0}</button>
                </li>
                <li>
                  <button 
                    onClick={() => setForm('remove')}
                    type='button'
                    className='p-8'>{main["$forms"].tab1}</button>
                </li>
              </ul>
            </nav>

            <hr className='border-neutral-700/25' />

            <Show when={toggledForm == 'create'}>
              <form onSubmit={onCreateUrlToken}>
                <h2>{main['$forms'].create_url_token.title}</h2>
                
                <label>
                  {main['$forms'].create_url_token.input0.title}
                  <input
                    placeholder={main['$forms'].create_url_token.input0.placeholder} 
                    type='url'
                    required
                    aria-required={true}
                    name='url' />
                </label>

                <button
                  type="submit">
                  {main['$forms'].create_url_token.submit}
                </button>
              </form>
            </Show>

            <Show when={toggledForm == 'remove'}>
              <form onSubmit={onRemoveUrlToken}>
                <h2>{main['$forms'].remove_url_token.title}</h2>

                <label>
                  {main['$forms'].remove_url_token.input0.title}
                  <input
                    placeholder={main['$forms'].remove_url_token.input0.placeholder}
                    pattern={'[A-Za-z0-5]{5}'}
                    required
                    aria-required={true}
                    name='token' />
                </label>

                <button 
                  type='submit'>
                  {main['$forms'].remove_url_token.submit}
                </button>
              </form>
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