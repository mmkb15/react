import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { type Project } from "../../../interfaces/Project"
import { API_BASE_URL } from "../../../config"

const statusBadge: Record<Project["status"], string> = {
    Active: "primary",
    Completed: "success",
    Scheduled: "info",
    Pending: "warning",
    "On Hold": "secondary",
}

function ProjectManage() {

    const [projects, setProjects] = useState<Project[]>([]);
    const [msg, setMsg] = useState("");

    // Teacher-er UserManage/PostManage-er moto: GET diye shob project load kora
    function getAllProjects() {
        axios
            .get(API_BASE_URL + "/projects")
            .then((res) => {
                setProjects(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllProjects();
    }, []);

    function handleDelete(id?: number) {
        if (!id) return;
        const ok = window.confirm("Delete this project? This action cannot be undone.");
        if (!ok) return;

        axios
            .delete(API_BASE_URL + "/projects/" + id)
            .then((res) => {
                if (res.status === 200) setMsg("🎉 Project deleted successfully!");
                getAllProjects();
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Project delete failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Projects</h4>
                        <p className="mb-0 text-body-secondary">Manage all your ongoing and upcoming projects.</p>
                    </div>
                    <Link to="/project-create" className="btn btn-primary">
                        <i className="icon-base ti tabler-plus me-1"></i>
                        Add New Project
                    </Link>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                {/* <!-- Projects List Table --> */}
                <div className="card">
                    <h5 className="card-header">All Projects</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Project</th>
                                    <th>Client</th>
                                    <th>Members</th>
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
                                                <Link to={`/project-details/${project.id}`} className="fw-medium text-heading">
                                                    {project.name}
                                                </Link>
                                            </td>
                                            <td>{project.client}</td>
                                            <td>
                                                <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                                                    {project.members?.map((member) => (
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
                                                        <Link className="dropdown-item waves-effect" to={`/project-details/${project.id}`}>
                                                            <i className="icon-base ti tabler-eye me-1"></i> View
                                                        </Link>
                                                        <Link className="dropdown-item waves-effect" to={`/project-edit/${project.id}`}>
                                                            <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                        </Link>
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
                                        <td colSpan={6} className="text-center py-4 text-body-secondary">
                                            No projects yet. Click "Add New Project" to create one.
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
export default ProjectManage
