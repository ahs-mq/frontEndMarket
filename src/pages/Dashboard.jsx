import axios from "axios"
import { useEffect, useState } from "react"

export default function Dashboard() {
    const [filter, setFilter] = useState("all");
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        axios.get(`/api/projects/filter`, {
            headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            params: { status: filter },
        })
            .then(res => {
                setProjects(res.data.projects);
                console.log("Fetched projects:", res.data.projects);
            })
            .catch(err => console.error(err));
    }, [filter]);

    function handleChange(e) {
        setFilter(e.target.value);
        console.log("Selected filter:", e.target.value);
    }

    function sendProject(e) {
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

        axios.post('/api/projects', formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log('Project created:', res.data)
                // Optionally, reset the form or update state
                e.target.reset()
            })
            .catch(err => {
                console.error('Error creating project:', err)
            })
    }
    return (
        <div className="min-h-screen bg-gray-900 text-white p-6">
            <div className="max-w-3xl mx-auto shadow rounded-lg p-6 mb-10">
                <h2 className="text-3xl font-bold text-center mb-6">Create New Project</h2>
                <form
                    method="post"
                    encType="multipart/form-data"
                    onSubmit={sendProject}
                    className="space-y-4"
                >
                    <div>
                        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Project Name"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                            Address
                        </label>
                        <input
                            type="text"
                            name="address"
                            placeholder="Muscat"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            placeholder="Describe your project"
                            required
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <div>
                        <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                            Upload Files
                        </label>
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            name="images[]"
                            className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0 file:text-sm file:font-semibold
                       file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                        />
                    </div>

                    <div>
                        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">
                            Tags
                        </label>
                        <input
                            type="text"
                            name="tags"
                            placeholder="Tags separated by comma"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700"
                    >
                        Submit
                    </button>
                </form>
            </div>
            <div className="max-w-3xl mx-auto shadow rounded-lg p-6 mb-10">
                <h2 className="text-3xl font-bold text-center mb-6">Filter by Order Status</h2>
                <form className="flex justify-center space-x-6">
                    {["all", "pending", "offer_received", "complete", "canceled"].map((status) => (
                        <label key={status} className="flex items-center space-x-2">
                            <input
                                type="radio"
                                name="status"
                                value={status}
                                checked={filter === status}
                                onChange={handleChange}
                                className="text-indigo-600 focus:ring-indigo-500"
                            />
                            <span className="capitalize">{status.replace("_", " ")}</span>
                        </label>
                    ))}
                </form>
            </div>
            <div className="max-w-5xl mx-auto">
                <h2 className="text-3xl font-bold mb-6">My Projects</h2>
                {projects.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.map((p) => (
                            <div
                                key={p.id}
                                className="bg-white shadow rounded-lg p-4 flex flex-col hover:shadow-lg transition-shadow"
                            >
                                <h3 className="text-lg font-semibold mb-2">{p.title}</h3>
                                <p className="text-sm text-gray-600 mb-1">By: {p.user.name}</p>
                                <p className="text-sm text-gray-600 mb-1">Address: {p.address}</p>
                                <p className="text-sm text-gray-700 flex-grow">{p.description}</p>

                                {p.tags?.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-sm font-medium">Tags:</h4>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {p.tags.map((tag, i) => (
                                                <span
                                                    key={i}
                                                    className="px-2 py-1 text-xs bg-indigo-100 text-indigo-700 rounded"
                                                >
                                                    {tag.type}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {p.images?.length > 0 && (
                                    <div className="mt-2">
                                        <h4 className="text-sm font-medium">Images:</h4>
                                        <div className="flex flex-wrap gap-2 mt-1">
                                            {p.images.map((img) => (
                                                <img
                                                    key={img.id}
                                                    src={`http://project-market.test/${img.url}`}
                                                    alt={p.title}
                                                    className="w-16 h-16 object-cover rounded"
                                                />
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No projects found</p>
                )}
            </div>
        </div>
    );
}
