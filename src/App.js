import React, {useState} from 'react'
import { Navigate, createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ForgotPassword, ResetPassword, Register, Login } from './components/authentication'
import { Home, CreatePost, Viewpost, EditIndexPost } from './components/pages';
import { useSelector } from 'react-redux'
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ErrorPage from './components/pages/errpage/errpage';

const App = () => {
  const [loading, setLoading] = useState(true)
  const spinner = document.getElementById('spinner')
  
  if(spinner){
    setTimeout(() => {
      spinner.style.display="none"
      setLoading(false)
    }, 2000)
  }

  const user = useSelector(state => state?.auth.user)
  const router = createBrowserRouter([
    {
      path: '/',
      element:!user? <Navigate to='/login'/>:<Home/>,
      errorElement: <ErrorPage/>
    },
    {
      path: '/login',
      element: !user ? <Login/> : <Navigate to='/'/>
    },
    {
      path: '/viewpost/:id',
      element: user ? <Viewpost/> : <Navigate to='/login'/>
    },
    {
      path: '/editpost/:id',
      element: user ? <EditIndexPost/> : <Navigate to='/login'/>
    },
    {
      path: '/register',
      element: !user ? <Register/> : <Navigate to='/login'/>
    },
    {
      path: '/forgotpassword',
      element: !user ? <ForgotPassword/> : <Navigate to='/login'/>
    },
    {
      path: '/resetpassword/:id/:token',
      element: <ResetPassword/>
    },
    {
      path: '/createpost',
      element: user ? <CreatePost/> : <Navigate to='/login'/>
    }
  ])
  return (
    !loading &&
    <>
      <ToastContainer
      pauseOnHover={false}
      transition={Slide}
      limit={2}
      hideProgressBar={true}
      theme='dark'
      />
      <RouterProvider router={router}/>
    </>
  )
}

export default App