import { THEME_OPTIONS } from "@/constants/constants"
import { useLocalStorage } from "@/hooks/useLocalStorage"
import { createContext } from "react"

export type Theme = (typeof THEME_OPTIONS)[number] //'light' | 'dark' | 'system'

type ThemeContextType = {
  theme: Theme,
  isDark: boolean,
  setTheme: (theme: Theme) => void,
}

export const ThemeContext = createContext<ThemeContextType | null >(null)

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
  

  return (
    <ThemeContext.Provider value={{ theme, isDark: document.documentElement.classList.contains("dark"), setTheme: changeTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

