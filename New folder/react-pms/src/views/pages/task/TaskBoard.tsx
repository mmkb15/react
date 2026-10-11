import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { taskStatuses, type Task, type TaskStatus } from "../../../interfaces/Task"
import { API_BASE_URL } from "../../../config"

const priorityBadge: Record<Task["priority"], string> = {
    Low: "success",
    Medium: "warning",
    High: "danger",
}

const columnColor: Record<TaskStatus, string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

function TaskBoard() {

    const [tasks, setTasks] = useState<Task[]>([]);

    function getAllTasks() {
        axios
            .get(API_BASE_URL + "/tasks")
            .then((res) => setTasks(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getAllTasks();
    }, []);

    // Task-take ekta column theke onno column-e move kora (status update, API-te PUT)
    const moveTask = (id: number | undefined, status: TaskStatus) => {
        if (!id) return;
        const task = tasks.find((t) => t.id === id);
        if (!task) return;

        const updated = { ...task, status };
        setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));

        axios
            .put(API_BASE_URL + "/tasks/" + id, updated, {
                headers: { "Content-Type": "application/json" },
            })
            .catch((err) => console.log(err));
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Task Board</h4>
                        <p className="mb-0 text-body-secondary">Drag-free Kanban — use the move menu on each card.</p>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to="/task-create" className="btn btn-primary">
                            <i className="icon-base ti tabler-plus me-1"></i>
                            Add New Task
                        </Link>
                    </div>
                </div>

                <div className="row g-4">
                    {taskStatuses.map((status) => {
                        const columnTasks = tasks.filter((t) => t.status === status);
                        return (
                            <div className="col-12 col-md-6 col-xl-3" key={status}>
                                <div className="card h-100">
                                    <div className="card-header d-flex justify-content-between align-items-center">
                                        <span>
                                            <span className={`badge badge-dot bg-${columnColor[status]} me-2`}></span>
                                            {status}
                                        </span>
                                        <span className="badge bg-label-secondary">{columnTasks.length}</span>
                                    </div>
                                    <div className="card-body d-flex flex-column gap-3">
                                        {columnTasks.map((task) => (
                                            <div className="card shadow-none border" key={task.id}>
                                                <div className="card-body p-3">
                                                    <div className="d-flex justify-content-between align-items-start mb-2">
                                                        <span className={`badge bg-label-${priorityBadge[task.priority]}`}>
                                                            {task.priority}
                                                        </span>
                                                        <div className="dropdown">
                                                            <button
                                                                type="button"
                                                                className="btn p-0 dropdown-toggle hide-arrow"
                                                                data-bs-toggle="dropdown"
                                                            >
                                                                <i className="icon-base ti tabler-dots-vertical"></i>
                                                            </button>
                                                            <div className="dropdown-menu">
                                                                <Link className="dropdown-item waves-effect" to={`/task-edit/${task.id}`}>
                                                                    <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                                </Link>
                                                                <h6 className="dropdown-header px-3 pt-2 pb-1 mb-0 text-body-secondary">
                                                                    Move to
                                                                </h6>
                                                                {taskStatuses
                                                                    .filter((s) => s !== task.status)
                                                                    .map((s) => (
                                                                        <a
                                                                            key={s}
                                                                            className="dropdown-item waves-effect"
                                                                            href="javascript:void(0);"
                                                                            onClick={() => moveTask(task.id, s)}
                                                                        >
                                                                            <i className="icon-base ti tabler-arrow-right me-1"></i> {s}
                                                                        </a>
                                                                    ))}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <p className="fw-medium mb-1">{task.title}</p>
                                                    <p className="text-body-secondary small mb-2">{task.projectName}</p>
                                                    <div className="d-flex justify-content-between align-items-center">
                                                        {task.assignee ? (
                                                            <div className="avatar avatar-xs" title={task.assignee.name}>
                                                                <img
                                                                    src={`../../assets/img/avatars/${task.assignee.avatar}`}
                                                                    alt="Avatar"
                                                                    className="rounded-circle"
                                                                />
                                                            </div>
                                                        ) : (
                                                            <span className="text-body-secondary small">Unassigned</span>
                                                        )}
                                                        <small className="text-body-secondary">{task.dueDate}</small>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {columnTasks.length === 0 && (
                                            <p className="text-body-secondary small mb-0">No tasks here.</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    )
}
export default TaskBoard
