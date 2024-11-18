'use client'
import { createContext, useContext, useState, useEffect } from "react"
import { deleteCookie, getCookie } from "./actions"
import { User } from "./types"

const CookieContext = createContext<Session | undefined>(undefined)

interface Session {
  user: User | null
  setUser: (user: User | null) => void
  logout: () => void
}

interface CookieProviderProps {
  children: React.ReactNode
}

export const CookieProvider = ({ children }: CookieProviderProps) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState<boolean>(true)

  const logout = async () => {
    try {
      await deleteCookie()
      setUser(null)
    } catch (error) {
      console.log(error)
    }
  }

  const contextValue = {
    user,
    setUser,
    logout
  }

  const fetchData = async () => {
    try {
      setLoading(true)
      const us = await getCookie()
      setUser(us)
    } catch (error) {
      console.log(error)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <CookieContext.Provider value={contextValue}>
      {
        children
      }
    </CookieContext.Provider>
  )
}

export const useSession = () => {
  const context = useContext(CookieContext)
  if (context === undefined) {
    throw new Error('useSession debe ser usado dentro de un SessionProvider');
  }
  return context
}

export default CookieContext