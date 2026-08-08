import { Link, NavLink } from "react-router";

function Sidebar() {
  return (
    <>
      <input type="checkbox" id="sidebarToggle" className="d-none" />
      <aside
        className="admin-sidebar"
        id="adminSidebar"
        aria-label="Main navigation"
      >
        <div className="sidebar-header">
          <Link
            className="brand-mark"
            to="/"
            aria-label="adminHMD dashboard"
          >
            <span className="brand-icon">
              <i className="bi bi-grid-1x2-fill" aria-hidden="true"></i>
            </span>
            <span className="brand-copy">
              <span className="brand-title">StockMgt.</span>
              <span className="brand-subtitle">Admin Template</span>
            </span>
          </Link>
        </div>

        <nav className="sidebar-nav">
          <NavLink className="nav-link" to="/" aria-current="page">
            <span className="nav-icon">
              <i className="bi bi-speedometer2" aria-hidden="true"></i>
            </span>
            <span className="nav-text">Dashboard</span>
          </NavLink>          
          <small className="text-muted d-flex align-items-center">Sales <hr className="w-100 ms-2 my-0"/></small>
          <NavLink className="nav-link" to="/sale">
            <span className="nav-icon">
              <i className="bi bi-bag-check"></i>
            </span>
            <span className="nav-text">Sales</span>
          </NavLink> 
          <NavLink className="nav-link" to="/sale-return">
            <span className="nav-icon">
              <i className="bi bi-tags"></i>
            </span>
            <span className="nav-text">Sales Return</span>
          </NavLink>
          <small className="text-muted d-flex align-items-center">Product <hr className="w-100 ms-2 my-0"/></small>
          <NavLink className="nav-link" to="/product">
            <span className="nav-icon">
              <i className="bi bi-box-seam"></i>
            </span>
            <span className="nav-text">Products</span>
          </NavLink> 
          <NavLink className="nav-link" to="/category">
            <span className="nav-icon">
              <i className="bi bi-list-ul"></i>
            </span>
            <span className="nav-text">Categories</span>
          </NavLink> 
          <NavLink className="nav-link" to="/brand">
            <span className="nav-icon">
              <i className="bi bi-patch-check"></i>
            </span>
            <span className="nav-text">Brands</span>
          </NavLink> 
          <small className="text-muted d-flex align-items-center">Inventory <hr className="w-100 ms-2 my-0"/></small>
          <NavLink className="nav-link" to="/inventory">
            <span className="nav-icon">
              <i className="bi bi-boxes"></i>
            </span>
            <span className="nav-text">Inventory Report</span>
          </NavLink>          
          <NavLink className="nav-link" to="/inventory-transaction">
            <span className="nav-icon">
              <i className="bi bi-arrow-left-right"></i>
            </span>
            <span className="nav-text">Inventory Transaction</span>
          </NavLink>
          <NavLink className="nav-link" to="/inventory-adjustment">
            <span className="nav-icon">
              <i className="bi bi-sliders2-vertical"></i>
            </span>
            <span className="nav-text">Inventory Adjustment</span>
          </NavLink>
          <NavLink className="nav-link" to="/adjustment-type">
            <span className="nav-icon">
              <i className="bi bi-wrench"></i>
            </span>
            <span className="nav-text">Adjustment Types</span>
          </NavLink>
          <NavLink className="nav-link" to="/transaction-type">
            <span className="nav-icon">
              <i className="bi bi-card-checklist"></i>
            </span>
            <span className="nav-text">Transaction Types</span>
          </NavLink>
          <small className="text-muted d-flex align-items-center">Auth <hr className="w-100 ms-2 my-0"/></small>
          <NavLink className="nav-link" to="/user">
            <span className="nav-icon">
              <i className="bi bi-people" aria-hidden="true"></i>
            </span>
            <span className="nav-text">Users</span>
          </NavLink>          
          <NavLink className="nav-link" to="/role">
            <span className="nav-icon">
              <i className="bi bi-person-fill-gear"></i>
            </span>
            <span className="nav-text">Roles</span>
          </NavLink>
          <small className="text-muted d-flex align-items-center">Extra <hr className="w-100 ms-2 my-0"/></small>
          <NavLink className="nav-link" to="/post">
            <span className="nav-icon">
              <i className="bi bi-postcard"></i>
            </span>
            <span className="nav-text">Posts</span>
          </NavLink>
        </nav>

        <div className="sidebar-user">
          <img
            className="avatar-img avatar-md sidebar-user-avatar"
            src="https://i.pravatar.cc/150?img=47"
            alt="Admin Hasan"
          />
          <strong>Admin Hasan</strong>
          <small>Active Workspace</small>
        </div>

        <div className="sidebar-footer">
          <span className="status-dot"></span>
          <span className="sidebar-footer-text">System running smoothly</span>
        </div>
      </aside>
      <label htmlFor="sidebarToggle" className="sidebar-backdrop"></label>
    </>
  );
}
export default Sidebar;
