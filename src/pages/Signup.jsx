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
        <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6">
            <div className="bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-md">
                <h1 className="text-4xl font-bold text-amber-100 text-center mb-8">Signup</h1>

                <form method="POST" onSubmit={sendData} className="flex flex-col gap-5">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            placeholder="John Smith"
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-amber-400 focus:ring-amber-400"
                        />
                    </div>

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

                    <div>
                        <label htmlFor="password_confirmation" className="block text-sm font-medium text-gray-300">
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            name="password_confirmation"
                            required
                            className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white shadow-sm focus:border-amber-400 focus:ring-amber-400"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-amber-400 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-amber-500 transition"
                    >
                        Submit
                    </button>
                </form>

                {err && <p className="mt-4 text-red-400 text-sm">{err}</p>}
            </div>
        </div>
    );

}