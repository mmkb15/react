import { Link } from "react-router";
import { dummyNotifications, notificationIcon } from "../../interfaces/Notification";
import { CURRENT_USER } from "../../interfaces/CurrentUser";

// Quick-access shortcuts — one per real module in the app, instead of the
// template's demo links (Invoice App, Role Management...) that don't exist here.
const shortcuts = [
  { to: "/project", icon: "tabler-briefcase", label: "Projects", sub: "All projects" },
  { to: "/task", icon: "tabler-checklist", label: "Tasks", sub: "List & board" },
  { to: "/calendar", icon: "tabler-calendar", label: "Calendar", sub: "Deadlines" },
  { to: "/team", icon: "tabler-users", label: "Team", sub: "Members" },
  { to: "/report", icon: "tabler-chart-bar", label: "Reports", sub: "Analytics" },
  { to: "/settings/profile", icon: "tabler-settings", label: "Settings", sub: "Account" },
];

const unreadCount = dummyNotifications.filter((n) => !n.read).length;

function Navbar() {
    return(
        <>
          <nav
            className="layout-navbar container-xxl navbar-detached navbar navbar-expand-xl align-items-center bg-navbar-theme"
            id="layout-navbar">
            <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0   d-xl-none ">
              <Link className="nav-item nav-link px-0 me-xl-6" to="/">
                <i className="icon-base ti tabler-menu-2 icon-md"></i>
              </Link>
            </div>

            <div className="navbar-nav-right d-flex align-items-center justify-content-end" id="navbar-collapse">
              <ul className="navbar-nav flex-row align-items-center ms-md-auto">

                {/* <!-- Shortcuts: quick links to this app's real modules --> */}
                <li className="nav-item dropdown-shortcuts navbar-dropdown dropdown">
                  <Link
                    className="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill"
                    to="/"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}>
                    <i className="icon-base ti tabler-layout-grid-add icon-22px text-heading"></i>
                  </Link>
                  <div className="dropdown-menu dropdown-menu-end p-0">
                    <div className="dropdown-menu-header border-bottom">
                      <div className="dropdown-header d-flex align-items-center py-3">
                        <h6 className="mb-0">Shortcuts</h6>
                      </div>
                    </div>
                    <div className="dropdown-shortcuts-list scrollable-container">
                      <div className="row row-bordered overflow-visible g-0">
                        {shortcuts.map((item) => (
                          <div className="dropdown-shortcuts-item col" key={item.to}>
                            <span className="dropdown-shortcuts-icon rounded-circle mb-3">
                              <i className={`icon-base ti ${item.icon} icon-26px text-heading`}></i>
                            </span>
                            <Link to={item.to} className="stretched-link">{item.label}</Link>
                            <small>{item.sub}</small>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </li>

                {/* <!-- Notifications: real app data, same as the Notifications page --> */}
                <li className="nav-item dropdown-notifications navbar-dropdown dropdown me-3 me-xl-2">
                  <Link
                    className="nav-link dropdown-toggle hide-arrow btn btn-icon btn-text-secondary rounded-pill"
                    to="/"
                    data-bs-toggle="dropdown"
                    data-bs-auto-close="outside"
                    aria-expanded="false"
                    onClick={(e) => e.preventDefault()}>
                    <span className="position-relative">
                      <i className="icon-base ti tabler-bell icon-22px text-heading"></i>
                      {unreadCount > 0 && (
                        <span className="badge rounded-pill bg-danger badge-dot badge-notifications border"></span>
                      )}
                    </span>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end p-0">
                    <li className="dropdown-menu-header border-bottom">
                      <div className="dropdown-header d-flex align-items-center py-3">
                        <h6 className="mb-0 me-auto">Notifications</h6>
                        {unreadCount > 0 && <span className="badge bg-label-primary">{unreadCount} New</span>}
                      </div>
                    </li>
                    <li className="dropdown-notifications-list scrollable-container">
                      <ul className="list-group list-group-flush">
                        {dummyNotifications.slice(0, 5).map((notification) => {
                          const meta = notificationIcon[notification.type];
                          return (
                            <li
                              key={notification.id}
                              className={`list-group-item list-group-item-action dropdown-notifications-item ${notification.read ? "marked-as-read" : ""}`}
                            >
                              <div className="d-flex">
                                <div className="flex-shrink-0 me-3">
                                  <div className="avatar">
                                    {notification.avatar ? (
                                      <img src={`../../assets/img/avatars/${notification.avatar}`} className="rounded-circle" alt="Avatar" />
                                    ) : (
                                      <span className={`avatar-initial rounded-circle bg-label-${meta.color}`}>
                                        <i className={`icon-base ti ${meta.icon}`}></i>
                                      </span>
                                    )}
                                  </div>
                                </div>
                                <div className="flex-grow-1">
                                  <h6 className="small mb-1">{notification.title}</h6>
                                  <small className="mb-1 d-block text-body">{notification.message}</small>
                                  <small className="text-body-secondary">{notification.time}</small>
                                </div>
                              </div>
                            </li>
                          );
                        })}
                        {dummyNotifications.length === 0 && (
                          <li className="list-group-item text-body-secondary text-center py-4">
                            No notifications.
                          </li>
                        )}
                      </ul>
                    </li>
                    <li className="border-top">
                      <div className="d-grid p-4">
                        <Link className="btn btn-primary btn-sm d-flex" to="/notification">
                          <small className="align-middle">View all notifications</small>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>

                {/* <!-- Current user --> */}
                <li className="nav-item navbar-dropdown dropdown-user dropdown">
                  <Link
                    className="nav-link dropdown-toggle hide-arrow p-0"
                    to="/"
                    data-bs-toggle="dropdown"
                    onClick={(e) => e.preventDefault()}>
                    <div className="avatar avatar-online">
                      <img src={`../../assets/img/avatars/${CURRENT_USER.avatar}`} className="rounded-circle" alt="Avatar" />
                    </div>
                  </Link>
                  <ul className="dropdown-menu dropdown-menu-end">
                    <li>
                      <Link className="dropdown-item mt-0" to="/settings/profile">
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <div className="avatar avatar-online">
                              <img src={`../../assets/img/avatars/${CURRENT_USER.avatar}`} className="rounded-circle" alt="Avatar" />
                            </div>
                          </div>
                          <div className="flex-grow-1">
                            <h6 className="mb-0">{CURRENT_USER.name}</h6>
                            <small className="text-body-secondary">{CURRENT_USER.role}</small>
                          </div>
                        </div>
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-divider my-1 mx-n2"></div>
                    </li>
                    <li>
                      <Link className="dropdown-item" to="/settings/profile">
                        <i className="icon-base ti tabler-user me-3 icon-md"></i>
                        <span className="align-middle">My Profile</span>
                      </Link>
                    </li>
                    <li>
                      <div className="dropdown-divider my-1 mx-n2"></div>
                    </li>
                    <li>
                      <div className="d-grid px-2 pt-2 pb-1">
                        <Link className="btn btn-sm btn-danger d-flex" to="/login">
                          <small className="align-middle">Logout</small>
                          <i className="icon-base ti tabler-logout ms-2 icon-14px"></i>
                        </Link>
                      </div>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </nav>
        </>
    )
}
export default Navbar
