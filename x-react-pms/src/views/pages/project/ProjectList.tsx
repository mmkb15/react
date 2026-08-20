import { useState } from "react"
import { Link } from "react-router"
import { dummyProjects, getActualCostTotal, getBudgetTotal, getPhaseColor, type Project } from "../../../interfaces/Project"
import ProjectCreate from "./ProjectCreate"

const statusBadge: Record<Project["status"], string> = {
    Active: "primary",
    Completed: "success",
    Scheduled: "info",
    Pending: "warning",
    "On Hold": "secondary",
}

const formatMoney = (value: number) => `৳${value.toLocaleString("en-US")}`;

function ProjectList() {

    const [projects, setProjects] = useState<Project[]>(dummyProjects);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    const [feedback, setFeedback] = useState<string | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");

    const showFeedback = (message: string) => {
        setFeedback(message);
        setTimeout(() => setFeedback(null), 3000);
    }

    const handleAddNew = () => {
        setEditingProject(null);
        setShowModal(true);
    }

    const handleEdit = (project: Project) => {
        setEditingProject(project);
        setShowModal(true);
    }

    const handleDelete = (id?: number) => {
        if (!id) return;
        const ok = window.confirm("Delete this project? This action cannot be undone.");
        if (ok) {
            setProjects((prev) => prev.filter((p) => p.id !== id));
            showFeedback("Project deleted.");
        }
    }

    const handleSave = (project: Project) => {
        if (project.id) {
            // Edit existing
            setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
            showFeedback("Project updated successfully.");
        } else {
            // Create new (dummy incremental id)
            const nextId = Math.max(0, ...projects.map((p) => p.id ?? 0)) + 1;
            setProjects((prev) => [...prev, { ...project, id: nextId }]);
            showFeedback("Project created successfully.");
        }
        setShowModal(false);
    }

    // Search by name/client, filter by status — recomputed on every render,
    // cheap enough for this list size (no need for useMemo here).
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || project.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Projects</h4>
                        <p className="mb-0 text-body-secondary">Manage all your ongoing and upcoming projects.</p>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleAddNew}>
                        <i className="icon-base ti tabler-plus me-1"></i>
                        Add New Project
                    </button>
                </div>

                {feedback && (
                    <div className="alert alert-success d-flex align-items-center mb-4" role="alert">
                        <i className="icon-base ti tabler-circle-check me-2"></i>
                        {feedback}
                    </div>
                )}

                {/* <!-- Projects List Table --> */}
                <div className="card">
                    <div className="card-header d-flex flex-wrap justify-content-between align-items-center gap-3">
                        <h5 className="mb-0">All Projects</h5>
                        <div className="d-flex flex-wrap gap-2">
                            <div className="input-group input-group-merge" style={{ maxWidth: "240px" }}>
                                <span className="input-group-text">
                                    <i className="icon-base ti tabler-search"></i>
                                </span>
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search project or client"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            <select
                                className="form-select"
                                style={{ maxWidth: "160px" }}
                                value={statusFilter}
                                onChange={(e) => setStatusFilter(e.target.value)}
                            >
                                <option value="All">All Status</option>
                                <option value="Active">Active</option>
                                <option value="Completed">Completed</option>
                                <option value="Scheduled">Scheduled</option>
                                <option value="Pending">Pending</option>
                                <option value="On Hold">On Hold</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Category</th>
                                    <th>Phase</th>
                                    <th>Users</th>
                                    <th>Budget</th>
                                    <th>Progress</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {filteredProjects.map((project) => {
                                    const progress = project.totalTasks
                                        ? Math.round((project.completedTasks / project.totalTasks) * 100)
                                        : 0;
                                    const budget = getBudgetTotal(project);
                                    const actual = getActualCostTotal(project);
                                    return (
                                        <tr key={project.id}>
                                            <td>
                                                <i className={`icon-base ti ${project.icon} icon-md text-${project.iconColor} me-4`}></i>
                                                <Link to={`/project/${project.id}`} className="fw-medium text-heading">
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td>{project.client}</td>
                                            <td>{project.category}</td>
                                            <td>
                                                <span className={`badge bg-label-${getPhaseColor(project.phase)}`}>
                                                    {project.phase}
                                                </span>
                                            </td>
                                            <td>
                                                <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                                                    {project.members.map((member) => (
                                                        <li
                                                            key={member.name}
                                                            data-bs-toggle="tooltip"
                                                            data-popup="tooltip-custom"
                                                            data-bs-placement="top"
                                                            className="avatar avatar-xs pull-up"
                                                            aria-label={member.name}
                                                            data-bs-original-title={member.name}
                                                        >
                                                            <img src={`../../assets/img/avatars/${member.avatar}`} alt="Avatar" className="rounded-circle" />
                                                        </li>
                                                    ))}
                                                </ul>
                                            </td>
                                            <td>
                                                <span className={actual > budget ? "text-danger" : "text-heading"}>
                                                    {formatMoney(actual)}
                                                </span>
                                                <span className="text-body-secondary"> / {formatMoney(budget)}</span>
                                            </td>
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <div className="progress w-px-100 me-2" style={{ height: "6px" }}>
                                                        <div
                                                            className="progress-bar"
                                                            role="progressbar"
                                                            style={{ width: `${progress}%` }}
                                                            aria-valuenow={progress}
                                                            aria-valuemin={0}
                                                            aria-valuemax={100}
                                                        ></div>
                                                    </div>
                                                    <small>{progress}%</small>
                                                </div>
                                            </td>
                                            <td>
                                                <span className={`badge bg-label-${statusBadge[project.status]} me-1`}>
                                                    {project.status}
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
                                                        <Link className="dropdown-item waves-effect" to={`/project/${project.id}`}>
                                                            <i className="icon-base ti tabler-eye me-1"></i> View
                                                        </Link>
                                                        <a
                                                            className="dropdown-item waves-effect"
                                                            href="javascript:void(0);"
                                                            onClick={() => handleEdit(project)}
                                                        >
                                                            <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                        </a>
                                                        <a
                                                            className="dropdown-item waves-effect"
                                                            href="javascript:void(0);"
                                                            onClick={() => handleDelete(project.id)}
                                                        >
                                                            <i className="icon-base ti tabler-trash me-1"></i> Delete
                                                        </a>
                                                    </div>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                                {filteredProjects.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="text-center py-4 text-body-secondary">
                                            {projects.length === 0
                                                ? "No projects yet. Click \"Add New Project\" to create one."
                                                : "No projects match your search/filter."}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {showModal && (
                <ProjectCreate
                    project={editingProject}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    )
}
export default ProjectList
