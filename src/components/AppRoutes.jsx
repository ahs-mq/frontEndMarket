import { BrowserRouter, Link, Routes, Route } from 'react-router'
import Home from '../pages/Home.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import NewProject from '../pages/New-project.jsx'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/new-project" element={<NewProject />} />
        </Routes>
    )
}