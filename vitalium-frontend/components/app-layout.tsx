"use client"

import type React from "react"

import { Sidebar, MobileSidebar } from "@/components/sidebar"
import { Button } from "@/components/ui/button"
import { Bell, Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface AppLayoutProps {
  children: React.ReactNode
  userRole?: string
  showSidebar?: boolean
}

export function AppLayout({ children, userRole, showSidebar = true }: AppLayoutProps) {
  if (!showSidebar) {
    return <>{children}</>
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <Sidebar userRole={userRole} />

      {/* Main Content */}
      <div className="lg:pl-64">
        {/* Top Header */}
        <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="flex h-14 sm:h-16 items-center gap-2 sm:gap-4 px-3 sm:px-4 lg:px-6">
            <MobileSidebar userRole={userRole} />

            {/* Search - Made search responsive and collapsible on small screens */}
            <div className="flex-1 max-w-xs sm:max-w-md">
              <div className="relative">
                <Search className="absolute left-2 sm:left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input placeholder="Buscar..." className="pl-8 sm:pl-10 text-sm h-9 sm:h-10" />
              </div>
            </div>

            {/* Actions - Made actions more compact on mobile */}
            <div className="flex items-center gap-1 sm:gap-2">
              <Button variant="ghost" size="icon" className="h-9 w-9 sm:h-10 sm:w-10">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
                <span className="sr-only">Notificações</span>
              </Button>
            </div>
          </div>
        </header>

        {/* Page Content - Added responsive padding */}
        <main className="flex-1 p-3 sm:p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
