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
        <div>
            <div>
                <h2>Create New Project</h2>
                <form method="post" encType="multipart/form-data" onSubmit={sendProject}>
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
                    <input type="submit" value="submit" />
                </form>
            </div>
            <h2>Filter by order status</h2>
            <form>
                {["all", "pending", "offer_received", "complete", "canceled"].map(status => (
                    <label key={status}>
                        <input
                            type="radio"
                            name="status"
                            value={status}
                            checked={filter === status}
                            onChange={handleChange}
                        />
                        {status}
                    </label>
                ))}
            </form>

            <h2>Projects</h2>
            {projects.length > 0 ? (
                <ul>
                    {projects.map(p => (
                        <li key={p.id}>
                            <h3>{p.title}</h3>
                            <p>{p.description}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No projects found</p>
            )}
        </div>
    );
}
