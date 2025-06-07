import { render, screen } from '@testing-library/react'
import RegisterPage from '@/app/register/page'
import '@testing-library/jest-dom'

// Mock next/image with typing & displayName
jest.mock('next/image', () => {
  const MockedImage = (props: React.ComponentProps<'img'>) => <img {...props} />
  MockedImage.displayName = 'NextImage'
  return MockedImage
})

// Mock firebase and auth modules to avoid initialization during tests
jest.mock('@/lib/firebaseConfig', () => ({ auth: {} }))
jest.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: jest.fn(),
  updateProfile: jest.fn(),
}))

describe('RegisterPage', () => {
  it('renders form fields and heading', () => {
    render(<RegisterPage />)
    expect(screen.getByText(/Register to DooIT/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument()
    expect(screen.getByLabelText('Password')).toBeInTheDocument()
    expect(screen.getByLabelText(/Confirm Password/i)).toBeInTheDocument()
  })

  it('renders logo, register button and login link', () => {
    render(<RegisterPage />)
    expect(screen.getByAltText(/Logo/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /register/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /login/i })).toHaveAttribute('href', '/login')
  })
})
