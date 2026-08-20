import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axios from "axios"
import { defaultTask, taskStatuses, type Task } from "../../../interfaces/Task"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function TaskEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<Task>(defaultTask);
    const [msg, setMsg] = useState("");

    function getTask() {
        axios
            .get(API_BASE_URL + "/tasks/" + id)
            .then((res) => setForm(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getTask();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        axios
            .put(API_BASE_URL + "/tasks/" + id, form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Task updated successfully!");
                navigate(`/phase-details/${form.phaseId}`);
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Task update failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: form.projectName, to: `/project-details/${form.projectId}` },
                        { label: form.phaseName, to: `/phase-details/${form.phaseId}` },
                        { label: "Edit Task" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Edit Task</h4>
                        <p className="mb-0 text-body-secondary">
                            Phase: {form.phaseName} ({form.projectName})
                        </p>
                    </div>
                    <Link to={`/phase-details/${form.phaseId}`} className="btn btn-label-secondary">
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
                                        value={form.title}
                                        onChange={handleChange}
                                    />
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
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <Link to={`/phase-details/${form.phaseId}`} className="btn btn-label-secondary">
                                        Cancel
                                    </Link>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Update Task
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
export default TaskEdit
