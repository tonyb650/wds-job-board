import { Outlet } from 'react-router'

export const AuthLayout = () => {
  return (
    <div className='h-full flex justify-center items-center'>
      <Outlet/>
    </div>
  )
}