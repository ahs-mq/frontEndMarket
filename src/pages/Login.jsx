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
        <div className="min-h-screen">
            <h1 className="mt-4 text-center text-4xl mb-10">Login</h1>
            <div className="flex mt-20 justify-start pl-10 flex-grow ">
                <form method="POST" onSubmit={loginUser} className="flex flex-col gap-5 w-70 h-1 ">
                    <label htmlFor="email" className="border-1">Email</label>
                    <input type="email" className="py-1" name="email" placeholder="example@example.com" required />
                    <label htmlFor="password" className="border-1">Password</label>
                    <input type="password" name="password" className="py-1" required />
                    <input type="submit" value="submit" className="bg-white font-bold text-black" />
                </form>
                {err && <p>{err}</p>}
            </div>
        </div>
    )
}