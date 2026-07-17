import React, { createContext, useContext, useState, useEffect } from 'react'

const SESSION_KEY = 'styleseed_custom_kit'

const CustomKitContext = createContext(null)

export function CustomKitProvider({ children }) {
  const [customKit, setCustomKitState] = useState(() => {
    try {
      const stored = sessionStorage.getItem(SESSION_KEY)
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  function setCustomKit(kit) {
    setCustomKitState(kit)
    if (kit) {
      try {
        sessionStorage.setItem(SESSION_KEY, JSON.stringify(kit))
      } catch {
      }
    } else {
      sessionStorage.removeItem(SESSION_KEY)
    }
  }

  return (
    <CustomKitContext.Provider value={{ customKit, setCustomKit }}>
      {children}
    </CustomKitContext.Provider>
  )
}

export function useCustomKit() {
  const ctx = useContext(CustomKitContext)
  if (!ctx) throw new Error('useCustomKit must be used within CustomKitProvider')
  return ctx
}
