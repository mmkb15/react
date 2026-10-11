import { dummyProjects } from "../../interfaces/Project"
import { dummyTasks, taskStatuses } from "../../interfaces/Task"

const statusColor: Record<string, string> = {
    "To Do": "secondary",
    "In Progress": "info",
    "Review": "warning",
    "Done": "success",
}

function Reports() {

    const totalProjects = dummyProjects.length;
    const completedProjects = dummyProjects.filter((p) => p.status === "Completed").length;

    const totalTasks = dummyTasks.length;
    const completedTasks = dummyTasks.filter((t) => t.status === "Done").length;
    const overallCompletion = totalTasks ? Math.round((completedTasks / totalTasks) * 100) : 0;

    const tasksByStatus = taskStatuses.map((status) => ({
        status,
        count: dummyTasks.filter((t) => t.status === status).length,
    }));

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="mb-4">
                <h4 className="mb-1">Reports & Analytics</h4>
                <p className="mb-0 text-body-secondary">A quick overview of project progress and team output.</p>
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

            <div className="row g-4">
                {/* Project progress */}
                <div className="col-12 col-lg-7">
                    <div className="card h-100">
                        <h5 className="card-header">Project Progress</h5>
                        <div className="card-body">
                            {dummyProjects.map((project) => {
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
