import React, { useEffect } from 'react'
import "./myStyles.css"
import { Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { useAuthStore } from './store/app.Store'
import LoadingSpinner from './components/LoadingSpinner'
import Signup from './pages/Signup'
import Login from './pages/Login'
import ForgotPassword from './pages/ForgotPassword'
import EmailVerificationPage from './pages/EmailVerificationPage'
import ResetPassword from './pages/ResetPassword'
import MainPage from './pages/MainPage'
import AdminPage from './pages/AdminPage'
import AboutUsPage from './pages/AboutUsPage'
import ContactUsPage from './pages/ContactUsPage'



//protect routes that require authentication
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />
  }

  if (!user?.isVerified) {
    return <Navigate to="/verify-email" replace />
  }
  return children
}

// Protect admin routes
const ProtectedAdminRoute = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!user?.isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// redirect authenticated users to the home page
const RedirectAuthenticatedUser = ({ children }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (isAuthenticated && user?.isVerified) {
    return <Navigate to="/" replace />
  }
  return children
}

function App() {

  const { checkAuth, isCheckingAuth } = useAuthStore()

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  if (isCheckingAuth) return <LoadingSpinner />

  return (
    <section className='pagebg min-h-[100vh] min-w-full'>
      <Routes>
        <Route path="/admin" element={
          <ProtectedAdminRoute>
            <AdminPage />
          </ProtectedAdminRoute>
        } />
        <Route path="/" element={
          <ProtectedRoute>
            <MainPage />
          </ProtectedRoute>
        } />
        <Route path="/signup" element={
          <RedirectAuthenticatedUser>
            <Signup />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/login" element={
          <RedirectAuthenticatedUser>
            <Login />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/forgot-password" element={
          <RedirectAuthenticatedUser>
            <ForgotPassword />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/verify-email" element={
          <RedirectAuthenticatedUser>
            <EmailVerificationPage />
          </RedirectAuthenticatedUser>
        } />

        <Route path='/reset-password/:token' element={
          <RedirectAuthenticatedUser>
            <ResetPassword />
          </RedirectAuthenticatedUser>
        } />
        <Route path="/about-us" element={
          <ProtectedRoute>
            <AboutUsPage />
          </ProtectedRoute>
        } />
        <Route path="/Contact-us" element={
          <ProtectedRoute>
            <ContactUsPage />
          </ProtectedRoute>
        } />
      </Routes>
      <Toaster />
    </section>
  )
}

export default App