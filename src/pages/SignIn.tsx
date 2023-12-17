import React from 'react'
import { login, register } from '../service'
import { Link, useLocation, useNavigate } from 'react-router-dom'

const SignIn: React.FC = () => {
  const nav = useNavigate()
  const isSignIn = useLocation().pathname === '/signin'
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isError, setIsError] = React.useState(false)

  return (
    <section className='min-h-screen flex items-stretch text-white'>
      <div className='w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-gray-900'>
        <div className='w-full py-6 z-20'>
          <h1 className='my-6'>
            <Link to='/' className='text-white text-3xl font-semibold tracking-widest letter-spacing-2 hover:underline hover:text-gray-100'>
              ImageLibrary
            </Link>
          </h1>
          <p className='text-gray-500'>
            {isSignIn ? 'Sign in to your account' : 'Sign up for a new account'}
          </p>
          <div className='sm:w-2/3 w-full px-4 lg:px-0 mx-auto'>
            <div className='pb-2 pt-4'>
              <input
                autoComplete='off' spellCheck='false'
                placeholder='Username'
                className={`block w-full p-4 text-lg rounded-sm bg-black ${isError ? 'border-2 border-red-500' : ''}`}
                value={username} onChange={e => setUsername(e.target.value)}
              />
            </div>
            <div className='pb-2 pt-4'>
              <input
                autoComplete='off' spellCheck='false'
                className={`block w-full p-4 text-lg rounded-sm bg-black ${isError ? 'border-2 border-red-500' : ''}`}
                type='password' placeholder='Password'
                value={password} onChange={e => setPassword(e.target.value)} 
              />
            </div>
            <div className='text-right text-gray-400'>
              Already have an account? <Link to={isSignIn ? '/signup' : '/signin'} className='hover:underline hover:text-gray-100'>Click here to {isSignIn ? 'sign up' : 'sign in'}.</Link>
            </div>
            <div className='px-4 pb-2 pt-4'>
              <button
                className='uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none'
                onClick={() => {
                  if (!username || !password) return
                  setIsError(false)
                  console.log(username)
                  ;(isSignIn ? login : register)(username, password).then(success => {
                    if (success) {
                      nav('/')
                      location.reload()
                    } else setIsError(true)
                  })
                }}
              >
                {isSignIn ? 'Sign in' : 'Sign up'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SignIn
