import { BrowserRouter, Link, Routes, Route } from 'react-router'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'
import '../App.css'

export default function Navbar() {
    const navigate = useNavigate()
    const { isAuth, setIsAuth, setUser } = useContext(AppContext)

    async function HandleLogOut(e) {
        e.preventDefault()

        try {
            await axios.post('/api/logout', {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            localStorage.removeItem("token")
            setIsAuth(false)
            setUser(null)
            navigate('/login')

        } catch (err) {
            console.log(err)
        }

    }
    return (
        <nav className="bg-gray-800 w-full p-4">
            <div className="flex justify-between items-center text-center max-w-6xl mx-auto">
                {/* Left side */}
                <Link to="/" className="text-white">Home</Link>

                {/* Right side */}
                {isAuth ? (
                    <div className="flex space-x-4">
                        <Link to="/dashboard" className="text-gray-300 hover:text-white">Dashboard</Link>
                        <a
                            href="/api/logout"
                            onClick={HandleLogOut}
                            className="text-gray-300 hover:text-white"
                        >
                            Logout
                        </a>
                    </div>
                ) : (
                    <div className="flex space-x-4">
                        <Link to="/login" className="text-gray-300 hover:text-white">Login</Link>
                        <Link to="/signup" className="text-gray-300 hover:text-white">Register</Link>
                    </div>
                )}
            </div>
        </nav>
    )
}