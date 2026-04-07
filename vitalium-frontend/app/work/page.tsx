import { AppLayout } from "@/components/app-layout"
import type React from "react"

const currentUserRole = 'admin'

export default function Work({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <AppLayout userRole={currentUserRole}>
      {children}
    </AppLayout>
  )
}
