import { 
  type FunctionComponent, 

  type MouseEventHandler,
  type AnchorHTMLAttributes } from 'react'
import { navigate } from 'vike/client/router'

export { Link }

type LinkComponent = FunctionComponent<AnchorHTMLAttributes<HTMLAnchorElement> & {
  keepScrollPosition?: boolean | undefined
  overwriteLastHistoryEntry?: boolean | undefined
}>

const Link: LinkComponent = props => {
  const { href, children } = props

  const onClick: MouseEventHandler<HTMLAnchorElement> = ev => {
    const { nativeEvent } = ev
    
    nativeEvent.stopImmediatePropagation()
    nativeEvent.preventDefault()

    if (href) {
      const { keepScrollPosition, overwriteLastHistoryEntry } = props
      
      navigate(href, { keepScrollPosition, overwriteLastHistoryEntry })
    }

    if (props.onClick) props.onClick(ev)
  }

  return (
    <a href={href as string} onClick={onClick}>{children}</a>
  )
} 