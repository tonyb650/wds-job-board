import { ThemeContext } from "@/contexts/ThemeProvider"
import { useContext } from "react"

const useTheme = () => {
  const theme = useContext(ThemeContext)

  if (theme == null) {
    throw new Error("useTheme must be used within a ThemeProvider")
  }
  
  return theme
}

export default useTheme