"use client"

import type React from "react"
import { createContext, useState, useEffect, useContext } from "react"
import { useColorScheme } from "react-native"
import { type Theme, darkTheme, lightTheme } from "../theme/theme"

type ThemeContextType = {
  theme: Theme
  isDarkMode: boolean
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType>({
  theme: lightTheme,
  isDarkMode: false,
  toggleTheme: () => {},
})

export const useTheme = () => useContext(ThemeContext)

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme()
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark")

  useEffect(() => {
    setIsDarkMode(colorScheme === "dark")
  }, [colorScheme])

  const theme = isDarkMode ? darkTheme : lightTheme

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode)
  }

  return <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>{children}</ThemeContext.Provider>
}

