import { Box } from '@material-ui/core'
import { useEffect, useState } from 'react'
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/layout/Header'
import Sidebar from './components/layout/Sidebar'
import AppProvider from './context'
import AccountInfo from './pages/AccontInfo'
import Dashboard from './pages/Dashboard'
import LoginForm from './pages/Login/Login'
import User from './pages/Users/User'
import Video from './pages/Videos/Video'
import Media from './pages/Media/Media'

const PrivateRouter = () => {
  const [isLogin, setIsLogin] = useState(undefined)
  useEffect(() => {
    let token = localStorage.getItem('token')
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
  <Route path="media" element={<Media />} />,
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
