import { Outlet } from 'react-router'

const AuthLayout = () => {
  return (
    <div className='h-[80vh] flex justify-center items-center'>
      <Outlet/>
    </div>
  )
}

export default AuthLayout