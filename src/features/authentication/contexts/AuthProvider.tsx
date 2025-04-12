import { createContext, useEffect, useState } from "react"
import { User } from "../constants/types"
import { LoginFormValues } from "../components/LoginForm"
import axios from "axios"
import { useNavigate } from "react-router"
import { loginService } from "../services/auth"


type AuthContextType = {
  login: ({email, password} : LoginFormValues) => Promise<User>,
  logout: () => void,
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
}

export const AuthContext = createContext<AuthContextType | null >(null)

/** PROVIDER & PROPS TYPE*/
type ContextProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ( { children }: ContextProviderProps) => {
  const [ user, setUser ] = useState<User>()
  const navigate = useNavigate()

  useEffect(() => {
    const refresh = async () => {
      try {
        const res = await axios.get('http://localhost:3000/users/session', {withCredentials: true})
        setUser({id: res.data.id, email: res.data.email })
      } catch (error) {
        console.log("Failed to fetch session.")
      }
    }
    refresh()
  },[])

  const login = ({email, password}: LoginFormValues): Promise<User> => {
    // not catching errors here, we want errors caught in the component where they can be displayed for the user
    return loginService({email, password}).then((res) => {
      setUser({id: res.data.id, email: res.data.email })
      navigate("/tasks")
      return res.data
    })
  }
    
    const logout = async () => {
      try {
        await axios.delete('http://localhost:3000/users/logout', {withCredentials: true})
        alert("Successfully logged out")
        navigate("/")
      } catch (error) {
        // TODO
        console.error(error)
        console.error("Unable to perform session delete")
      }

  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

