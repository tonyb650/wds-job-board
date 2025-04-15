import { createContext, useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { LoginFormValues } from "../components/LoginForm"
import LogoutDialog from "../components/LogoutDialog"
import { SignupFormValues } from "../components/SignUpForm"
import { User } from "../constants/types"
import { getLoggedInUserService, loginService, logoutService, signupService } from "../services/auth"


type AuthContextType = {
  login: ({email, password} : LoginFormValues) => Promise<void>,
  signup: ({email, password, confirmPassword} : SignupFormValues) => Promise<void>,
  logout: () => void,
  user: User | undefined,
  setUser: React.Dispatch<React.SetStateAction<User | undefined>>
  isLoadingUser: boolean,
}

export const AuthContext = createContext<AuthContextType | null >(null)

/** PROVIDER & PROPS TYPE*/
type ContextProviderProps = {
  children: React.ReactNode
}

export const AuthProvider = ( { children }: ContextProviderProps) => {
  const navigate = useNavigate()
  const [ user, setUser ] = useState<User>()

  const [ isLoadingUser, setIsLoadingUser] = useState(false)
  const [ isLoggingOut, setIsLoggingOut] = useState(false)

  useEffect(() => {
    // (async () => {
    //   try {
    //     setIsLoadingUser(true)
    //     const {data} = await getLoggedInUserService()
    //     setUser({id: data.id, email: data.email })
    //   } catch (error) {
    //     console.log("Failed to fetch session.")
    //   } finally {
    //     setIsLoadingUser(false)
    //   }
    // })()
    /* 
      The following slick refactoring is made possible by having the service return the 'data', not the 'res'
      Notice that we can pass the function 'setUser' to .then() without wrapping it in another function 
    */
    setIsLoadingUser(true)
    getLoggedInUserService().then(setUser).finally(() => setIsLoadingUser(false))
  },[])

  const login = (formData: LoginFormValues): Promise<void> => {
    // not catching errors here, we want errors caught in the component where they can be displayed for the user
    setIsLoadingUser(true)
    return loginService(formData).then((res) => {
      setUser({id: res.data.id, email: res.data.email })
      navigate("/tasks")
    }).finally(() => setIsLoadingUser(false))
  }

  const signup = async ({email, password, confirmPassword}: SignupFormValues): Promise<void> => {
    setIsLoadingUser(true)
    return signupService({email, password, confirmPassword}).then((res) => {
      setUser({id: res.data.id, email: res.data.email })
      navigate("/tasks")
    }).finally(() => { setIsLoadingUser(false)})
  }

  const logout = async (): Promise<void> => {
    try {
      setIsLoggingOut(true)
      
      await logoutService()
      setUser(undefined)
      navigate("/") // TODO: Probably should happen automatically when there is no user 
    } catch (error) {
      console.error("Unable to perform session delete")
      console.error(error)
    } finally {
      setIsLoggingOut(false)
    }
  }
  

  return (
    <AuthContext.Provider value={{ user, setUser, login, signup, logout, isLoadingUser }}>
      {children}
      <LogoutDialog isLoggingOut={isLoggingOut} onOpenChange={setIsLoggingOut}/>
    </AuthContext.Provider>
  )
}