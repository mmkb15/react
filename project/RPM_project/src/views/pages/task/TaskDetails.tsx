import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import axios from "axios"
import { defaultTask, type Task } from "../../../interfaces/Task"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

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

function TaskDetails() {

    const { id } = useParams();
    const [task, setTask] = useState<Task>(defaultTask);
    const [notFound, setNotFound] = useState(false);

    function getTask() {
        axios
            .get(API_BASE_URL + "/tasks/" + id)
            .then((res) => setTask(res.data))
            .catch((err) => {
                console.log(err);
                setNotFound(true);
            });
    }

    useEffect(() => {
        getTask();
    }, []);

    if (notFound) {
        return (
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h5 className="mb-2">Task not found</h5>
                        <p className="text-body-secondary mb-4">This task may have been removed.</p>
                        <Link to="/task" className="btn btn-primary">Back to Tasks</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: task.projectName, to: `/project-details/${task.projectId}` },
                        { label: task.phaseName, to: `/phase-details/${task.phaseId}` },
                        { label: task.title },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">{task.title}</h4>
                        <p className="mb-0 text-body-secondary">
                            Phase: <Link to={`/phase-details/${task.phaseId}`}>{task.phaseName}</Link> • Project: {task.projectName}
                        </p>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to={`/task-edit/${id}`} className="btn btn-primary">
                            <i className="icon-base ti tabler-pencil me-1"></i>
                            Edit Task
                        </Link>
                        <Link to="/task" className="btn btn-label-secondary">
                            <i className="icon-base ti tabler-arrow-left me-1"></i>
                            Back to Tasks
                        </Link>
                    </div>
                </div>

                <div className="row g-4">
                    <div className="col-12 col-lg-8">
                        <div className="card">
                            <h5 className="card-header">Overview</h5>
                            <div className="card-body">
                                <p className="mb-4">{task.description || "No description added yet."}</p>
                                <div className="row g-4">
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Status</p>
                                        <span className={`badge bg-label-${statusBadge[task.status]}`}>
                                            {task.status}
                                        </span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Priority</p>
                                        <span className={`badge bg-label-${priorityBadge[task.priority]}`}>
                                            {task.priority}
                                        </span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Due Date</p>
                                        <p className="fw-medium mb-0">{task.dueDate || "—"}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-12 col-lg-4">
                        <div className="card">
                            <h5 className="card-header">Assignee</h5>
                            <div className="card-body">
                                {task.assignee ? (
                                    <div className="d-flex align-items-center">
                                        <div className="avatar avatar-sm me-3">
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
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default TaskDetails
