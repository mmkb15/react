import { Link } from "react-router"

export interface BreadcrumbItem {
    label: string;
    to?: string;
}

function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
    return (
        <nav aria-label="breadcrumb" className="mb-2">
            <ol className="breadcrumb breadcrumb-style1 mb-0">
                {items.map((item, index) => {
                    const isLast = index === items.length - 1;
                    return (
                        <li
                            key={index}
                            className={`breadcrumb-item ${isLast ? "active" : ""}`}
                            aria-current={isLast ? "page" : undefined}
                        >
                            {item.to && !isLast ? (
                                <Link to={item.to}>{item.label}</Link>
                            ) : (
                                <span>{item.label}</span>
                            )}
                        </li>
                    );
                })}
            </ol>
        </nav>
    )
}
export default Breadcrumb
