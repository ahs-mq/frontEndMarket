import axios from "axios"
import { useEffect, useState } from "react"
export default function Home() {
    const [projects, setProjects] = useState([])
    useEffect(() => {
        axios.get("/api/projects")
            .then(res => setProjects(res.data.projects))
            .catch(err => console.log(err))
    }, [])

    return (
        <div>
            <h1>Home page</h1>
            <h2>All projects</h2>
            <div>
                {projects.map(project => (
                    <div key={project.id} style={{ border: "1px solid black", margin: "10px", padding: "10px" }}>
                        <h3>{project.title}</h3>
                        <h2>By: {project.user.name}</h2>
                        <p>{project.address}</p>
                        <p>{project.description}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}