import { useState } from "react"
import { Link } from "react-router"
import {
    dummyProjects,
    getActualCostTotal,
    getBudgetTotal,
    getPhaseColor,
    getProjectHealth,
    type Project,
    type ProjectHealth,
} from "../../../interfaces/Project"
import ProjectCreate from "./ProjectCreate"
import PageHeader from "../../../components/ui/PageHeader"
import EmptyState from "../../../components/ui/EmptyState"
import ProgressBar from "../../../components/ui/ProgressBar"
import ProjectHealthBadge from "../../../components/ui/ProjectHealthBadge"

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
    // Tracks the row that was just created, so we can briefly highlight it —
    // makes "Add" feel like it actually did something instead of the table
    // silently changing underneath you.
    const [justAddedId, setJustAddedId] = useState<number | null>(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [healthFilter, setHealthFilter] = useState<"All" | ProjectHealth>("All");

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
            setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
            showFeedback("Project updated successfully.");
        } else {
            const nextId = Math.max(0, ...projects.map((p) => p.id ?? 0)) + 1;
            setProjects((prev) => [...prev, { ...project, id: nextId }]);
            showFeedback("Project created successfully.");
            setJustAddedId(nextId);
            setTimeout(() => setJustAddedId(null), 2500);
        }
        setShowModal(false);
    }

    // Search by name/client, filter by status and health — cheap enough to
    // recompute on every render for this list size, no useMemo needed.
    const filteredProjects = projects.filter((project) => {
        const matchesSearch =
            project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.client.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All" || project.status === statusFilter;
        const matchesHealth = healthFilter === "All" || getProjectHealth(project) === healthFilter;
        return matchesSearch && matchesStatus && matchesHealth;
    });

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <PageHeader
                    title="Projects"
                    subtitle="Manage all your ongoing and upcoming projects."
                    actions={
                        <button type="button" className="btn btn-primary" onClick={handleAddNew}>
                            <i className="icon-base ti tabler-plus me-1"></i>
                            Add New Project
                        </button>
                    }
                />

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
                            <div className="input-group input-group-merge" style={{ maxWidth: "220px" }}>
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
                                style={{ maxWidth: "150px" }}
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
                            <select
                                className="form-select"
                                style={{ maxWidth: "150px" }}
                                value={healthFilter}
                                onChange={(e) => setHealthFilter(e.target.value as "All" | ProjectHealth)}
                            >
                                <option value="All">All Health</option>
                                <option value="Healthy">Healthy</option>
                                <option value="At Risk">At Risk</option>
                                <option value="Critical">Critical</option>
                            </select>
                        </div>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Phase</th>
                                    <th>Team</th>
                                    <th>Budget</th>
                                    <th>Progress</th>
                                    <th>Health</th>
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
                                    const health = getProjectHealth(project);
                                    return (
                                        <tr
                                            key={project.id}
                                            style={project.id === justAddedId ? { backgroundColor: "rgba(115, 103, 240, 0.08)", transition: "background-color 1.5s ease" } : undefined}
                                        >
                                            {/* Project name with client · category underneath — one glance
                                                tells you what the project is and who it's for, instead of
                                                spreading that across separate columns. */}
                                            <td>
                                                <div className="d-flex align-items-center">
                                                    <i className={`icon-base ti ${project.icon} icon-md text-${project.iconColor} me-3`}></i>
                                                    <div>
                                                        <Link to={`/project/${project.id}`} className="fw-medium text-heading d-block">
                                                            {project.name}
                                                        </Link>
                                                        <small className="text-body-secondary">
                                                            {project.client} · {project.category}
                                                        </small>
                                                    </div>
                                                </div>
                                            </td>
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
                                            <td style={{ minWidth: "120px" }}>
                                                <ProgressBar value={progress} />
                                            </td>
                                            <td>
                                                <ProjectHealthBadge health={health} />
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
                            </tbody>
                        </table>
                        {filteredProjects.length === 0 && (
                            <EmptyState
                                icon="tabler-briefcase-off"
                                title={projects.length === 0 ? "No projects yet" : "No projects match your search/filter"}
                                message={projects.length === 0 ? 'Click "Add New Project" to create one.' : undefined}
                            />
                        )}
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
