import { useState } from "react"
import { dummyTasks, type Task } from "../../../interfaces/Task"
import TaskCreate from "./TaskCreate"

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

function TaskList() {

    const [tasks, setTasks] = useState<Task[]>(dummyTasks);
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const handleAddNew = () => {
        setEditingTask(null);
        setShowModal(true);
    }

    const handleEdit = (task: Task) => {
        setEditingTask(task);
        setShowModal(true);
    }

    const handleDelete = (id?: number) => {
        if (!id) return;
        const ok = window.confirm("Delete this task? This action cannot be undone.");
        if (ok) {
            setTasks((prev) => prev.filter((t) => t.id !== id));
        }
    }

    const handleSave = (task: Task) => {
        if (task.id) {
            setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
        } else {
            const nextId = Math.max(0, ...tasks.map((t) => t.id ?? 0)) + 1;
            setTasks((prev) => [...prev, { ...task, id: nextId }]);
        }
        setShowModal(false);
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Tasks</h4>
                        <p className="mb-0 text-body-secondary">Track every task across all your projects.</p>
                    </div>
                    <div className="d-flex gap-2">
                        <button type="button" className="btn btn-primary" onClick={handleAddNew}>
                            <i className="icon-base ti tabler-plus me-1"></i>
                            Add New Task
                        </button>
                    </div>
                </div>

                {/* <!-- Tasks List Table --> */}
                <div className="card">
                    <h5 className="card-header">All Tasks</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Project</th>
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
                                        <td className="fw-medium text-heading">{task.title}</td>
                                        <td>{task.projectName}</td>
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
                                                    <a
                                                        className="dropdown-item waves-effect"
                                                        href="javascript:void(0);"
                                                        onClick={() => handleEdit(task)}
                                                    >
                                                        <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                    </a>
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

            {showModal && (
                <TaskCreate
                    task={editingTask}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    )
}
export default TaskList