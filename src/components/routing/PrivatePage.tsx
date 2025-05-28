import { LoadingSpinner } from "@/components/ui/LoadingSpinner"
import useAuth from "@/features/authentication/hooks/useAuth"
import { ReactNode } from "react"
import { Navigate, useLocation } from "react-router"


/*
1) If the user is loading, return a spinner
2) if the 'user' is null (no user logged in), then Navigate to LoginPage. 
      Additionally, we add 'replace' to the Navigate action so that 
      Also, we add 'state={{location}}'. This passes a little bit of state with the Navigation action.
      In the AuthProvider, we look for that incoming state and if it is there, we use it to navigate
      the user back to where they wanted to go when this component redirected them. Without this state,
      we wouldn't know what was the last place they were trying to access
3) Otherwise we render the children.

In my original implementation of the is component, I used <Outlet/> in combination with the main 'router' for the app.
Kyle is doing something different, he is wrapping each protected component with this wrapper. This works independent of
the 'router' so perhaps is a more flexible and fine-grained solution(?) On the other hand, in a very large app, perhaps
addressing protection at the router level would be a bit safer ?? 

*/

type Props = {
  children: ReactNode
}

const Private = ({children}: Props) => {
  const {user, isLoadingUser} = useAuth()
  const location = useLocation()

  if (isLoadingUser) {
    return <LoadingSpinner/>
  } else if (user == null) {
    return <Navigate to="/login" replace state={{location}}/>
  } else {
    return children
  }
}

export default Private