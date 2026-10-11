import type { ProjectHealth } from "../../interfaces/Project"

const healthColor: Record<ProjectHealth, string> = {
    Healthy: "success",
    "At Risk": "warning",
    Critical: "danger",
};

function ProjectHealthBadge({ health }: { health: ProjectHealth }) {
    return (
        <span className={`badge bg-label-${healthColor[health]} d-inline-flex align-items-center gap-1`}>
            <span
                className={`badge badge-dot bg-${healthColor[health]}`}
                style={{ width: "6px", height: "6px" }}
            ></span>
            {health}
        </span>
    );
}
export default ProjectHealthBadge;
