import Header from './components/layout/Header'
import './App.css'
import {
  BrowserRouter,
  Route,
  Routes,
  useSearchParams,
  Navigate,
  Outlet,
} from 'react-router-dom'
import Sidebar from './components/layout/Sidebar'
import { Box } from '@material-ui/core'
import Video from './pages/Videos/Video'
import User from './pages/Users/User'
import AccountInfo from './pages/AccontInfo'
import AppProvider, { appContext } from './context'
import Dashboard from './pages/Dashboard'
import { useEffect, useState } from 'react'
import LoginForm from './pages/Login/Login'
const PrivateRouter = () => {
  const [isLogin, setIsLogin] = useState(undefined)
  useEffect(() => {
    let token = localStorage.getItem('token')
    // if (!token && window.location.pathname !== "/login") {
    //   window.location.assign("/login");
    // }else
    if (token) {
      setIsLogin(true)
    } else {
      setIsLogin(false)
    }
  }, [])
  if (isLogin == false) return <Navigate replace to="/login" />
  else if (isLogin == true)
    return (
      <AppProvider>
        <div className="App">
          <Header />
          <Box className="mainContent">
            <Sidebar />
            <Box className="contenView">
              <Outlet />
            </Box>
          </Box>
        </div>
      </AppProvider>
    )
  else return <></>
}
const appRouter = () => [
  <Route path="video" element={<Video />} />,
  <Route path="user" element={<User />} />,
  <Route path="my-account" element={<AccountInfo />} />,
  <Route path="dashboard" element={<Dashboard />} />,
]
// sửa cái gì đó
function App() {
  return (
    <BrowserRouter basename=''>
      <Routes>
        <Route path="/" element={<PrivateRouter />} children={appRouter()} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
