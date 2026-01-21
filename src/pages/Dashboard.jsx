import axios from "axios"
import { useEffect, useState } from "react"
export default function Dashboard() {
    const [filter, setFilter] = useState("all")
    const [projects, setProjects] = useState([])

    useEffect(() => {
        if (filter) {
            axios.get(`api/projects/${filter}`)
                .then(res => {
                    setProjects(res.data.projects)
                })
                .catch(err => console.log(err))
        }
    }, [filter])

    function handleChange(e) {
        setFilter(e.target.value)
    }

    function sendProject(e) {
        e.preventDefault()
        const formData = new FormData(e.target)

        // Handle multiple files
        const files = e.target.file.files
        for (let i = 0; i < files.length; i++) {
            formData.append('files', files[i])
        }

        axios.post('/api/projects', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
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
        <div>
            <div>
                <h2>Create A project</h2>
                <form method="post" encType="multipart/form-data" onSubmit={sendProject}>
                    <label htmlFor="title">title</label>
                    <input type="text" name="title" placeholder="Project Name" required />
                    <label htmlFor="address">Address</label>
                    <input type="text" name="text" placeholder="Muscat" required />
                    <label htmlFor="description">Description</label>
                    <textarea name="description" placeholder="Describe your project" required />
                    <label htmlFor="images">Upload Files</label>
                    <input type="file" multiple accept="image/*" name="file" />
                    <label htmlFor="tags">Tags</label>
                    <input type="text" name="tags" placeholder="Tags seperated by comma" />
                    <input type="submit" value="submit" />
                </form>
            </div>
            <div>
                <h2>Filter by order status</h2>
                <form>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="all"
                            onChange={handleChange}
                        />
                        All
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="pending"
                            onChange={handleChange}
                        />
                        Pending
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="offer_received"
                            onChange={handleChange}
                        />
                        Offer Received
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="complete"
                            onChange={handleChange}
                        />
                        Completed
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="status"
                            value="canceled"
                            onChange={handleChange}
                        />
                        Canceled
                    </label>
                </form>
            </div>
            <div>
                {projects && <>
                    <h2>{projects.title}</h2>
                    <p>{projects.description}</p>
                </>}
            </div>
        </div>
    )
}
