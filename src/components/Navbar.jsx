import { BrowserRouter, Link, Routes, Route } from 'react-router'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'

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
        <nav>
            <Link to="/">Home</Link>
            {isAuth ?
                <><Link to="/new-project">New Project</Link>
                    <Link to="/dashboard">Dashboard</Link>
                    <a href='/api/logout' onClick={HandleLogOut}>Logout</a>
                </> :
                <>
                    <Link to="/login">Login</Link>
                    <Link to="/signup">Register</Link>
                </>
            }

        </nav>
    )
}