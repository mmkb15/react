export type Priority = "Low" | "Medium" | "High";

const priorityColor: Record<Priority, string> = {
    Low: "success",
    Medium: "warning",
    High: "danger",
};

function PriorityBadge({ priority }: { priority: Priority }) {
    return <span className={`badge bg-label-${priorityColor[priority]}`}>{priority}</span>;
}
export default PriorityBadge;
