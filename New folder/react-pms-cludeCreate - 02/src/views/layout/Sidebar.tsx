// import { Link } from "react-router"

import { useState, useEffect } from "react"
import { Link } from "react-router";

function Sidebar() {
    
    // const [postOpen, setPostOpen] = useState(true);
    
    const [isCollapsed, setIsCollapsed] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        // Main Work
        document.body.classList.toggle(
            "layout-menu-collapsed",
            isCollapsed
        );

        document.body.classList.toggle(
            "layout-menu-hover",
            isCollapsed && isHovered
        );

        // Cleanup
        return () => {
            document.body.classList.remove("layout-menu-collapsed");
            document.body.classList.remove("layout-menu-hover");
        };
}, [isCollapsed, isHovered]);
    
    return(
        <>
            <aside 
                id="layout-menu" 
                className="layout-menu menu-vertical menu"
                onMouseEnter={() => {
                    if (isCollapsed) {
                        setIsHovered(true);
                    }
                }}
                onMouseLeave={() => {
                    if (isCollapsed) {
                        setIsHovered(false);
                    }
                }}
            >
                
                    
                <div className="app-brand demo ">
                    <Link to="/" className="app-brand-link">
                    <span className="app-brand-logo demo">
                        <span className="text-primary">
                        <svg width="32" height="22" viewBox="0 0 32 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M0.00172773 0V6.85398C0.00172773 6.85398 -0.133178 9.01207 1.98092 10.8388L13.6912 21.9964L19.7809 21.9181L18.8042 9.88248L16.4951 7.17289L9.23799 0H0.00172773Z"
                            fill="currentColor" />
                            <path
                            opacity="0.06"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.69824 16.4364L12.5199 3.23696L16.5541 7.25596L7.69824 16.4364Z"
                            fill="#161616" />
                            <path
                            opacity="0.06"
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M8.07751 15.9175L13.9419 4.63989L16.5849 7.28475L8.07751 15.9175Z"
                            fill="#161616" />
                            <path
                            fillRule="evenodd"
                            clipRule="evenodd"
                            d="M7.77295 16.3566L23.6563 0H32V6.88383C32 6.88383 31.8262 9.17836 30.6591 10.4057L19.7824 22H13.6938L7.77295 16.3566Z"
                            fill="currentColor" />
                        </svg>
                        </span>
                    </span>
                    <span className="app-brand-text demo menu-text fw-bold ms-3">Project V</span>
                    </Link>

                    <a 
                        href="#" 
                        className="layout-menu-toggle menu-link text-large ms-auto"
                        onClick={(e) => {
                            e.preventDefault();

                            setIsCollapsed(!isCollapsed);
                            setIsHovered(false);
                        }}
                    >    
                    <i className="icon-base ti menu-toggle-icon d-none d-xl-block"></i>
                    <i className="icon-base ti tabler-x d-block d-xl-none"></i>
                    </a>
                </div>

                <div className="menu-inner-shadow"></div>

                <ul className="menu-inner py-1">
                    {/* <!-- Dashboards --> */}
                    <li className="menu-item active">
                        <Link to="/" className="menu-link">
                            <div>Dashboard</div>
                        </Link>
                    </li>
                    {/* <!-- Projects --> */}
                    <li className="menu-item">
                        <Link to="/project" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-briefcase"></i>
                            <div>Projects</div>
                        </Link>
                    </li>
                    {/* <!-- Tasks --> */}
                    <li className="menu-item">
                        <Link to="/task" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-checklist"></i>
                            <div>Tasks</div>
                        </Link>
                    </li>
                    {/* <!-- Calendar --> */}
                    <li className="menu-item">
                        <Link to="/calendar" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-calendar"></i>
                            <div>Calendar</div>
                        </Link>
                    </li>
                    {/* <!-- Team --> */}
                    <li className="menu-item">
                        <Link to="/team" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-users"></i>
                            <div>Team</div>
                        </Link>
                    </li>
                    {/* <!-- Reports --> */}
                    <li className="menu-item">
                        <Link to="/report" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-chart-bar"></i>
                            <div>Reports</div>
                        </Link>
                    </li>
                    {/* <!-- Notifications --> */}
                    <li className="menu-item">
                        <Link to="/notification" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-bell"></i>
                            <div>Notifications</div>
                        </Link>
                    </li>
                    {/* <!-- Settings --> */}
                    <li className="menu-item">
                        <Link to="/settings/profile" className="menu-link">
                            <i className="menu-icon icon-base ti tabler-settings"></i>
                            <div>Settings</div>
                        </Link>
                    </li>
                    
                    {/* <!-- Post -Demo for reUse --> */}
                    {/* <li className={`menu-item ${postOpen ? "active open" : ""}`}>
                    <a 
                        href="#"
                        className="menu-link menu-toggle"
                        onClick={(e) => {
                            e.preventDefault();
                            setPostOpen(!postOpen)
                        }}
                    >
                    <i className="menu-icon icon-base ti tabler-smart-home"></i>
                    <div data-i18n="posts">Posts</div>
                    </a>
                        <ul className="menu-sub">
                            <li className="menu-item active">
                            <Link to="/post" className="menu-link">
                                <div>post Manage</div>
                            </Link>
                            </li>
                            <li className="menu-item">
                            <Link to="/post-details" className="menu-link">
                                <div>post Details</div>
                            </Link>
                            </li>
                        </ul>
                    </li> */}

                </ul>

            </aside>

            <div className="menu-mobile-toggler d-xl-none rounded-1">
                <a href="" className="layout-menu-toggle menu-link text-large text-bg-secondary p-2 rounded-1">
                    <i className="ti tabler-menu icon-base"></i>
                    <i className="ti tabler-chevron-right icon-base"></i>
                </a>
            </div>

        </>
    )
}
export default Sidebar