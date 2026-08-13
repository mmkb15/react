import { useState } from "react"
import { Link } from "react-router"
import { dummyProjects, type Project } from "../../../interfaces/Project"
import ProjectCreate from "./ProjectCreate"

const statusBadge: Record<Project["status"], string> = {
    Active: "primary",
    Completed: "success",
    Scheduled: "info",
    Pending: "warning",
    "On Hold": "secondary",
}

const phaseBadge: Record<Project["phase"], string> = {
    Initiation: "secondary",
    Planning: "info",
    Execution: "primary",
    "Monitoring & Control": "warning",
    Closure: "success",
}

const formatMoney = (value: number) => `${value.toLocaleString("en-US")}`;

function ProjectList() {

    const [projects, setProjects] = useState<Project[]>(dummyProjects);
    const [showModal, setShowModal] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);

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
        }
    }

    const handleSave = (project: Project) => {
        if (project.id) {
            // Edit existing
            setProjects((prev) => prev.map((p) => (p.id === project.id ? project : p)));
        } else {
            // Create new (dummy incremental id)
            const nextId = Math.max(0, ...projects.map((p) => p.id ?? 0)) + 1;
            setProjects((prev) => [...prev, { ...project, id: nextId }]);
        }
        setShowModal(false);
    }

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

                {/* <!-- Projects List Table --> */}
                <div className="card">
                    <h5 className="card-header">All Projects</h5>
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
                                {projects.map((project) => {
                                    const progress = project.totalTasks
                                        ? Math.round((project.completedTasks / project.totalTasks) * 100)
                                        : 0;
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
                                                <span className={`badge bg-label-${phaseBadge[project.phase]}`}>
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
                                                <span className={project.actualCost > project.budgetCost ? "text-danger" : "text-heading"}>
                                                    {formatMoney(project.actualCost)}
                                                </span>
                                                <span className="text-body-secondary"> / {formatMoney(project.budgetCost)}</span>
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
                                {projects.length === 0 && (
                                    <tr>
                                        <td colSpan={9} className="text-center py-4 text-body-secondary">
                                            No projects yet. Click "Add New Project" to create one.
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
