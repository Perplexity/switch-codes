import { render } from '@testing-library/react'
import { Spinner } from '.'

describe('Spinner', () => {
  it('renders', () => {
    render(<Spinner />)
    expect(document.querySelector('div.spinner.text-red-600.animate-spin')).toBeInTheDocument()
  })
})
