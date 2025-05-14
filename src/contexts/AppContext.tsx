/* eslint-disable @typescript-eslint/no-explicit-any */
import useRequest from '@/utils/useRequest'
import { UserProps } from 'next-auth'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

interface AppContextData {
  isLoading: boolean
  isSignUpModalOpen: boolean
  loggedUser: UserProps | null
  user: UserProps | null
  handleSetUser: (value: UserProps) => void
  handleSetIsLoading: (value: boolean) => void
  handleSetIsSignUpModalOpen: (value: boolean) => void
  handleSetLoggedUser: (data: UserProps) => void
}

const AppContext = createContext<AppContextData | undefined>(undefined)

export function useAppContext() {
  const context = useContext(AppContext)
  if (!context) {
    throw new Error('useAppContext must be used within a AppContextProvider')
  }
  return context
}

interface AppContextProviderProps {
  children: ReactNode
}

export function AppContextProvider({ children }: AppContextProviderProps) {
  const [user, setUser] = useState<UserProps | null>(null)

  const [isLoading, setIsLoading] = useState(false)

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  const [loggedUser, setLoggedUser] = useState<UserProps | null>(null)

  const { data } = useRequest<UserProps | null>({
    url: '/user',
    method: 'GET',
  })

  function handleSetIsLoading(value: boolean) {
    setIsLoading(value)
  }

  function handleSetIsSignUpModalOpen(value: boolean) {
    setIsSignUpModalOpen(value)
  }

  const handleSetLoggedUser = useCallback(
    (value: UserProps) => setLoggedUser(value),
    [],
  )

  const handleSetUser = (value: UserProps) => {
    setUser(value)
  }

  useEffect(() => {
    if (data) {
      setUser(data)
    }
  }, [data])

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isSignUpModalOpen,
        loggedUser,
        user,
        handleSetUser,
        handleSetIsLoading,
        handleSetLoggedUser,
        handleSetIsSignUpModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
