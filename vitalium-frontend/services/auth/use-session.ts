"use client"

import { useEffect, useState } from "react"
import { getAccessToken, getAuthUser, type AuthUser } from "@/services/auth/session"

interface SessionState {
  isReady: boolean
  accessToken: string | null
  user: AuthUser | null
}

export function useSession(): SessionState {
  const [state, setState] = useState<SessionState>({
    isReady: false,
    accessToken: null,
    user: null,
  })

  useEffect(() => {
    setState({
      isReady: true,
      accessToken: getAccessToken(),
      user: getAuthUser(),
    })
  }, [])

  return state
}
