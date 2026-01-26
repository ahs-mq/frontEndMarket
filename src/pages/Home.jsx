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
        <div className="flex flex-col grow min-h-screen">
            <h1 className="text-4xl text-amber-100 mb-1.5 text-center">Home</h1>
            <h2 className="text-4xl text-amber-100 mb-1.5 text-center">Latest projects</h2>
            <div className="flex flex-wrap gap-4">
                {projects.map(project => (
                    <div key={project.id} className="flex flex-col border rounded p-3 w-72 h-80">
                        <div className="flex flex-col grow">
                            <h3 className="font-semibold">Title: {project.title}</h3>
                            <h2 className="text-gray-300">By: {project.user.name}</h2>
                            <p>Address: {project.address}</p>
                            <p className="flex">Overview: {project.description}</p>
                        </div>

                        {project.tags.length > 0 && (
                            <div className="flex mt-auto text-xs space-x-1">
                                <h3>Tags:</h3>
                                {project.tags.map((tag, i) => (
                                    <span key={i}>{tag.type} </span>
                                ))}
                            </div>
                        )}

                        {project.images.length > 0 && (
                            <div className="flex mt-2 space-x-2">
                                <h3>Images:</h3>
                                {project.images.map(img => (
                                    <img key={img.id} src={`http://project-market.test/${img.url}`} className="w-12 h-12 object-cover rounded" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}