import { useState } from "react"
import { dummyTasks, taskStatuses, formatDueDate, type Task, type TaskStatus } from "../../../interfaces/Task"
import { dummyProjects } from "../../../interfaces/Project"
import { dummyMembers } from "../../../interfaces/Member"
import TaskCreate from "./TaskCreate"
import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import PriorityBadge from "../../../components/ui/PriorityBadge"
import StatusBadge from "../../../components/ui/StatusBadge"

const statusColor: Record<TaskStatus, string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

type ViewMode = "list" | "board";

function Tasks() {

    const [tasks, setTasks] = useState<Task[]>(dummyTasks);
    const [view, setView] = useState<ViewMode>("list");
    const [showModal, setShowModal] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);
    const [justAddedId, setJustAddedId] = useState<number | null>(null);

    // Filters — shared by both List and Board views, since they show the
    // same underlying task data, just arranged differently.
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [projectFilter, setProjectFilter] = useState("All");
    const [assigneeFilter, setAssigneeFilter] = useState("All");

    const showFeedback = (message: string) => {
        setFeedback(message);
        setTimeout(() => setFeedback(null), 3000);
    }

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
            showFeedback("Task deleted.");
        }
    }

    const handleSave = (task: Task) => {
        if (task.id) {
            setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
            showFeedback("Task updated successfully.");
        } else {
            const nextId = Math.max(0, ...tasks.map((t) => t.id ?? 0)) + 1;
            setTasks((prev) => [...prev, { ...task, id: nextId }]);
            showFeedback("Task created successfully.");
            setJustAddedId(nextId);
            setTimeout(() => setJustAddedId(null), 2500);
        }
        setShowModal(false);
    }

    // Used by the Board view's "Move to" menu, and will become the drag-drop
    // handler later — moving a card just updates the task's status.
    const moveTask = (id: number | undefined, status: TaskStatus) => {
        if (!id) return;
        setTasks((prev) => prev.map((t) => (t.id === id ? { ...t, status } : t)));
    }

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            task.projectName.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || task.status === statusFilter;
        const matchesPriority = priorityFilter === "All" || task.priority === priorityFilter;
        const matchesProject = projectFilter === "All" || task.projectName === projectFilter;
        const matchesAssignee =
            assigneeFilter === "All" ||
            (assigneeFilter === "Unassigned" ? !task.assignee : task.assignee?.name === assigneeFilter);
        return matchesSearch && matchesStatus && matchesPriority && matchesProject && matchesAssignee;
    });

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <PageHeader
                    title="Tasks"
                    subtitle="Track every task across your projects."
                    actions={
                        <button type="button" className="btn btn-primary" onClick={handleAddNew}>
                            <i className="icon-base ti tabler-plus me-1"></i>
                            New Task
                        </button>
                    }
                />

                {feedback && (
                    <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                        <i className="icon-base ti tabler-circle-check me-2"></i>
                        {feedback}
                    </div>
                )}

                {/* View switch + filters — shared header for both views */}
                <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                    <div className="btn-group" role="group" aria-label="Task view switch">
                        <button
                            type="button"
                            className={`btn btn-sm ${view === "list" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setView("list")}
                        >
                            <i className="icon-base ti tabler-list me-1"></i>
                            List
                        </button>
                        <button
                            type="button"
                            className={`btn btn-sm ${view === "board" ? "btn-primary" : "btn-outline-primary"}`}
                            onClick={() => setView("board")}
                        >
                            <i className="icon-base ti tabler-layout-kanban me-1"></i>
                            Board
                        </button>
                    </div>

                    <div className="d-flex flex-wrap gap-2">
                        <div className="input-group input-group-merge" style={{ maxWidth: "200px" }}>
                            <span className="input-group-text">
                                <i className="icon-base ti tabler-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Search task or project"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <select className="form-select" style={{ maxWidth: "130px" }} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                            <option value="All">All Status</option>
                            {taskStatuses.map((status) => (
                                <option key={status} value={status}>{status}</option>
                            ))}
                        </select>
                        <select className="form-select" style={{ maxWidth: "130px" }} value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
                            <option value="All">All Priority</option>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                        <select className="form-select" style={{ maxWidth: "160px" }} value={projectFilter} onChange={(e) => setProjectFilter(e.target.value)}>
                            <option value="All">All Projects</option>
                            {dummyProjects.map((project) => (
                                <option key={project.id} value={project.name}>{project.name}</option>
                            ))}
                        </select>
                        <select className="form-select" style={{ maxWidth: "150px" }} value={assigneeFilter} onChange={(e) => setAssigneeFilter(e.target.value)}>
                            <option value="All">All Assignees</option>
                            <option value="Unassigned">Unassigned</option>
                            {dummyMembers.map((member) => (
                                <option key={member.id} value={member.name}>{member.name}</option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* LIST VIEW */}
                {view === "list" && (
                    <div className="card">
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
                                    {filteredTasks.map((task) => {
                                        const due = formatDueDate(task.dueDate, task.status);
                                        return (
                                            <tr
                                                key={task.id}
                                                style={task.id === justAddedId ? { backgroundColor: "rgba(115, 103, 240, 0.08)", transition: "background-color 1.5s ease" } : undefined}
                                            >
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
                                                <td>
                                                    <span className={due.isOverdue ? "text-danger fw-medium" : ""}>{due.text}</span>
                                                </td>
                                                <td>
                                                    <PriorityBadge priority={task.priority} />
                                                </td>
                                                <td>
                                                    <StatusBadge label={task.status} color={statusColor[task.status]} />
                                                </td>
                                                <td>
                                                    <div className="dropdown">
                                                        <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                            <i className="icon-base ti tabler-dots-vertical"></i>
                                                        </button>
                                                        <div className="dropdown-menu">
                                                            <a className="dropdown-item waves-effect" href="javascript:void(0);" onClick={() => handleEdit(task)}>
                                                                <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                            </a>
                                                            <a className="dropdown-item waves-effect" href="javascript:void(0);" onClick={() => handleDelete(task.id)}>
                                                                <i className="icon-base ti tabler-trash me-1"></i> Delete
                                                            </a>
                                                        </div>
                                                    </div>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </table>
                            {filteredTasks.length === 0 && (
                                <EmptyState
                                    icon="tabler-checklist"
                                    title={tasks.length === 0 ? "No tasks yet" : "No tasks match your search/filter"}
                                    message={tasks.length === 0 ? 'Click "New Task" to create one.' : undefined}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* BOARD VIEW — same filteredTasks, grouped by status into columns */}
                {view === "board" && (
                    <div className="row g-4">
                        {taskStatuses.map((status) => {
                            const columnTasks = filteredTasks.filter((t) => t.status === status);
                            return (
                                <div className="col-12 col-md-6 col-xl-3" key={status}>
                                    <div className="card h-100">
                                        <div className="card-header d-flex justify-content-between align-items-center">
                                            <span>
                                                <span className={`badge badge-dot bg-${statusColor[status]} me-2`}></span>
                                                {status}
                                            </span>
                                            <span className="badge bg-label-secondary">{columnTasks.length}</span>
                                        </div>
                                        <div className="card-body d-flex flex-column gap-3">
                                            {columnTasks.map((task) => {
                                                const due = formatDueDate(task.dueDate, task.status);
                                                return (
                                                    <div
                                                        className="card shadow-none border"
                                                        key={task.id}
                                                        style={task.id === justAddedId ? { backgroundColor: "rgba(115, 103, 240, 0.08)", transition: "background-color 1.5s ease" } : undefined}
                                                    >
                                                        <div className="card-body p-3">
                                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                                <PriorityBadge priority={task.priority} />
                                                                <div className="dropdown">
                                                                    <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                                                                        <i className="icon-base ti tabler-dots-vertical"></i>
                                                                    </button>
                                                                    <div className="dropdown-menu">
                                                                        <a className="dropdown-item waves-effect" href="javascript:void(0);" onClick={() => handleEdit(task)}>
                                                                            <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                                        </a>
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
                                                                <small className={due.isOverdue ? "text-danger fw-medium" : "text-body-secondary"}>
                                                                    {due.text}
                                                                </small>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                            {columnTasks.length === 0 && (
                                                <p className="text-body-secondary small mb-0">No tasks here.</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
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
export default Tasks
