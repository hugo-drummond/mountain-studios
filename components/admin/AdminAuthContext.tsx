'use client'

import { createContext, useContext, useEffect, useState } from 'react'

interface AdminAuthContextValue {
  token: string | null
  setToken: (t: string) => void
}

const AdminAuthContext = createContext<AdminAuthContextValue>({
  token: null,
  setToken: () => {},
})

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setTokenState] = useState<string | null>(null)

  useEffect(() => {
    const stored = localStorage.getItem('agency_admin_token')
    if (stored) setTokenState(stored)
  }, [])

  function setToken(t: string) {
    localStorage.setItem('agency_admin_token', t)
    setTokenState(t)
  }

  return (
    <AdminAuthContext.Provider value={{ token, setToken }}>
      {children}
    </AdminAuthContext.Provider>
  )
}

export function useAdminAuth(): AdminAuthContextValue {
  return useContext(AdminAuthContext)
}

export default AdminAuthContext
