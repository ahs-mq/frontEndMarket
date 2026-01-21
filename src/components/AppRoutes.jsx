import { BrowserRouter, Link, Routes, Route } from 'react-router'
import Home from '../pages/Home.jsx'
import Dashboard from '../pages/Dashboard.jsx'
import Login from '../pages/Login.jsx'
import Signup from '../pages/Signup.jsx'
import Project from '../pages/Project.jsx'

export default function AppRoutes() {

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project/:id" element={<Project />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
    )
}