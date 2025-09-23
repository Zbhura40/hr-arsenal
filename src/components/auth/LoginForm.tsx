'use client'

import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const { signIn, signInWithProvider } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await signIn(email, password)
    
    if (error) {
      setMessage(error.message)
    } else {
      setMessage('Successfully signed in!')
    }
    
    setLoading(false)
  }

  const handleProviderSignIn = async (provider: 'google' | 'github' | 'discord') => {
    setLoading(true)
    setMessage('')

    const { error } = await signInWithProvider(provider)
    
    if (error) {
      setMessage(error.message)
    }
    
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>
        
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? 'Signing in...' : 'Sign In'}
        </Button>
      </form>

      <div className="mt-6">
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300" />
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with</span>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-3 gap-3">
          <Button
            variant="outline"
            onClick={() => handleProviderSignIn('google')}
            disabled={loading}
            className="w-full"
          >
            Google
          </Button>
          <Button
            variant="outline"
            onClick={() => handleProviderSignIn('github')}
            disabled={loading}
            className="w-full"
          >
            GitHub
          </Button>
          <Button
            variant="outline"
            onClick={() => handleProviderSignIn('discord')}
            disabled={loading}
            className="w-full"
          >
            Discord
          </Button>
        </div>
      </div>

      {message && (
        <div className={`mt-4 p-3 rounded-md ${
          message.includes('Successfully') 
            ? 'bg-green-50 text-green-700' 
            : 'bg-red-50 text-red-700'
        }`}>
          {message}
        </div>
      )}
    </div>
  )
}
