import { useEffect, useState } from "react"
import { Link, useParams } from "react-router"
import axios from "axios"
import { defaultProject, type Project } from "../../../interfaces/Project"
import { API_BASE_URL } from "../../../config"

const statusBadge: Record<Project["status"], string> = {
    Active: "primary",
    Completed: "success",
    Scheduled: "info",
    Pending: "warning",
    "On Hold": "secondary",
}

function ProjectDetails() {

    const { id } = useParams();
    const [project, setProject] = useState<Project>(defaultProject);
    const [notFound, setNotFound] = useState(false);

    function getProject() {
        axios
            .get(API_BASE_URL + "/projects/" + id)
            .then((res) => {
                setProject(res.data);
            })
            .catch((err) => {
                console.log(err);
                setNotFound(true);
            });
    }

    useEffect(() => {
        getProject();
    }, []);

    if (notFound) {
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
                    <div className="d-flex gap-2">
                        <Link to={`/project-edit/${id}`} className="btn btn-primary">
                            <i className="icon-base ti tabler-pencil me-1"></i>
                            Edit Project
                        </Link>
                        <Link to="/project" className="btn btn-label-secondary">
                            <i className="icon-base ti tabler-arrow-left me-1"></i>
                            Back to Projects
                        </Link>
                    </div>
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
                                        <p className="text-body-secondary mb-1">Status</p>
                                        <span className={`badge bg-label-${statusBadge[project.status]}`}>
                                            {project.status}
                                        </span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Deadline</p>
                                        <p className="fw-medium mb-0">{project.deadline || "—"}</p>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Total Tasks</p>
                                        <p className="fw-medium mb-0">{project.totalTasks}</p>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Completed</p>
                                        <p className="fw-medium mb-0">{project.completedTasks}</p>
                                    </div>
                                </div>
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
                            </div>
                        </div>
                    </div>

                    {/* Team */}
                    <div className="col-12 col-lg-4">
                        <div className="card">
                            <h5 className="card-header">Team Members</h5>
                            <ul className="list-group list-group-flush">
                                {project.members?.map((member) => (
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
                                {(!project.members || project.members.length === 0) && (
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
