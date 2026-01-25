import axios from "axios"
import { useParams, useNavigate } from "react-router"
import { useState, useEffect, useContext } from "react"
import { AppContext } from "../providers/AppProvider"

export default function Project() {
    const { id } = useParams()
    const navigate = useNavigate()
    const [project, setProject] = useState(null)
    const { user } = useContext(AppContext)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`/api/projects/${id}`)
            .then(res => {
                setProject(res.data.project)
                console.log(res.data.project)
                setLoading(false)
            })
            .catch(err => console.log(err))
    }, [id])

    function editProject(e) {
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

        axios.patch(`/api/projects/${id}`, formData, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log('Edited:', res.data)
                navigate(0)
                e.target.reset()
            })
            .catch(err => {
                console.error('Error creating project:', err)
            })
    }

    function editStatus(e) {
        e.preventDefault()
        const status = e.target.status.value

        if (status == "complete" || status == "reject" || status == "cancel") {
            axios.post(`/api/projects/${project.id}/${status}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
                .then(res => {
                    console.log(res)
                })
                .catch(err => console.log(err))
        }
        else {
            console.log("Invalid Option")
        }
    }

    function sendOffer(e) {
        e.preventDefault()
        axios.post(`/api/projects/${project.id}/send_offer`, {}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
            .then(res => {
                console.log(res)
                navigate(0)

            })
            .catch(err => console.log(err))
    }

    return (
        <div>
            <div>
                <h1>Project page</h1>
                {!project && <div><p>Project not found</p></div>}
                {project && <>
                    <h2>{project.title}</h2>
                    <p>{project.description}</p>
                    <p>{project.status}</p>
                </>}
            </div>
            <div>
                {user && project && user.id === project.user_id && (<div>
                    <h2>Edit Order</h2>
                    <form method="post" encType="multipart/form-data" onSubmit={editProject}>
                        <label htmlFor="title">title</label>
                        <input type="text" name="title" placeholder="Project Name" />
                        <label htmlFor="address">Address</label>
                        <input type="text" name="address" placeholder="Muscat" />
                        <label htmlFor="description">Description</label>
                        <textarea name="description" placeholder="Describe your project" />
                        <label htmlFor="images">Upload Files</label>
                        <input type="file" multiple accept="image/*" name="images[]" />
                        <label htmlFor="tags">Tags</label>
                        <input type="text" name="tags" placeholder="Tags seperated by comma" />
                        <input type="submit" value="submit" />
                    </form>
                    <h2>Edit Order Status</h2>
                    <p>Edit Order status</p>
                    <form method="POST" onSubmit={editStatus}>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="complete" />
                            Complete
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="reject" />
                            Reject
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="status"
                                value="cancel" />
                            Canceled
                        </label>
                        <input type="submit" value="Confirm" />
                    </form>
                </div>)}
                {!loading && user && user.id !== project.user_id && project.status !== "complete" && project.status !== "cancel" && (
                    <div>
                        <h2>Make Offer</h2>
                        <form method="POST" onSubmit={sendOffer}>
                            <input type="submit" value="Send Offer" />
                        </form>
                    </div>)}
            </div>
        </div>

    )
}