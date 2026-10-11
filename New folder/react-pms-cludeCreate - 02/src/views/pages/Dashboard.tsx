import { Link } from "react-router"
import { dummyTasks, formatDueDate } from "../../interfaces/Task"
import { dummyProjects, getProjectHealth } from "../../interfaces/Project"
import { dummyNotifications, notificationIcon } from "../../interfaces/Notification"
import { CURRENT_USER } from "../../interfaces/CurrentUser"
import PageHeader from "../../components/ui/PageHeader"
import PriorityBadge from "../../components/ui/PriorityBadge"
import ProjectHealthBadge from "../../components/ui/ProjectHealthBadge"
import EmptyState from "../../components/ui/EmptyState"

const today = new Date().toISOString().slice(0, 10);

// "Good morning" / "Good afternoon" / "Good evening" based on the actual
// time of day — small touch, but it's the first thing that makes a
// dashboard feel alive instead of a static template.
const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
}

function Dashboard() {

    const overdueTasks = dummyTasks.filter((t) => t.status !== "Done" && t.dueDate && t.dueDate < today);
    const dueTodayTasks = dummyTasks.filter((t) => t.status !== "Done" && t.dueDate === today);
    const reviewTasks = dummyTasks.filter((t) => t.status === "Review");

    // Anything (project deadline or milestone) landing in the next 14 days.
    const upcomingDeadlines = [
        ...dummyProjects
            .filter((p) => p.status !== "Completed" && p.expectedEndDate && p.expectedEndDate >= today)
            .map((p) => ({ label: p.name, date: p.expectedEndDate, type: "Project", link: `/project/${p.id}` })),
        ...dummyProjects.flatMap((p) =>
            p.milestones
                .filter((m) => !m.completed && m.dueDate && m.dueDate >= today)
                .map((m) => ({ label: m.title, date: m.dueDate, type: "Milestone", link: `/project/${p.id}` }))
        ),
    ]
        .sort((a, b) => a.date.localeCompare(b.date))
        .slice(0, 6);

    const myTasks = dummyTasks
        .filter((t) => t.assignee?.name === CURRENT_USER.name && t.status !== "Done")
        .slice(0, 5);

    const projectHealthList = dummyProjects
        .filter((p) => p.status !== "Completed")
        .map((p) => ({ project: p, health: getProjectHealth(p) }))
        // Critical first, then At Risk, then Healthy — the stuff that needs
        // attention should be at the top, not buried alphabetically.
        .sort((a, b) => {
            const order = { Critical: 0, "At Risk": 1, Healthy: 2 };
            return order[a.health] - order[b.health];
        });

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <PageHeader
                title={`${getGreeting()} 👋`}
                subtitle="Here's what needs your attention today."
            />

            {/* Attention row */}
            <div className="row g-4 mb-4">
                <div className="col-6 col-md-3">
                    <Link to="/task" className="card h-100 text-decoration-none">
                        <div className="card-body">
                            <span className="badge bg-label-danger p-2 mb-2">
                                <i className="icon-base ti tabler-alert-triangle icon-md"></i>
                            </span>
                            <h4 className="mb-0 text-heading">{overdueTasks.length}</h4>
                            <p className="mb-0 text-body-secondary">Overdue Tasks</p>
                        </div>
                    </Link>
                </div>
                <div className="col-6 col-md-3">
                    <Link to="/task" className="card h-100 text-decoration-none">
                        <div className="card-body">
                            <span className="badge bg-label-warning p-2 mb-2">
                                <i className="icon-base ti tabler-calendar-due icon-md"></i>
                            </span>
                            <h4 className="mb-0 text-heading">{dueTodayTasks.length}</h4>
                            <p className="mb-0 text-body-secondary">Due Today</p>
                        </div>
                    </Link>
                </div>
                <div className="col-6 col-md-3">
                    <Link to="/task" className="card h-100 text-decoration-none">
                        <div className="card-body">
                            <span className="badge bg-label-info p-2 mb-2">
                                <i className="icon-base ti tabler-eye-check icon-md"></i>
                            </span>
                            <h4 className="mb-0 text-heading">{reviewTasks.length}</h4>
                            <p className="mb-0 text-body-secondary">Awaiting Review</p>
                        </div>
                    </Link>
                </div>
                <div className="col-6 col-md-3">
                    <Link to="/project" className="card h-100 text-decoration-none">
                        <div className="card-body">
                            <span className="badge bg-label-primary p-2 mb-2">
                                <i className="icon-base ti tabler-flag icon-md"></i>
                            </span>
                            <h4 className="mb-0 text-heading">{upcomingDeadlines.length}</h4>
                            <p className="mb-0 text-body-secondary">Upcoming Deadlines</p>
                        </div>
                    </Link>
                </div>
            </div>

            <div className="row g-4">
                {/* Left column: My Tasks + Project Health */}
                <div className="col-12 col-lg-6">
                    <div className="card mb-4">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">My Tasks</h5>
                            <Link to="/task" className="btn btn-sm btn-label-secondary">View all</Link>
                        </div>
                        <ul className="list-group list-group-flush">
                            {myTasks.map((task) => {
                                const due = formatDueDate(task.dueDate, task.status);
                                return (
                                    <li key={task.id} className="list-group-item d-flex justify-content-between align-items-center">
                                        <div>
                                            <p className="mb-0 fw-medium text-heading">{task.title}</p>
                                            <small className="text-body-secondary">{task.projectName}</small>
                                        </div>
                                        <div className="text-end">
                                            <PriorityBadge priority={task.priority} />
                                            <small className={`d-block mt-1 ${due.isOverdue ? "text-danger" : "text-body-secondary"}`}>
                                                {due.text}
                                            </small>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {myTasks.length === 0 && (
                            <EmptyState icon="tabler-checklist" title="No open tasks assigned to you" message="Enjoy the calm." />
                        )}
                    </div>

                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Project Health</h5>
                            <Link to="/project" className="btn btn-sm btn-label-secondary">View all</Link>
                        </div>
                        <ul className="list-group list-group-flush">
                            {projectHealthList.map(({ project, health }) => (
                                <li key={project.id} className="list-group-item d-flex justify-content-between align-items-center">
                                    <Link to={`/project/${project.id}`} className="text-heading fw-medium text-decoration-none">
                                        {project.name}
                                    </Link>
                                    <ProjectHealthBadge health={health} />
                                </li>
                            ))}
                        </ul>
                        {projectHealthList.length === 0 && (
                            <EmptyState icon="tabler-briefcase" title="No active projects" />
                        )}
                    </div>
                </div>

                {/* Right column: Upcoming Deadlines + Recent Activity */}
                <div className="col-12 col-lg-6">
                    <div className="card mb-4">
                        <div className="card-header">
                            <h5 className="mb-0">Upcoming Deadlines</h5>
                        </div>
                        <ul className="list-group list-group-flush">
                            {upcomingDeadlines.map((item, index) => (
                                <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                    <div>
                                        <span className={`badge bg-label-${item.type === "Project" ? "danger" : "warning"} me-2`}>
                                            {item.type}
                                        </span>
                                        <Link to={item.link} className="text-heading text-decoration-none">{item.label}</Link>
                                    </div>
                                    <small className="text-body-secondary">{item.date}</small>
                                </li>
                            ))}
                        </ul>
                        {upcomingDeadlines.length === 0 && (
                            <EmptyState icon="tabler-calendar-check" title="Nothing due in the next 2 weeks" />
                        )}
                    </div>

                    <div className="card">
                        <div className="card-header d-flex justify-content-between align-items-center">
                            <h5 className="mb-0">Recent Activity</h5>
                            <Link to="/notification" className="btn btn-sm btn-label-secondary">View all</Link>
                        </div>
                        <ul className="list-group list-group-flush">
                            {dummyNotifications.slice(0, 5).map((notification) => {
                                const meta = notificationIcon[notification.type];
                                return (
                                    <li key={notification.id} className="list-group-item d-flex align-items-start">
                                        <span className={`avatar avatar-sm me-3 flex-shrink-0`}>
                                            <span className={`avatar-initial rounded-circle bg-label-${meta.color}`}>
                                                <i className={`icon-base ti ${meta.icon}`}></i>
                                            </span>
                                        </span>
                                        <div>
                                            <p className="mb-0">{notification.message}</p>
                                            <small className="text-body-secondary">{notification.time}</small>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                        {dummyNotifications.length === 0 && (
                            <EmptyState icon="tabler-bell-off" title="No recent activity" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Dashboard
