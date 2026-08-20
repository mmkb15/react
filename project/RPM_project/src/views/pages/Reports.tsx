import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { type Project } from "../../interfaces/Project"
import { type Phase } from "../../interfaces/Phase"
import { type Task, taskStatuses } from "../../interfaces/Task"
import { API_BASE_URL } from "../../config"

const statusColor: Record<string, string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

function Reports() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [phases, setPhases] = useState<Phase[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    function getAllData() {
        axios.get(API_BASE_URL + "/projects").then((res) => setProjects(res.data)).catch((err) => console.log(err));
        axios.get(API_BASE_URL + "/phases").then((res) => setPhases(res.data)).catch((err) => console.log(err));
        axios.get(API_BASE_URL + "/tasks").then((res) => setTasks(res.data)).catch((err) => console.log(err));
    }

    useEffect(() => {
        getAllData();
    }, []);

    const totalProjects = projects.length;
    const completedProjects = projects.filter((p) => p.status === "Completed").length;

    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((t) => t.status === "Done").length;
    const overallCompletion = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const tasksByStatus = taskStatuses.map((status) => ({
        status,
        count: tasks.filter((t) => t.status === status).length,
    }));

    // Budget rollup across every phase of every project
    const totalBudget = phases.reduce((sum, p) => sum + p.budgetCost, 0);
    const totalActualCost = phases.reduce((sum, p) => sum + p.actualCost, 0);
    const budgetUsedPercent = totalBudget ? Math.round((totalActualCost / totalBudget) * 100) : 0;

    // Phases that finished later than planned, or are explicitly marked Delayed
    const delayedPhases = phases.filter(
        (p) => p.status === "Delayed" || (p.expectedEndDate && p.actualEndDate && p.actualEndDate > p.expectedEndDate)
    );

    // Phases where actual cost has gone over the planned budget
    const overBudgetPhases = phases.filter((p) => p.actualCost > p.budgetCost && p.budgetCost > 0);

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="mb-4">
                <h4 className="mb-1">Reports & Analytics</h4>
                <p className="mb-0 text-body-secondary">A quick overview of project progress, budget health, and team output.</p>
            </div>

            {/* Summary cards */}
            <div className="row g-4 mb-4">
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className="badge bg-label-primary p-2 mb-2">
                                <i className="icon-base ti tabler-briefcase icon-md"></i>
                            </span>
                            <h4 className="mb-0">{totalProjects}</h4>
                            <p className="mb-0 text-body-secondary">Total Projects</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className="badge bg-label-success p-2 mb-2">
                                <i className="icon-base ti tabler-circle-check icon-md"></i>
                            </span>
                            <h4 className="mb-0">{completedProjects}</h4>
                            <p className="mb-0 text-body-secondary">Completed Projects</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className="badge bg-label-info p-2 mb-2">
                                <i className="icon-base ti tabler-checklist icon-md"></i>
                            </span>
                            <h4 className="mb-0">{totalTasks}</h4>
                            <p className="mb-0 text-body-secondary">Total Tasks</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className="badge bg-label-warning p-2 mb-2">
                                <i className="icon-base ti tabler-progress icon-md"></i>
                            </span>
                            <h4 className="mb-0">{overallCompletion}%</h4>
                            <p className="mb-0 text-body-secondary">Task Completion Rate</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Budget health — the real-world signal a project manager checks first */}
            <div className="row g-4 mb-4">
                <div className="col-12 col-lg-4">
                    <div className="card h-100">
                        <h5 className="card-header">Budget Health (all projects)</h5>
                        <div className="card-body">
                            <div className="row g-3 mb-3">
                                <div className="col-6">
                                    <p className="text-body-secondary mb-1">Total Budget</p>
                                    <p className="fw-medium mb-0">৳ {totalBudget.toLocaleString()}</p>
                                </div>
                                <div className="col-6">
                                    <p className="text-body-secondary mb-1">Total Actual Cost</p>
                                    <p className={`fw-medium mb-0 ${totalActualCost > totalBudget ? "text-danger" : ""}`}>
                                        ৳ {totalActualCost.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                            <div className="progress" style={{ height: "8px" }}>
                                <div
                                    className={`progress-bar ${totalActualCost > totalBudget ? "bg-danger" : "bg-success"}`}
                                    role="progressbar"
                                    style={{ width: `${Math.min(budgetUsedPercent, 100)}%` }}
                                ></div>
                            </div>
                            <small className="text-body-secondary d-block mt-2">{budgetUsedPercent}% of total budget used</small>
                        </div>
                    </div>
                </div>

                {/* Delayed phases */}
                <div className="col-12 col-lg-4">
                    <div className="card h-100">
                        <h5 className="card-header d-flex justify-content-between align-items-center">
                            Delayed Phases
                            <span className="badge bg-label-danger">{delayedPhases.length}</span>
                        </h5>
                        <ul className="list-group list-group-flush">
                            {delayedPhases.map((phase) => (
                                <li key={phase.id} className="list-group-item">
                                    <Link to={`/phase-details/${phase.id}`} className="fw-medium text-heading d-block">
                                        {phase.name}
                                    </Link>
                                    <small className="text-body-secondary">{phase.projectName}</small>
                                </li>
                            ))}
                            {delayedPhases.length === 0 && (
                                <li className="list-group-item text-body-secondary">No delayed phases. 🎉</li>
                            )}
                        </ul>
                    </div>
                </div>

                {/* Over-budget phases */}
                <div className="col-12 col-lg-4">
                    <div className="card h-100">
                        <h5 className="card-header d-flex justify-content-between align-items-center">
                            Over-Budget Phases
                            <span className="badge bg-label-danger">{overBudgetPhases.length}</span>
                        </h5>
                        <ul className="list-group list-group-flush">
                            {overBudgetPhases.map((phase) => (
                                <li key={phase.id} className="list-group-item">
                                    <Link to={`/phase-details/${phase.id}`} className="fw-medium text-heading d-block">
                                        {phase.name}
                                    </Link>
                                    <small className="text-danger">
                                        Over by ৳ {(phase.actualCost - phase.budgetCost).toLocaleString()}
                                    </small>
                                </li>
                            ))}
                            {overBudgetPhases.length === 0 && (
                                <li className="list-group-item text-body-secondary">No phases over budget. 🎉</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Project progress */}
                <div className="col-12 col-lg-7">
                    <div className="card h-100">
                        <h5 className="card-header">Project Progress</h5>
                        <div className="card-body">
                            {projects.map((project) => {
                                const progress = project.totalTasks
                                    ? Math.round((project.completedTasks / project.totalTasks) * 100)
                                    : 0;
                                return (
                                    <div className="mb-4" key={project.id}>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span className="fw-medium">{project.name}</span>
                                            <span className="text-body-secondary">{progress}%</span>
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
                                    </div>
                                );
                            })}
                            {projects.length === 0 && (
                                <p className="text-body-secondary mb-0">No projects yet.</p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Task breakdown */}
                <div className="col-12 col-lg-5">
                    <div className="card h-100">
                        <h5 className="card-header">Task Breakdown by Status</h5>
                        <div className="card-body">
                            {tasksByStatus.map(({ status, count }) => {
                                const percent = totalTasks ? Math.round((count / totalTasks) * 100) : 0;
                                return (
                                    <div className="mb-4" key={status}>
                                        <div className="d-flex justify-content-between mb-1">
                                            <span>
                                                <span className={`badge badge-dot bg-${statusColor[status]} me-2`}></span>
                                                {status}
                                            </span>
                                            <span className="text-body-secondary">{count} tasks</span>
                                        </div>
                                        <div className="progress" style={{ height: "8px" }}>
                                            <div
                                                className={`progress-bar bg-${statusColor[status]}`}
                                                role="progressbar"
                                                style={{ width: `${percent}%` }}
                                                aria-valuenow={percent}
                                                aria-valuemin={0}
                                                aria-valuemax={100}
                                            ></div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Reports
