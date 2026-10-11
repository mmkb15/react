function EmptyState({
    icon = "tabler-inbox",
    title,
    message,
}: {
    icon?: string;
    title: string;
    message?: string;
}) {
    return (
        <div className="text-center py-5">
            <i className={`icon-base ti ${icon} icon-lg text-body-secondary mb-2 d-block`}></i>
            <p className="fw-medium mb-1">{title}</p>
            {message && <p className="text-body-secondary mb-0">{message}</p>}
        </div>
    );
}
export default EmptyState;
