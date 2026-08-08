import {Link} from "react-router";
function Navbar() {
  return (
    <>
      <nav className="navbar admin-navbar navbar-expand bg-white">
        <div className="container-fluid px-3 px-lg-4">
          <label htmlFor="sidebarToggle" className="btn d-lg-none">
            <i className="bi bi-list fs-2"></i>
          </label>

          <form className="d-none d-md-flex ms-3 flex-grow-1" role="search">
            <input
              className="form-control search-input"
              type="search"
              placeholder="Search users, orders, reports"
              aria-label="Search"
            />
          </form>

          <div className="navbar-actions ms-auto">
            <button
              className="icon-button theme-toggle"
              type="button"
              data-theme-toggle
              aria-label="Switch color theme"
              title="Switch color theme"
            >
              <i
                className="bi bi-moon-stars"
                data-theme-icon
                aria-hidden="true"
              ></i>
            </button>
            <div className="dropdown">
              <button
                className="icon-button"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                aria-label="Notifications"
              >
                <span className="notification-dot"></span>
                <i className="bi bi-bell" aria-hidden="true"></i>
              </button>
              <div className="dropdown-menu dropdown-menu-end notification-menu">
                <div className="dropdown-header fw-bold text-body">
                  Notifications
                </div>
                <a className="dropdown-item" href="users.html">
                  <span className="notification-title">
                    New user registered
                  </span>
                  <span className="notification-time">4 minutes ago</span>
                </a>
                <a className="dropdown-item" href="charts.html">
                  <span className="notification-title">
                    Revenue target reached
                  </span>
                  <span className="notification-time">32 minutes ago</span>
                </a>
                <a className="dropdown-item" href="settings.html">
                  <span className="notification-title">
                    Security review completed
                  </span>
                  <span className="notification-time">1 hour ago</span>
                </a>
              </div>
            </div>

            <div className="dropdown">
              <button
                className="profile-button dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  className="avatar-img avatar-sm"
                  src="https://i.pravatar.cc/50?img=47"
                  alt="Asia R."
                />
                <span className="profile-name d-none d-sm-inline">
                  Asia R.
                </span>
              </button>
              <ul className="dropdown-menu dropdown-menu-end">
                <li>
                  <a className="dropdown-item" href="profile.html">
                    Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="settings.html">
                    Account settings
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <Link className="dropdown-item" to="/login">
                    Sign out
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
export default Navbar;
