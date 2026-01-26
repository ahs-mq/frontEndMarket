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
        <div className="min-h-screen">
            <h1 className="mt-4 text-center text-4xl mb-10">Signup</h1>
            <div className="flex mt-20 justify-start pl-10 flex-grow ">
                <form method="POST" onSubmit={sendData} className="flex flex-col gap-5 w-70 h-1 ">
                    <label htmlFor="name">name</label>
                    <input type="text" name="name" placeholder="John Smith" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" name="email" placeholder="example@example.com" required />
                    <label htmlFor="password">Password</label>
                    <input type="password" name="password" required />
                    <label htmlFor="password_confirmation">Confirm Password</label>
                    <input type="password" name="password_confirmation" required />
                    <input type="submit" value="submit" className="bg-white font-bold text-black" />
                </form>
                {err && <p>{err}</p>}
            </div>
        </div>
    )
}