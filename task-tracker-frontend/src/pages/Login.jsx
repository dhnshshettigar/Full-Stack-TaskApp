import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [username, setUsername] = useState('')
  const [password, setPassWord] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.post('http://localhost:4000/api/login', { username, password })
      const token = res.data.token
      localStorage.setItem('token', token)
      setError('')
      navigate('/dashboard')
    } catch (error) {
      setError(error.response?.data?.message || "Login Failed")
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-sm'>
        <h1 className='text-2xl font-bold mb-6 text-center text-gray-800'>Login</h1>
        <form onSubmit={handleSubmit} className='space-y-4'>
          <input
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:border-blue-500'
          />
          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassWord(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded text-black focus:outline-none focus:ring focus:border-blue-500'
          />
          <button
            type="submit"
            className='w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition'
          >
            Login
          </button>
        </form>

        <button
          onClick={() => navigate('/register')}
          className='w-full mt-4 text-blue-500 hover:underline text-sm'
        >
          Don&apos;t have an account? Register
        </button>

        {error && <p className="mt-4 text-red-500 text-sm text-center">{error}</p>}
      </div>
    </div>
  )
}

export default Login
