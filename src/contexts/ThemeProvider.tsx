import { useLocalStorage } from "@/hooks/useLocalStorage"
import { createContext } from "react"

export type Theme = 'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme,
  setTheme: (theme: Theme) => void
}

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType)

/** PROVIDER & PROPS TYPE*/
type ContextProviderProps = {
  children: React.ReactNode
}

export const ThemeProvider = ( { children }: ContextProviderProps) => {
  const [ theme, setTheme ] = useLocalStorage<Theme>('theme', 'system')

  const changeTheme = (newTheme: Theme) => {

    const isDark = 
      newTheme === "dark" ||
      (newTheme === 'system' && matchMedia("(prefers-color-scheme: dark)").matches)
    
    document.documentElement.classList.toggle("dark", isDark)
    setTheme(newTheme)
  }
  
  // later on, we are going to need to add 'isDark' to the Theme Context
  // that will be with isDark: document.documentElement.classList.contains("dark") (a boolean)

  return (
    <ThemeContext.Provider value={{ theme, setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

