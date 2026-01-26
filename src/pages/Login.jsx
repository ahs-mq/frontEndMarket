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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold text-white text-center mb-8">Login</h1>

                <form method="POST" onSubmit={loginUser} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                            Email
                        </label>
                        <input
                            type="email"
                            name="email"
                            placeholder="example@example.com"
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-amber-400 focus:ring-amber-400"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                            Password
                        </label>
                        <input
                            type="password"
                            name="password"
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-amber-400 focus:ring-amber-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-white text-black font-bold py-2 px-4 rounded-md hover:bg-amber-500 transition"
                    >
                        Submit
                    </button>
                </form>

                {err && <p className="mt-4 text-red-400 text-sm">{err}</p>}
            </div>
        </div>
    );

}