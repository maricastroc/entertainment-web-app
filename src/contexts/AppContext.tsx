/* eslint-disable @typescript-eslint/no-explicit-any */
import { UserProps } from 'next-auth'
import {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useState,
} from 'react'

interface AppContextData {
  isLoading: boolean
  isSignUpModalOpen: boolean
  loggedUser: UserProps | null
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
  const [isLoading, setIsLoading] = useState(false)

  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false)

  const [loggedUser, setLoggedUser] = useState<UserProps | null>(null)

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

  return (
    <AppContext.Provider
      value={{
        isLoading,
        isSignUpModalOpen,
        loggedUser,
        handleSetIsLoading,
        handleSetLoggedUser,
        handleSetIsSignUpModalOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
