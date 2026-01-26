import axios from "axios"
import { useParams, useNavigate } from "react-router"
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../providers/AppProvider"

export default function Project() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(res => {
                setProject(res.data.project)
                console.log(res.data.project)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    function editProject(e) {
        e.preventDefault()
        const formData = new FormData()

        // Append other fields
        formData.append('title', e.target.title.value)
        formData.append('address', e.target.address.value)
        formData.append('description', e.target.description.value)
        formData.append('tags', e.target.tags.value)

        // Handle multiple files
        const files = e.target['images[]'].files
        for (let i = 0; i < files.length; i++) {
            formData.append('images[]', files[i])
        }

        axios.patch(`/api/projects/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log('Edited:', res.data)
                navigate(0)
                e.target.reset()
            })
            .catch(err => {
                console.error('Error creating project:', err)
            })
    }

    function editStatus(e) {
        e.preventDefault()
        const status = e.target.status.value

        if (status == "complete" || status == "reject" || status == "cancel") {
            axios.post(`/api/projects/${project.id}/${status}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
        else {
            console.log("Invalid Option")
        }
    }

    function sendOffer(e) {
        e.preventDefault()
        axios.post(`/api/projects/${project.id}/send_offer`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res)
                navigate(0)

            })
            .catch(err => console.log(err))
    }

    return (
        <div className="min-h-screen bg-gray-900 p-6">
            <div className="max-w-4xl mx-auto space-y-8">
                {/* Project details */}
                <div className="bg-gray-800 rounded-lg shadow p-6">
                    <h1 className="text-3xl font-bold text-amber-100 mb-4">Project Page</h1>

                    {!project && (
                        <div className="text-center text-gray-400">
                            <p>Project not found</p>
                        </div>
                    )}

                    {project && (
                        <>
                            <h2 className="text-xl font-semibold text-white mb-2">{project.title}</h2>
                            <p className="text-gray-300 mb-1">{project.description}</p>
                            <p className="text-sm text-gray-400">Status: {project.status}</p>
                        </>
                    )}
                </div>

                {/* Owner edit section */}
                {user && project && user.id === project.user_id && (
                    <div className="bg-gray-800 rounded-lg shadow p-6 space-y-6">
                        <h2 className="text-2xl font-bold text-amber-100">Edit Order</h2>

                        <form
                            method="post"
                            encType="multipart/form-data"
                            onSubmit={editProject}
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="title" className="block text-sm text-gray-300">Title</label>
                                <input
                                    type="text"
                                    name="title"
                                    placeholder="Project Name"
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="address" className="block text-sm text-gray-300">Address</label>
                                <input
                                    type="text"
                                    name="address"
                                    placeholder="Muscat"
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="description" className="block text-sm text-gray-300">Description</label>
                                <textarea
                                    name="description"
                                    placeholder="Describe your project"
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                                />
                            </div>

                            <div>
                                <label htmlFor="images" className="block text-sm text-gray-300">Upload Files</label>
                                <input
                                    type="file"
                                    multiple
                                    accept="image/*"
                                    name="images[]"
                                    className="mt-1 block w-full text-sm text-gray-400 file:mr-4 file:py-2 file:px-4
                           file:rounded-md file:border-0 file:text-sm file:font-semibold
                           file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100"
                                />
                            </div>

                            <div>
                                <label htmlFor="tags" className="block text-sm text-gray-300">Tags</label>
                                <input
                                    type="text"
                                    name="tags"
                                    placeholder="Tags separated by comma"
                                    className="mt-1 block w-full rounded-md border-gray-600 bg-gray-700 text-white focus:border-amber-400 focus:ring-amber-400"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-amber-400 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-amber-500 transition"
                            >
                                Submit
                            </button>
                        </form>

                        <div>
                            <h2 className="text-xl font-semibold text-amber-100 mb-2">Edit Order Status</h2>
                            <form method="POST" onSubmit={editStatus} className="space-y-2">
                                <div className="flex items-center space-x-2">
                                    <input type="radio" name="status" value="complete" className="text-amber-400 focus:ring-amber-500" />
                                    <label className="text-gray-300">Complete</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="radio" name="status" value="reject" className="text-amber-400 focus:ring-amber-500" />
                                    <label className="text-gray-300">Reject</label>
                                </div>
                                <div className="flex items-center space-x-2">
                                    <input type="radio" name="status" value="cancel" className="text-amber-400 focus:ring-amber-500" />
                                    <label className="text-gray-300">Canceled</label>
                                </div>
                                <button
                                    type="submit"
                                    className="mt-3 w-full bg-amber-400 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-amber-500 transition"
                                >
                                    Confirm
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Offer section for other users */}
                {!loading && user && project && user.id !== project.user_id && project.status !== "complete" && project.status !== "cancel" && (
                    <div className="bg-gray-800 rounded-lg shadow p-6">
                        <h2 className="text-2xl font-bold text-amber-100 mb-4">Make Offer</h2>
                        <form method="POST" onSubmit={sendOffer}>
                            <button
                                type="submit"
                                className="w-full bg-amber-400 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-amber-500 transition"
                            >
                                Send Offer
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );

}