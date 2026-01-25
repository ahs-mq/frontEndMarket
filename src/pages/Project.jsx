import axios from "axios"
import { useParams } from "react-router"
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../providers/AppProvider"

export default function Project() {
    const { id } = useParams()
    const [project, setProject] = useState(null)
    const { user } = useContext(AppContext)

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(res => {
                setProject(res.data.project)
                console.log(res.data.project)
            })
            .catch(err => console.log(err))
    }, [id])
    return (
        <div>
            <div>
                <h1>Project page</h1>
                {project && <>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                </>}
            </div>
            <div>
                {user.id === project.id ? (
                    <div>
                        <h2>Edit Order</h2>
                        <form method="post" encType="multipart/form-data" onSubmit={editProject}>
                            <label htmlFor="title">title</label>
                            <input type="text" name="title" placeholder="Project Name" required />
                            <label htmlFor="address">Address</label>
                            <input type="text" name="address" placeholder="Muscat" required />
                            <label htmlFor="description">Description</label>
                            <textarea name="description" placeholder="Describe your project" required />
                            <label htmlFor="images">Upload Files</label>
                            <input type="file" multiple accept="image/*" name="images[]" />
                            <label htmlFor="tags">Tags</label>
                            <input type="text" name="tags" placeholder="Tags seperated by comma" />
                            <button type="submit" value="submit" />
                        </form>
                    </div>
                ) : (
                    <p>Nothing Yet</p>
                )}
            </div>
        </div>

    )
}