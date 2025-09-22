import { useState, useEffect } from 'react'
import { ThemeProvider } from 'next-themes'
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import About from './pages/About'
import Services from './pages/Services'
import Team from './pages/Team'
import Events from './pages/Events'
import JoinUs from './pages/JoinUs'
import Contact from './pages/Contact'
import GetStarted from './components/GetStarted'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import RegistrationForm from './pages/RegistrationForm'
import Footer from './components/Footer'
import { getAuthToken } from './lib/api'

function App() {
  const [mounted, setMounted] = useState(false)
  const [darkMode, setDarkMode] = useState(false)

  // Ensure component is mounted before rendering theme-dependent content
  useEffect(() => {
    setMounted(true)
    
    // Check for saved theme preference or default to 'light'
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark')
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true)
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    const newMode = !darkMode
    setDarkMode(newMode)
    document.documentElement.classList.toggle('dark', newMode)
    localStorage.setItem('theme', newMode ? 'dark' : 'light')
  }

  if (!mounted) {
    return null // Prevent hydration mismatch
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <BrowserRouter>
        <div className="min-h-screen bg-background flex flex-col">
          {/* Navigation */}
          <AdminAwareLayout>
            {({ isAdminRoute }) => (
              !isAdminRoute ? <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : null
            )}
          </AdminAwareLayout>
          
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/services" element={<Services />} />
              <Route path="/team" element={<Team />} />
              <Route path="/events" element={<Events />} />
              <Route path="/join-us" element={<JoinUs />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/get-started" element={<GetStarted />} />
              <Route path="/admin" element={<AdminLogin />} />
              <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
              <Route path="/register" element={<RegistrationForm />} />
            </Routes>
          </div>
          
          {/* Footer Section */}
          <AdminAwareLayout>
            {({ isAdminRoute }) => (!isAdminRoute ? <Footer /> : null)}
          </AdminAwareLayout>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

function AdminAwareLayout({ children }: { children: (ctx: { isAdminRoute: boolean }) => JSX.Element | null }) {
  const location = useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin')
  return children({ isAdminRoute })
}

function RequireAdmin({ children }: { children: JSX.Element }) {
  const token = getAuthToken()
  if (!token) {
    return <Navigate to="/admin" replace />
  }
  return children
}