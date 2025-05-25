'use client'

interface TinaProviderProps {
  children: React.ReactNode
}

export function TinaProvider({ children }: TinaProviderProps) {
  // TinaCMS will be initialized when needed
  // For now, just pass through the children
  return <>{children}</>
}