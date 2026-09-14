import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Home from './Home'

describe('Home', () => {
  it('renders the placeholder heading', () => {
    render(<Home />)
    expect(screen.getByRole('heading', { name: /usecase task breakdown/i })).toBeInTheDocument()
  })
})
