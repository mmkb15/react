import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { defaultTask, taskStatuses, type Task } from "../../../interfaces/Task"
import { type Project } from "../../../interfaces/Project"
import { API_BASE_URL } from "../../../config"

function TaskCreate() {

    const navigate = useNavigate();
    const [form, setForm] = useState<Task>(defaultTask);
    const [projects, setProjects] = useState<Project[]>([]);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({ title: "", projectId: "" });

    // Task-er জন্য project-er dropdown list load kora, API theke
    function getProjects() {
        axios
            .get(API_BASE_URL + "/projects")
            .then((res) => setProjects(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProjects();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "projectId") {
            const project = projects.find((p) => String(p.id) === value);
            setForm((prev) => ({
                ...prev,
                projectId: project?.id ?? 0,
                projectName: project?.name ?? "",
            }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        const newErrors = { title: "", projectId: "" };
        if (form.title === "") newErrors.title = "Task title is required";
        if (!form.projectId) newErrors.projectId = "Please select a project";
        setErrors(newErrors);

        if (newErrors.title !== "" || newErrors.projectId !== "") return;

        axios
            .post(API_BASE_URL + "/tasks", form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Task created successfully!");
                navigate("/task");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Task create failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Add New Task</h4>
                        <p className="mb-0 text-body-secondary">Fill in the details to create a new task.</p>
                    </div>
                    <Link to="/task" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Tasks
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
                                    <label className="form-label" htmlFor="title">Task Title</label>
                                    <input
                                        type="text"
                                        id="title"
                                        name="title"
                                        className="form-control"
                                        placeholder="e.g. Design login page"
                                        value={form.title}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.title}</small>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="projectId">Project</label>
                                    <select
                                        id="projectId"
                                        name="projectId"
                                        className="form-select"
                                        value={form.projectId || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select project</option>
                                        {projects.map((project) => (
                                            <option key={project.id} value={project.id}>
                                                {project.name}
                                            </option>
                                        ))}
                                    </select>
                                    <small className="text-danger">{errors.projectId}</small>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="dueDate">Due Date</label>
                                    <input
                                        type="date"
                                        id="dueDate"
                                        name="dueDate"
                                        className="form-control"
                                        value={form.dueDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-select"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        {taskStatuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="priority">Priority</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        className="form-select"
                                        value={form.priority}
                                        onChange={handleChange}
                                    >
                                        <option value="Low">Low</option>
                                        <option value="Medium">Medium</option>
                                        <option value="High">High</option>
                                    </select>
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        rows={3}
                                        placeholder="Short task description"
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setForm(defaultTask)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Create Task
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
export default TaskCreate
