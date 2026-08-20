import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { type Task } from "../../../interfaces/Task"
import { API_BASE_URL } from "../../../config"

const statusBadge: Record<Task["status"], string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

const priorityBadge: Record<Task["priority"], string> = {
    Low: "success",
    Medium: "warning",
    High: "danger",
}

function TaskManage() {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [msg, setMsg] = useState("");

    function getAllTasks() {
        axios
            .get(API_BASE_URL + "/tasks")
            .then((res) => {
                setTasks(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    function handleDelete(id?: number) {
        if (!id) return;
        const ok = window.confirm("Delete this task? This action cannot be undone.");
        if (!ok) return;

        axios
            .delete(API_BASE_URL + "/tasks/" + id)
            .then((res) => {
                if (res.status === 200) setMsg("🎉 Task deleted successfully!");
                getAllTasks();
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Task delete failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Tasks</h4>
                        <p className="mb-0 text-body-secondary">
                            Track every task across all your projects. Tasks are created from inside a Phase.
                        </p>
                    </div>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                {/* <!-- Tasks List Table --> */}
                <div className="card">
                    <h5 className="card-header">All Tasks</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Project / Phase</th>
                                    <th>Assignee</th>
                                    <th>Due Date</th>
                                    <th>Priority</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td className="fw-medium text-heading">
                                            <Link to={`/task-details/${task.id}`} className="fw-medium text-heading">
                                                {task.title}
                                            </Link>
                                        </td>
                                        <td>
                                            <Link to={`/phase-details/${task.phaseId}`}>{task.phaseName}</Link>
                                            <div className="text-body-secondary small">{task.projectName}</div>
                                        </td>
                                        <td>
                                            {task.assignee ? (
                                                <div className="d-flex align-items-center">
                                                    <div className="avatar avatar-xs me-2">
                                                        <img
                                                            src={`../../assets/img/avatars/${task.assignee.avatar}`}
                                                            alt="Avatar"
                                                            className="rounded-circle"
                                                        />
                                                    </div>
                                                    <span>{task.assignee.name}</span>
                                                </div>
                                            ) : (
                                                <span className="text-body-secondary">Unassigned</span>
                                            )}
                                        </td>
                                        <td>{task.dueDate || "—"}</td>
                                        <td>
                                            <span className={`badge bg-label-${priorityBadge[task.priority]}`}>
                                                {task.priority}
                                            </span>
                                        </td>
                                        <td>
                                            <span className={`badge bg-label-${statusBadge[task.status]}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="icon-base ti tabler-dots-vertical"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item waves-effect" to={`/task-details/${task.id}`}>
                                                        <i className="icon-base ti tabler-eye me-1"></i> View
                                                    </Link>
                                                    <Link className="dropdown-item waves-effect" to={`/task-edit/${task.id}`}>
                                                        <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                    </Link>
                                                    <a
                                                        className="dropdown-item waves-effect"
                                                        href="javascript:void(0);"
                                                        onClick={() => handleDelete(task.id)}
                                                    >
                                                        <i className="icon-base ti tabler-trash me-1"></i> Delete
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {tasks.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="text-center py-4 text-body-secondary">
                                            No tasks yet. Click "Add New Task" to create one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskManage
