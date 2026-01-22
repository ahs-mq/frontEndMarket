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

    return (
        <div>
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
