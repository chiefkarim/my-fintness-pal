'use client'

import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from '@/components/ui/button'

export function ProtectedNav() {
  const { data: session } = useSession()

  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-6">
          <Link href="/" className="text-lg font-semibold">
            MyFitnessPal
          </Link>
          <nav className="hidden items-center gap-4 text-sm text-muted-foreground sm:flex">
            <Link href="/" className="transition hover:text-foreground">
              Dashboard
            </Link>
            <Link href="/add" className="transition hover:text-foreground">
              Add Food
            </Link>
            <Link href="/diary" className="transition hover:text-foreground">
              Diary
            </Link>
            <Link href="/scan" className="transition hover:text-foreground">
              Scan
            </Link>
            <Link href="/goals" className="transition hover:text-foreground">
              Goals
            </Link>
          </nav>
        </div>
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
      <div className="border-t bg-white sm:hidden">
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs text-muted-foreground">
          <Link href="/" className="transition hover:text-foreground">
            Dashboard
          </Link>
          <Link href="/add" className="transition hover:text-foreground">
            Add Food
          </Link>
          <Link href="/diary" className="transition hover:text-foreground">
            Diary
          </Link>
          <Link href="/scan" className="transition hover:text-foreground">
            Scan
          </Link>
          <Link href="/goals" className="transition hover:text-foreground">
            Goals
          </Link>
        </nav>
      </div>
    </header>
  )
}
