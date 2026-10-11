import type { ReactNode } from "react"

function PageHeader({
    title,
    subtitle,
    actions,
}: {
    title: string;
    subtitle?: string;
    actions?: ReactNode;
}) {
    return (
        <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
            <div>
                <h4 className="mb-1">{title}</h4>
                {subtitle && <p className="mb-0 text-body-secondary">{subtitle}</p>}
            </div>
            {actions && <div className="d-flex flex-wrap gap-2">{actions}</div>}
        </div>
    );
}
export default PageHeader;
