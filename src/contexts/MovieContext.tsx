/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, ReactNode, useContext, useState } from 'react'

interface MovieContextData {
  isLoading: boolean
  handleSetIsLoading: (value: boolean) => void
}

const MovieContext = createContext<MovieContextData | undefined>(undefined)

export function useMovieContext() {
  const context = useContext(MovieContext)
  if (!context) {
    throw new Error(
      'useMovieContext must be used within a MovieContextProvider',
    )
  }
  return context
}

interface BoardsContextProviderProps {
  children: ReactNode
}

export function MovieContextProvider({ children }: BoardsContextProviderProps) {
  const [isLoading, setIsLoading] = useState(false)

  function handleSetIsLoading(value: boolean) {
    setIsLoading(value)
  }

  return (
    <MovieContext.Provider
      value={{
        isLoading,
        handleSetIsLoading,
      }}
    >
      {children}
    </MovieContext.Provider>
  )
}
