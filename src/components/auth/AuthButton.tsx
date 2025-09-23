'use client'

import { useAuth } from '@/contexts/AuthContext'
import { Button } from '@/components/ui/button'

export default function AuthButton() {
  const { user, signOut, loading } = useAuth()

  if (loading) {
    return <div>Loading...</div>
  }

  if (user) {
    return (
      <div className="flex items-center space-x-4">
        <span className="text-sm text-gray-700">
          Welcome, {user.email}
        </span>
        <Button onClick={signOut} variant="outline">
          Sign Out
        </Button>
      </div>
    )
  }

  return null
}
