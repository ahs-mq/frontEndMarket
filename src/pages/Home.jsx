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
        <div className="flex flex-wrap flex-col align-center">
            <h1 className="text-4xl text-amber-100 mb-1.5">Home</h1>
            <h2 className="text-4xl text-amber-100 mb-1.5">Latest projects</h2>
            <div className="flex flex-wrap">
                {projects.map(project => (
                    <div key={project.id} className="border-4">
                        <div>
                            <h3>{project.title}</h3>
                            <h2>By: {project.user.name}</h2>
                            <p>{project.address}</p>
                            <p>{project.description}</p>
                        </div>
                        {project.tags && (
                            <div>
                                {project.tags.map((tag, i) => (
                                    <p key={i}>{tag.type}</p>
                                ))}
                            </div>
                        )}
                        {project.images && (
                            <div>
                                {project.images.map(img => (
                                    <img key={img.id} src={`http://project-market.test/${img.url}`} width="45" height="45" />
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}