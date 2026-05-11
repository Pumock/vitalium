"use client"

import type React from "react"
import { useEffect } from "react"
import { usePathname, useRouter } from "next/navigation"

import { Sidebar, MobileSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { useSession } from "@/services/auth/use-session"

interface AppLayoutProps {
  children: React.ReactNode
  userRole?: string
  showSidebar?: boolean
}

function normalizeRole(role?: string | null) {
  return role?.trim().toLowerCase() ?? ""
}

function getRoleHomePath(role?: string | null) {
  switch (normalizeRole(role)) {
    case "admin":
      return "/work/admin/dashboard"
    case "doctor":
      return "/work/doctor/dashboard"
    case "patient":
      return "/work/patient/dashboard"
    default:
      return "/work"
  }
}

export function AppLayout({ children, userRole, showSidebar = true }: AppLayoutProps) {
  const router = useRouter()
  const pathname = usePathname()
  const { isReady, accessToken, user } = useSession()
  const normalizedUserRole = normalizeRole(user?.role)
  const normalizedRequiredRole = normalizeRole(userRole)

  useEffect(() => {
    if (!showSidebar || !isReady) {
      return
    }

    if (!accessToken || !user) {
      router.replace("/login")
      return
    }

    if (normalizedRequiredRole && normalizedUserRole !== normalizedRequiredRole) {
      router.replace(getRoleHomePath(user.role))
    }
  }, [accessToken, isReady, normalizedRequiredRole, normalizedUserRole, pathname, router, showSidebar, user])

  if (!showSidebar) {
    return <>{children}</>
  }

  const isCheckingSession =
    !isReady ||
    !accessToken ||
    !user ||
    (normalizedRequiredRole ? normalizedUserRole !== normalizedRequiredRole : false)

  if (isCheckingSession) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center text-muted-foreground">
        Verificando sessão...
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Sidebar userRole={userRole} />

      <div className="lg:pl-64">
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-6">
            <MobileSidebar userRole={userRole} />

            <div className="flex-1 max-w-xs sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-8 sm:pl-10 text-sm h-9 sm:h-10" />
              </div>
            </div>

            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Notificações</span>
              </Button>
            </div>
          </div>
        </header>

        <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
