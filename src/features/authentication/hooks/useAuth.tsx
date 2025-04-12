import { AuthContext } from '@/features/authentication/contexts/AuthProvider'
import { useContext } from 'react'

const useAuth = () => {
    const auth = useContext(AuthContext)
    if (auth == null) {
      throw new Error("auth context must be used inside of auth Provider!")
    }
    return auth
}

export default useAuth