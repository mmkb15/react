import { Link, useParams } from "react-router"
import { dummyProjects, type Project } from "../../../interfaces/Project"

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

function ProjectDetails() {

    const { id } = useParams();
    const project = dummyProjects.find((p) => String(p.id) === id);

    if (!project) {
        return (
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h5 className="mb-2">Project not found</h5>
                        <p className="text-body-secondary mb-4">This project may have been removed.</p>
                        <Link to="/project" className="btn btn-primary">Back to Projects</Link>
                    </div>
                </div>
            </div>
        );
    }

    const progress = project.totalTasks
        ? Math.round((project.completedTasks / project.totalTasks) * 100)
        : 0;

    const budgetUsedPercent = project.budgetCost
        ? Math.min(100, Math.round((project.actualCost / project.budgetCost) * 100))
        : 0;
    const isOverBudget = project.actualCost > project.budgetCost;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <i className={`icon-base ti ${project.icon} icon-lg text-${project.iconColor} me-3`}></i>
                        <div>
                            <h4 className="mb-1">{project.name}</h4>
                            <p className="mb-0 text-body-secondary">Client: {project.client}</p>
                        </div>
                    </div>
                    <Link to="/project" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Projects
                    </Link>
                </div>

                <div className="row g-4">
                    {/* Overview */}
                    <div className="col-12 col-lg-8">
                        <div className="card mb-4">
                            <h5 className="card-header">Overview</h5>
                            <div className="card-body">
                                <p className="mb-4">{project.description || "No description added yet."}</p>
                                <div className="row g-4">
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Category</p>
                                        <p className="fw-medium mb-0">{project.category}</p>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Phase</p>
                                        <span className={`badge bg-label-${phaseBadge[project.phase]}`}>
                                            {project.phase}
                                        </span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Status</p>
                                        <span className={`badge bg-label-${statusBadge[project.status]}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Total Tasks</p>
                                        <p className="fw-medium mb-0">{project.completedTasks} / {project.totalTasks} done</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline: planned vs actual */}
                        <div className="card mb-4">
                            <h5 className="card-header">Timeline</h5>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless m-0">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Expected</th>
                                                <th>Actual</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-body-secondary">Start Date</td>
                                                <td className="fw-medium">{project.expectedStartDate || "—"}</td>
                                                <td>
                                                    {project.actualStartDate || (
                                                        <span className="badge bg-label-secondary">Not started</span>
                                                    )}
                                                </td>
                                            </tr>
                                            <tr>
                                                <td className="text-body-secondary">End Date</td>
                                                <td className="fw-medium">{project.expectedEndDate || "—"}</td>
                                                <td>
                                                    {project.actualEndDate || (
                                                        <span className="badge bg-label-secondary">Not finished</span>
                                                    )}
                                                </td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                {project.actualEndDate && project.expectedEndDate && (
                                    <p className="mb-0 mt-2">
                                        {project.actualEndDate <= project.expectedEndDate ? (
                                            <span className="text-success">
                                                <i className="icon-base ti tabler-circle-check me-1"></i>
                                                Finished on or before the expected date.
                                            </span>
                                        ) : (
                                            <span className="text-danger">
                                                <i className="icon-base ti tabler-alert-circle me-1"></i>
                                                Finished later than expected.
                                            </span>
                                        )}
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Task progress */}
                        <div className="card">
                            <h5 className="card-header">Task Progress</h5>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Overall completion</span>
                                    <span className="fw-medium">{progress}%</span>
                                </div>
                                <div className="progress" style={{ height: "8px" }}>
                                    <div
                                        className="progress-bar"
                                        role="progressbar"
                                        style={{ width: `${progress}%` }}
                                        aria-valuenow={progress}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    ></div>
                                </div>
                                <p className="text-body-secondary mt-3 mb-0">
                                    Detailed task board (Kanban / List) is available from the Tasks menu.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right column: Budget + Team */}
                    <div className="col-12 col-lg-4">
                        {/* Budget */}
                        <div className="card mb-4">
                            <h5 className="card-header">Budget</h5>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-body-secondary">Budget Cost</span>
                                    <span className="fw-medium">{formatMoney(project.budgetCost)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-body-secondary">Actual Cost</span>
                                    <span className={`fw-medium ${isOverBudget ? "text-danger" : ""}`}>
                                        {formatMoney(project.actualCost)}
                                    </span>
                                </div>
                                <div className="progress mb-2" style={{ height: "8px" }}>
                                    <div
                                        className={`progress-bar ${isOverBudget ? "bg-danger" : "bg-success"}`}
                                        role="progressbar"
                                        style={{ width: `${budgetUsedPercent}%` }}
                                        aria-valuenow={budgetUsedPercent}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    ></div>
                                </div>
                                {isOverBudget ? (
                                    <p className="text-danger mb-0">
                                        <i className="icon-base ti tabler-alert-triangle me-1"></i>
                                        Over budget by {formatMoney(project.actualCost - project.budgetCost)}
                                    </p>
                                ) : (
                                    <p className="text-body-secondary mb-0">
                                        {formatMoney(project.budgetCost - project.actualCost)} remaining ({budgetUsedPercent}% used)
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Team */}
                        <div className="card">
                            <h5 className="card-header">Team Members</h5>
                            <ul className="list-group list-group-flush">
                                {project.members.map((member) => (
                                    <li key={member.name} className="list-group-item d-flex align-items-center">
                                        <div className="avatar avatar-sm me-3">
                                            <img
                                                src={`../../assets/img/avatars/${member.avatar}`}
                                                alt="Avatar"
                                                className="rounded-circle"
                                            />
                                        </div>
                                        <span>{member.name}</span>
                                    </li>
                                ))}
                                {project.members.length === 0 && (
                                    <li className="list-group-item text-body-secondary">No members assigned yet.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProjectDetails
