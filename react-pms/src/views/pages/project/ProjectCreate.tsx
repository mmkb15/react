import { useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { defaultProject, type Project } from "../../../interfaces/Project"
import { API_BASE_URL } from "../../../config"

function ProjectCreate() {

    const navigate = useNavigate();
    const [form, setForm] = useState<Project>(defaultProject);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({ name: "", client: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        // Manually check kore niচ্ছি, built-in validation library use korchi na
        const newErrors = { name: "", client: "" };
        if (form.name === "") newErrors.name = "Project name is required";
        if (form.client === "") newErrors.client = "Client name is required";
        setErrors(newErrors);

        if (newErrors.name !== "" || newErrors.client !== "") return;

        axios
            .post(API_BASE_URL + "/projects", form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Project created successfully!");
                navigate("/project");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Project create failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Add New Project</h4>
                        <p className="mb-0 text-body-secondary">Fill in the details to create a new project.</p>
                    </div>
                    <Link to="/project" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Projects
                    </Link>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <form>
                            <div className="row g-4">
                                <div className="col-12">
                                    <label className="form-label" htmlFor="name">Project Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="e.g. Website Redesign"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.name}</small>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="client">Client</label>
                                    <input
                                        type="text"
                                        id="client"
                                        name="client"
                                        className="form-control"
                                        placeholder="Client name"
                                        value={form.client}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.client}</small>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="deadline">Deadline</label>
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        className="form-control"
                                        value={form.deadline}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-select"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Active">Active</option>
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="On Hold">On Hold</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Short project description"
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setForm(defaultProject)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Create Project
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProjectCreate
