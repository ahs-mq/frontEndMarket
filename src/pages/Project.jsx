import axios from "axios"
import { useParams } from "react-router"
import { useState, useEffect } from "react"

export default function Project() {
    const { id } = useParams()
    const [project, setProject] = useState(null)

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(res => {
                setProject(res.data.project)
            })
            .catch(err => console.log(err))
    }, [id])
    return (
        <div>
            <h1>Project page</h1>
            {project && <>
                <h2>{project.title}</h2>
                <p>{project.description}</p>
            </>}
        </div>
    )
}