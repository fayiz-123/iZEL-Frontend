import './App.css'
import HomePage from './pages/HomePage'
import { Route,Routes } from 'react-router-dom'
import GalleryPage from './pages/GalleryPage'
import AboutPage from './pages/AboutPage'
import AdminDashboard from './pages/admin/AdminDashboard'
import LoginPage from './pages/LoginPage'
import { Toaster } from 'react-hot-toast'
import Registration from './pages/RegistrationPage'
import ToastFixer from './utils/ToastFixer'

function App() {


  return (
    <>
    <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            background: "#333",
            color: "#fff",
          },
          success: {
            style: { background: "green" },
          },
          error: {
            style: { background: "red" },
          },
        }}
      />

      <ToastFixer/>
  
    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<Registration/>}/>
      <Route path='/store' element={<GalleryPage/>}/>
      <Route path='/about' element={<AboutPage/>}/>
      <Route path='/admin' element={<AdminDashboard/>}/>
    </Routes>
    </>
  )
}

export default App
