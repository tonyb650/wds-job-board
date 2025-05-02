import useAuth from "@/features/authentication/hooks/useAuth"
import { Outlet } from "react-router"


type Props = {

}

const Private = ({}: Props) => {
  const {user} = useAuth()

  if (user) {
    return (
      <Outlet/>
    )
  } else {
    return (
      <h1>Not logged in.</h1>
    )
  }
}

export default Private