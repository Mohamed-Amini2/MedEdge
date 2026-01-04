import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login_Page from './pages/auth/login';
import { GoogleOAuthProvider } from '@react-oauth/google';
import HomePage from './pages/HomePage';
import Complete_Profile_Page from './pages/auth/Complete_Profile_Page';

function App() {

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <Routes>
          <Route path='/login' element={<Login_Page />}/>
          <Route path='/' element={<HomePage />} />
          <Route path='/completet_login' element={<Complete_Profile_Page />} />
      </Routes>
    </BrowserRouter>
    </GoogleOAuthProvider>
  )
}

export default App
