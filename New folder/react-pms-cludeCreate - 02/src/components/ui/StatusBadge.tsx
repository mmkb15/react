// Generic colored badge for any "status-like" value (project status, task status,
// member status...). Pass a color map once per domain instead of re-writing the
// badge markup on every page.
function StatusBadge({ label, color }: { label: string; color: string }) {
    return <span className={`badge bg-label-${color}`}>{label}</span>;
}
export default StatusBadge;
