function ProgressBar({
    value,
    color,
    height = 6,
    showLabel = true,
}: {
    value: number; // 0-100
    color?: string; // bootstrap color name, e.g. "primary", "success"
    height?: number;
    showLabel?: boolean;
}) {
    const clamped = Math.max(0, Math.min(100, value));
    return (
        <div className="d-flex align-items-center">
            <div className="progress w-100 me-2" style={{ height: `${height}px` }}>
                <div
                    className={color ? `progress-bar bg-${color}` : "progress-bar"}
                    role="progressbar"
                    style={{ width: `${clamped}%` }}
                    aria-valuenow={clamped}
                    aria-valuemin={0}
                    aria-valuemax={100}
                ></div>
            </div>
            {showLabel && <small className="text-body-secondary flex-shrink-0">{clamped}%</small>}
        </div>
    );
}
export default ProgressBar;
