
import { IconDefinition } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import classNames from 'classnames'
import React from 'react'

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: IconDefinition
  colour?: 'red' | 'sky'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  outline?: boolean
  loading?: boolean
}

const btnSizes = {
  xs: 'btn-xs',
  sm: 'btn-sm',
  md: 'btn-md',
  lg: 'btn-lg'
}

export const Button = ({ icon, colour = 'red', size = 'sm', outline = false, loading = false, children, ...props }: Props) => {
  let classes = classNames('btn focus:ring-1', btnSizes[size], { 'btn-outline': outline, loading })
  if (colour === 'red') {
    classes = classNames(classes, { 'bg-red-500': !outline, 'text-red-500': outline, 'text-white': !outline }, 'hover:bg-red-700 border-red-500 hover:border-red-700 ring-red-900')
  } else {
    classes = classNames(classes, { 'bg-sky-500': !outline, 'text-sky-500': outline, 'text-white': !outline }, 'hover:bg-sky-700 border-sky-500 hover:border-sky-700 ring-sky-900')
  }
  return (
    <button type="submit" className={classes} {...props}>
      <div className='flex gap-1 items-center'>
        {icon && <FontAwesomeIcon className={'text-lg'} icon={icon} />}
        {children}
      </div>
    </button>
  )
}
