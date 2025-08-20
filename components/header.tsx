"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { useState } from "react"
import { Brain, LogIn, LogOut } from "lucide-react"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { authClient } from "@/lib/auth-client"
import { nav } from "@/constants"

export default function Header({
  isAuthenticated,
}: {
  isAuthenticated?: boolean
}) {
  const pathname = usePathname()
  const router = useRouter()
  const [signingOut, setSigningOut] = useState(false)

  return (
    <header className="bg-card/70 sticky top-0 z-40 border-b backdrop-blur-md">
      <div className="container mx-auto px-6 md:px-16">
        <div className="flex h-14 items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-primary rounded-md p-1.5">
              <Brain className="text-primary-foreground h-4 w-4" />
            </div>
            <span className="font-heading text-sm font-semibold tracking-wide">
              TaskFlow
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <nav className="flex items-center gap-1">
              {nav.map((item) => {
                const Icon = item.icon
                const active =
                  pathname === item.href ||
                  (item.href !== "/" && pathname?.startsWith(item.href))
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      buttonVariants({
                        variant: active ? "secondary" : "ghost",
                        size: "sm",
                      }),
                      "px-3"
                    )}
                  >
                    <Icon className="h-4 w-4 md:mr-1" />
                    <span className="hidden sm:inline">{item.label}</span>
                  </Link>
                )
              })}
              {!isAuthenticated && (
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "px-3"
                  )}
                >
                  <LogIn className="h-4 w-4 md:mr-1" />
                  <span className="hidden sm:inline">Login</span>
                </Link>
              )}
              {isAuthenticated && (
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      setSigningOut(true)
                      await authClient.signOut({
                        fetchOptions: {
                          onSuccess: () => {
                            router.push("/login")
                            router.refresh()
                          },
                        },
                      })
                    } finally {
                      setSigningOut(false)
                    }
                  }}
                  disabled={signingOut}
                  className={cn(
                    buttonVariants({ variant: "ghost", size: "sm" }),
                    "px-3"
                  )}
                  aria-label="Sign out"
                >
                  <LogOut className="h-4 w-4 md:mr-1" />
                  <span className="hidden sm:inline">Sign out</span>
                </button>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}
