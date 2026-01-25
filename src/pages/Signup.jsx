import axios from 'axios'
import { useState } from 'react'
import { useNavigate } from 'react-router'
import { useContext } from 'react'
import { AppContext } from '../providers/AppProvider'

export default function Signup() {
    const [err, setErr] = useState(null)
    const { setIsAuth, setUser } = useContext(AppContext)
    let navigate = useNavigate();
    async function sendData(e) {
        e.preventDefault()
        const formData = new FormData(e.target)
        const info = Object.fromEntries(formData.entries())
        console.log(info)

        try {
            const res = await axios.post("/api/register", info, {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            console.log("Response:", res.status, res.data);
            const { user, token } = res.data
            setIsAuth(true)
            localStorage.setItem("token", token)
            setUser(user)
            navigate("/dashboard");
        } catch (error) {
            console.log(error)
            setErr(error.response?.data?.message || "Signup failed");
        }
    }
    return (
        <div>
            <h1>Signup page</h1>
            <form method="POST" onSubmit={sendData}>
                <label htmlFor="name">name</label>
                <input type="text" name="name" placeholder="John Smith" required />
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="example@example.com" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input type="password" name="password_confirmation" required />
                <input type="submit" value="submit" />
            </form>
            {err && <p>{err}</p>}
        </div>
    )
}