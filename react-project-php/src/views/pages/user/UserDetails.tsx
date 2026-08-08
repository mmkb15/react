import { Link, useParams } from "react-router";
import PageHeading from "../../../components/PageHeading.tsx";

function UserDetails() {
    const {id} = useParams();
  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading
            icon="person-lines-fill"
            subtitle="Management"
            title="User Details"
          >
            <Link className="btn btn-outline-secondary btn-sm" to="/user">
              <i className="bi bi-arrow-left" aria-hidden="true"></i> Back to
              Users
            </Link>
            <Link className="btn btn-primary btn-sm" to="/user-create">
              <i className="bi bi-person-plus" aria-hidden="true"></i> Add User
            </Link>
          </PageHeading>

          <section className="row g-3">
            <div className="col-12 col-xl-4">
              <div className="panel h-100 text-center profile-card">
                <div className="profile-cover text-bg-success"></div>
                <div className="profile-hero">
                  <img
                    className="avatar-img avatar-xl profile-photo mb-3"
                    src="https://i.pravatar.cc/100"
                    alt="Asia R."
                  />
                  <h2 className="h5 mb-1">Asia R.</h2>
                  <p className="text-muted mb-3">Senior Administrator</p>
                  <span className="badge text-bg-success">Active Account</span>
                </div>
                <div className="info-list mt-4 text-start">
                  <div>
                    <span>Email</span>
                    <strong>sarah@example.com</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>+1 555 0184</strong>
                  </div>
                  <div>
                    <span>Team</span>
                    <strong>Operations</strong>
                  </div>
                  <div>
                    <span>Location</span>
                    <strong>New York, USA</strong>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 col-xl-8">
              <div className="panel mb-3">
                <div className="panel-header">
                  <div>
                    <h2 className="h5 mb-1 section-title">
                      <i
                        className="bi bi-person-lines-fill"
                        aria-hidden="true"
                      ></i>
                      <span>Account Overview</span>
                    </h2>
                    <p className="text-muted mb-0">
                      Permissions, plan, and current access details.
                    </p>
                  </div>
                  <Link to={`/user-edit/${id}`} className="btn btn-primary btn-sm">
                    Edit User
                  </Link>
                </div>
                <div className="row g-3">
                  <div className="col-md-4">
                    <div className="mini-card">
                      <span>Role</span>
                      <strong>Admin</strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mini-card">
                      <span>Last Login</span>
                      <strong>Today</strong>
                    </div>
                  </div>
                  <div className="col-md-4">
                    <div className="mini-card">
                      <span>Projects</span>
                      <strong>14 Active</strong>
                    </div>
                  </div>
                </div>
              </div>
              <div className="panel">
                <div className="panel-header">
                  <div>
                    <h2 className="h5 mb-1 section-title">
                      <i className="bi bi-clock-history" aria-hidden="true"></i>
                      <span>Recent Activity</span>
                    </h2>
                    <p className="text-muted mb-0">
                      Latest security and workflow events.
                    </p>
                  </div>
                </div>
                <div className="activity-list">
                  <div className="activity-item">
                    <span className="activity-dot bg-primary"></span>
                    <div>
                      <p className="mb-1 fw-semibold">
                        Updated billing permissions
                      </p>
                      <p className="text-muted small mb-0">2 hours ago</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-dot bg-success"></span>
                    <div>
                      <p className="mb-1 fw-semibold">Approved new teammate</p>
                      <p className="text-muted small mb-0">Yesterday</p>
                    </div>
                  </div>
                  <div className="activity-item">
                    <span className="activity-dot bg-warning"></span>
                    <div>
                      <p className="mb-1 fw-semibold">Changed password</p>
                      <p className="text-muted small mb-0">Apr 30, 2026</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default UserDetails;
