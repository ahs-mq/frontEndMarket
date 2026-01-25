import axios from "axios"
import { useContext } from "react"
import { AppContext } from "../providers/AppProvider"
import { useNavigate } from "react-router"
import { useState } from "react"

export default function Login() {
    const navigate = useNavigate();
    const { setUser, setIsAuth } = useContext(AppContext)
    const [err, setErr] = useState(null)
    async function loginUser(e) {

        e.preventDefault(e)
        const formData = new FormData(e.target)
        const info = Object.fromEntries(formData.entries())

        const res = await axios.post('/api/login', info, {
            headers: {
                "Accept": "application.json"
            }
        })
        try {
            console.log("Response:", res.status, res.data);
            const { user, token } = res.data
            console.log(res.data)
            setIsAuth(true)
            localStorage.setItem("token", token)
            setUser(user)
            navigate("/dashboard");

        } catch (err) {
            console.log(err)
            setErr(err.response?.data?.message || "Login failed");
        }
    }
    return (
        <div>
            <h1>Login page</h1>
            <form method="POST" onSubmit={loginUser}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" placeholder="example@example.com" required />
                <label htmlFor="password">Password</label>
                <input type="password" name="password" required />
                <input type="submit" value="submit" />
            </form>
            {err && <p>{err}</p>}
        </div>
    )
}