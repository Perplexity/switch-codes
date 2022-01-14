import classNames from 'classnames'
import styles from './Spinner.module.css'
import React from 'react'

interface Props extends React.HTMLAttributes<HTMLDivElement> { }

const Spinner = ({ className }: Props) => {
  return <div className={classNames(styles.spinner, 'text-red-600 animate-spin', className)} />
}

export default Spinner
