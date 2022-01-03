import React from 'react'

// interface Props extends React.InputHTMLAttributes<HTMLInputElement> {

// }

export const TextBox = ({ ...props }: React.InputHTMLAttributes<HTMLInputElement>) => {
  return <input className="focus:ring-1 shadow appearance-none border rounded w-full h-12 py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" {...props} />
}
