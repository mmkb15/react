import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import axios from "axios"
import { defaultPhase, type Phase } from "../../../interfaces/Phase"
import { type Task } from "../../../interfaces/Task"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

const statusBadge: Record<Phase["status"], string> = {
    "Not Started": "secondary",
    "In Progress": "info",
    "Completed": "success",
    "Delayed": "danger",
}

const taskStatusBadge: Record<Task["status"], string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

function PhaseDetails() {

    const { id } = useParams();
    const [phase, setPhase] = useState<Phase>(defaultPhase);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [notFound, setNotFound] = useState(false);

    function getPhase() {
        axios
            .get(API_BASE_URL + "/phases/" + id)
            .then((res) => setPhase(res.data))
            .catch((err) => {
                console.log(err);
                setNotFound(true);
            });
    }

    // Load the tasks that belong to this phase
    function getPhaseTasks() {
        axios
            .get(API_BASE_URL + "/tasks?phaseId=" + id)
            .then((res) => setTasks(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getPhase();
        getPhaseTasks();
    }, []);

    if (notFound) {
        return (
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h5 className="mb-2">Phase not found</h5>
                        <p className="text-body-secondary mb-4">This phase may have been removed.</p>
                        <Link to="/project" className="btn btn-primary">Back to Projects</Link>
                    </div>
                </div>
            </div>
        );
    }

    const costPercent = phase.budgetCost ? Math.round((phase.actualCost / phase.budgetCost) * 100) : 0;
    const overBudget = phase.actualCost > phase.budgetCost && phase.budgetCost > 0;

    const isTimeDelayed =
        phase.expectedEndDate && phase.actualEndDate && phase.actualEndDate > phase.expectedEndDate;

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: phase.projectName, to: `/project-details/${phase.projectId}` },
                        { label: phase.name },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">{phase.name}</h4>
                        <p className="mb-0 text-body-secondary">
                            Project: <Link to={`/project-details/${phase.projectId}`}>{phase.projectName}</Link>
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to={`/phase-edit/${id}`} className="btn btn-primary">
                            <i className="icon-base ti tabler-pencil me-1"></i>
                            Edit Phase
                        </Link>
                        <Link to={`/project-details/${phase.projectId}`} className="btn btn-label-secondary">
                            <i className="icon-base ti tabler-arrow-left me-1"></i>
                            Back to Project
                        </Link>
                    </div>
                </div>

                <div className="row g-4 mb-4">
                    {/* Timeline card */}
                    <div className="col-12 col-lg-6">
                        <div className="card h-100">
                            <h5 className="card-header d-flex justify-content-between align-items-center">
                                Timeline
                                <span className={`badge bg-label-${statusBadge[phase.status]}`}>{phase.status}</span>
                            </h5>
                            <div className="card-body">
                                <div className="row g-3">
                                    <div className="col-6">
                                        <p className="text-body-secondary mb-1">Expected Start</p>
                                        <p className="fw-medium mb-0">{phase.expectedStartDate || "—"}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-body-secondary mb-1">Expected End</p>
                                        <p className="fw-medium mb-0">{phase.expectedEndDate || "—"}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-body-secondary mb-1">Actual Start</p>
                                        <p className="fw-medium mb-0">{phase.actualStartDate || "—"}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-body-secondary mb-1">Actual End</p>
                                        <p className="fw-medium mb-0">{phase.actualEndDate || "—"}</p>
                                    </div>
                                </div>
                                {isTimeDelayed && (
                                    <div className="alert alert-danger mt-3 mb-0 py-2">
                                        <i className="icon-base ti tabler-alert-triangle me-1"></i>
                                        Phase finished later than expected.
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Budget card */}
                    <div className="col-12 col-lg-6">
                        <div className="card h-100">
                            <h5 className="card-header">Budget</h5>
                            <div className="card-body">
                                <div className="row g-3 mb-3">
                                    <div className="col-6">
                                        <p className="text-body-secondary mb-1">Budget Cost</p>
                                        <p className="fw-medium mb-0">৳ {phase.budgetCost.toLocaleString()}</p>
                                    </div>
                                    <div className="col-6">
                                        <p className="text-body-secondary mb-1">Actual Cost</p>
                                        <p className="fw-medium mb-0">৳ {phase.actualCost.toLocaleString()}</p>
                                    </div>
                                </div>
                                <div className="progress" style={{ height: "8px" }}>
                                    <div
                                        className={`progress-bar ${overBudget ? "bg-danger" : "bg-success"}`}
                                        role="progressbar"
                                        style={{ width: `${Math.min(costPercent, 100)}%` }}
                                    ></div>
                                </div>
                                {overBudget ? (
                                    <div className="alert alert-danger mt-3 mb-0 py-2">
                                        <i className="icon-base ti tabler-alert-triangle me-1"></i>
                                        Over budget by ৳ {(phase.actualCost - phase.budgetCost).toLocaleString()}
                                    </div>
                                ) : (
                                    <small className="text-body-secondary d-block mt-2">{costPercent}% of budget used</small>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {phase.description && (
                    <div className="card mb-4">
                        <h5 className="card-header">Description</h5>
                        <div className="card-body">
                            <p className="mb-0">{phase.description}</p>
                        </div>
                    </div>
                )}

                {/* Tasks under this phase */}
                <div className="card">
                    <div className="card-header d-flex justify-content-between align-items-center">
                        <h5 className="mb-0">Tasks in this Phase</h5>
                        <Link to={`/task-create/${id}`} className="btn btn-sm btn-primary">
                            <i className="icon-base ti tabler-plus me-1"></i>
                            Add Task
                        </Link>
                    </div>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Task</th>
                                    <th>Assignee</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {tasks.map((task) => (
                                    <tr key={task.id}>
                                        <td>
                                            <Link to={`/task-details/${task.id}`} className="fw-medium text-heading">
                                                {task.title}
                                            </Link>
                                        </td>
                                        <td>{task.assignee ? task.assignee.name : "Unassigned"}</td>
                                        <td>{task.dueDate || "—"}</td>
                                        <td>
                                            <span className={`badge bg-label-${taskStatusBadge[task.status]}`}>
                                                {task.status}
                                            </span>
                                        </td>
                                        <td>
                                            <Link to={`/task-edit/${task.id}`} className="btn btn-sm p-0">
                                                <i className="icon-base ti tabler-pencil"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                                {tasks.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="text-center py-4 text-body-secondary">
                                            No tasks in this phase yet.
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
export default PhaseDetails
