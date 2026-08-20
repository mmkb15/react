import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axios from "axios"
import { defaultTask, taskStatuses, type Task } from "../../../interfaces/Task"
import { type Phase } from "../../../interfaces/Phase"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function TaskCreate() {

    const { phaseId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<Task>({ ...defaultTask, phaseId: Number(phaseId) });
    const [phase, setPhase] = useState<Phase | null>(null);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({ title: "" });

    // This task is being created under a specific phase, so load that phase (and its project) info
    function getPhase() {
        axios
            .get(API_BASE_URL + "/phases/" + phaseId)
            .then((res) => {
                setPhase(res.data);
                setForm((prev) => ({
                    ...prev,
                    phaseName: res.data.name,
                    projectId: res.data.projectId,
                    projectName: res.data.projectName,
                }));
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getPhase();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        const newErrors = { title: "" };
        if (form.title === "") newErrors.title = "Task title is required";
        setErrors(newErrors);

        if (newErrors.title !== "") return;

        axios
            .post(API_BASE_URL + "/tasks", form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Task created successfully!");
                navigate(`/phase-details/${phaseId}`);
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Task create failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: phase ? phase.projectName : "...", to: phase ? `/project-details/${phase.projectId}` : "/project" },
                        { label: phase ? phase.name : "...", to: `/phase-details/${phaseId}` },
                        { label: "Add Task" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Add New Task</h4>
                        <p className="mb-0 text-body-secondary">
                            Phase: {phase ? `${phase.name} (${phase.projectName})` : "..."}
                        </p>
                    </div>
                    <Link to={`/phase-details/${phaseId}`} className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Phase
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
                                    <Link to={`/phase-details/${phaseId}`} className="btn btn-label-secondary">
                                        Cancel
                                    </Link>
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
