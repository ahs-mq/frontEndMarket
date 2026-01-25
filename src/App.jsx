import './App.css'
import { BrowserRouter, Link, Routes, Route } from 'react-router'
import AppRoutes from './components/AppRoutes.jsx'
import Navbar from './components/Navbar.jsx'
import { AppContext } from './providers/AppProvider.jsx'
import { useEffect, useState } from 'react'
import axios from 'axios'


function App() {
  const [user, setUser] = useState(null);
  const [isAuth, setIsAuth] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      return
    }
    axios.get("/api/user", {
      headers: {
        "Content-Type": "Application/JSON",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        setUser(res.data)
        setIsAuth(true)
      })
      .catch(err => {
        console.log(err)
        setIsAuth(false)
      })
  }, [isAuth])



  return (
    <div className="flex flex-col m-0 bg-gray-900 text-white">
      <AppContext value={{ user, isAuth, setIsAuth, setUser }}>
        <BrowserRouter>
          <Navbar />
          <AppRoutes />
        </BrowserRouter>
      </AppContext>
    </div>
  )
}

export default App
