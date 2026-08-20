import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { type Project } from "../../interfaces/Project"
import { type Phase } from "../../interfaces/Phase"
import { type Task } from "../../interfaces/Task"
import { API_BASE_URL } from "../../config"

const statusBadge: Record<Project["status"], string> = {
    Active: "primary",
    Completed: "success",
    Scheduled: "info",
    Pending: "warning",
    "On Hold": "secondary",
}

const taskStatusBadge: Record<Task["status"], string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

function Dashboard() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [phases, setPhases] = useState<Phase[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);

    useEffect(() => {
        axios.get(API_BASE_URL + "/projects").then((res) => setProjects(res.data)).catch((err) => console.log(err));
        axios.get(API_BASE_URL + "/phases").then((res) => setPhases(res.data)).catch((err) => console.log(err));
        axios.get(API_BASE_URL + "/tasks").then((res) => setTasks(res.data)).catch((err) => console.log(err));
    }, []);

    const activeProjects = projects.filter((p) => p.status === "Active").length;
    const totalBudget = phases.reduce((sum, p) => sum + p.budgetCost, 0);
    const totalActualCost = phases.reduce((sum, p) => sum + p.actualCost, 0);
    const pendingTasks = tasks.filter((t) => t.status !== "Done").length;

    const delayedPhases = phases.filter(
        (p) => p.status === "Delayed" || (p.expectedEndDate && p.actualEndDate && p.actualEndDate > p.expectedEndDate)
    );

    // Nearest upcoming task due dates, so the person sees what needs attention first
    const upcomingTasks = [...tasks]
        .filter((t) => t.status !== "Done" && t.dueDate)
        .sort((a, b) => a.dueDate.localeCompare(b.dueDate))
        .slice(0, 5);

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="mb-4">
                <h4 className="mb-1">Dashboard</h4>
                <p className="mb-0 text-body-secondary">A snapshot of every active project, budget, and upcoming deadline.</p>
            </div>

            {/* Summary cards */}
            <div className="row g-4 mb-4">
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className="badge bg-label-primary p-2 mb-2">
                                <i className="icon-base ti tabler-briefcase icon-md"></i>
                            </span>
                            <h4 className="mb-0">{activeProjects}</h4>
                            <p className="mb-0 text-body-secondary">Active Projects</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className="badge bg-label-warning p-2 mb-2">
                                <i className="icon-base ti tabler-checklist icon-md"></i>
                            </span>
                            <h4 className="mb-0">{pendingTasks}</h4>
                            <p className="mb-0 text-body-secondary">Pending Tasks</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className={`badge p-2 mb-2 bg-label-${delayedPhases.length ? "danger" : "success"}`}>
                                <i className="icon-base ti tabler-alert-triangle icon-md"></i>
                            </span>
                            <h4 className="mb-0">{delayedPhases.length}</h4>
                            <p className="mb-0 text-body-secondary">Delayed Phases</p>
                        </div>
                    </div>
                </div>
                <div className="col-6 col-md-3">
                    <div className="card">
                        <div className="card-body">
                            <span className={`badge p-2 mb-2 bg-label-${totalActualCost > totalBudget ? "danger" : "success"}`}>
                                <i className="icon-base ti tabler-wallet icon-md"></i>
                            </span>
                            <h4 className="mb-0">৳ {totalActualCost.toLocaleString()}</h4>
                            <p className="mb-0 text-body-secondary">Spent of ৳ {totalBudget.toLocaleString()} Budget</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row g-4">
                {/* Active projects overview */}
                <div className="col-12 col-lg-7">
                    <div className="card h-100">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Projects Overview</h5>
                            <Link to="/project" className="btn btn-sm btn-label-secondary">View All</Link>
                        </div>
                        <div className="table-responsive text-nowrap">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th>Project</th>
                                        <th>Progress</th>
                                        <th>Status</th>
                                    </tr>
                                </thead>
                                <tbody className="table-border-bottom-0">
                                    {projects.slice(0, 6).map((project) => {
                                        const progress = project.totalTasks
                                            ? Math.round((project.completedTasks / project.totalTasks) * 100)
                                            : 0;
                                        return (
                                            <tr key={project.id}>
                                                <td>
                                                    <Link to={`/project-details/${project.id}`} className="fw-medium text-heading">
                                                        {project.name}
                                                    </Link>
                                                </td>
                                                <td>
                                                    <div className="d-flex align-items-center">
                                                        <div className="progress w-px-100 me-2" style={{ height: "6px" }}>
                                                            <div
                                                                className="progress-bar"
                                                                role="progressbar"
                                                                style={{ width: `${progress}%` }}
                                                            ></div>
                                                        </div>
                                                        <small>{progress}%</small>
                                                    </div>
                                                </td>
                                                <td>
                                                    <span className={`badge bg-label-${statusBadge[project.status]}`}>
                                                        {project.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                    {projects.length === 0 && (
                                        <tr>
                                            <td colSpan={3} className="text-center py-4 text-body-secondary">
                                                No projects yet. <Link to="/project-create">Create one</Link>.
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Upcoming task deadlines */}
                <div className="col-12 col-lg-5">
                    <div className="card h-100">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Upcoming Task Deadlines</h5>
                            <Link to="/task" className="btn btn-sm btn-label-secondary">View All</Link>
                        </div>
                        <ul className="list-group list-group-flush">
                            {upcomingTasks.map((task) => (
                                <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <Link to={`/task-details/${task.id}`} className="fw-medium text-heading d-block">
                                            {task.title}
                                        </Link>
                                        <small className="text-body-secondary">{task.projectName} • {task.dueDate}</small>
                                    </div>
                                    <span className={`badge bg-label-${taskStatusBadge[task.status]}`}>{task.status}</span>
                                </li>
                            ))}
                            {upcomingTasks.length === 0 && (
                                <li className="list-group-item text-body-secondary">No upcoming tasks. 🎉</li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>

            {/* Delayed phases quick-alert, connects straight to Reports for the full picture */}
            {delayedPhases.length > 0 && (
                <div className="card mt-4">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Phases Needing Attention</h5>
                        <Link to="/report" className="btn btn-sm btn-label-secondary">Full Report</Link>
                    </div>
                    <ul className="list-group list-group-flush">
                        {delayedPhases.slice(0, 5).map((phase) => (
                            <li key={phase.id} className="list-group-item d-flex justify-content-between align-items-center">
                                <div>
                                    <Link to={`/phase-details/${phase.id}`} className="fw-medium text-heading d-block">
                                        {phase.name}
                                    </Link>
                                    <small className="text-body-secondary">{phase.projectName}</small>
                                </div>
                                <span className="badge bg-label-danger">Delayed</span>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    )
}
export default Dashboard
