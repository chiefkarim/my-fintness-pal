'use client'

import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function ProtectedNav() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <h1 className="text-lg font-semibold">MyFitnessPal</h1>
        <div className="flex items-center gap-4">
          {session?.user?.email && (
            <span className="text-sm text-gray-600">{session.user.email}</span>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => signOut({ callbackUrl: '/auth/signin' })}
          >
            Logout
          </Button>
        </div>
      </div>
    </header>
  )
}
