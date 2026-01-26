import axios from "axios"
import { useEffect, useState } from "react"
import '../app.css'
export default function Home() {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        axios.get("/api/projects")
            .then(res => {
                console.log(res.data.projects)
                setProjects(res.data.projects)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <div className="flex flex-col grow min-h-screen bg-gray-900 p-6">
            <h1 className="text-4xl font-bold text-amber-100 mb-2 text-center">Home</h1>
            <h2 className="text-3xl font-semibold text-amber-100 mb-6 text-center">Latest Projects</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {projects.map(project => (
                    <div
                        key={project.id}
                        className="flex flex-col bg-gray-800 border border-gray-700 rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                    >
                        {/* Content area grows to fill space */}
                        <div className="flex flex-col flex-grow">
                            <h3 className="text-lg font-semibold text-white mb-1">
                                {project.title}
                            </h3>
                            <h2 className="text-sm text-gray-400 mb-2">By: {project.user.name}</h2>
                            <p className="text-sm text-gray-300 mb-1">Address: {project.address}</p>
                            <p className="text-sm text-gray-200 flex-grow">Overview: {project.description}</p>
                        </div>

                        {/* Tags */}
                        {project.tags.length > 0 && (
                            <div className="flex flex-wrap mt-3 gap-2 text-xs">
                                {project.tags.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-1 bg-amber-100 text-gray-900 rounded"
                                    >
                                        {tag.type}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Images */}
                        {project.images.length > 0 && (
                            <div className="flex flex-wrap mt-3 gap-2">
                                {project.images.map(img => (
                                    <img
                                        key={img.id}
                                        src={`http://project-market.test/${img.url}`}
                                        alt={project.title}
                                        className="w-16 h-16 object-cover rounded"
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );

}