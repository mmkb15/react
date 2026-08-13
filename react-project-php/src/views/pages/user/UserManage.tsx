import { Link } from "react-router";
import PageHeading from "../../../components/PageHeading.tsx";
import axios from "axios";
import { useEffect, useState } from "react";
import type { User } from "../../../interfaces/User.ts";

function UserManage() {
  const [users, setUsers] = useState<User[]>([]);
  const getUsers = () => {
    axios
      .get("http://localhost/react-project-api/api/users")
      .then((res) => {
        console.log(res.data);
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <main className="dashboard-content">
        <div className="container-fluid px-3 px-lg-4 py-4">
          <PageHeading icon="people" subtitle="Management" title="Users">
            <Link to="/user-create" className="btn btn-primary">
              <i className="bi bi-plus-lg me-1"></i> Add New
            </Link>
          </PageHeading>

          <section className="row g-3 mt-1" aria-label="User summary">
            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-primary">
                <div className="metric-top">
                  <span className="metric-label">Total Users</span>
                  <span className="metric-icon">
                    <i className="bi bi-people" aria-hidden="true"></i>
                  </span>
                </div>
                <div className="metric-value">{users.length}</div>
                <div className="metric-meta">
                  <span className="text-success">+5.1%</span>
                  <span>this month</span>
                </div>
              </article>
            </div>

            {/* <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-success">
                <div className="metric-top">
                  <span className="metric-label">Active</span>
                  <span className="metric-icon"><i className="bi bi-check2-circle" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">7,980</div>
                <div className="metric-meta">
                  <span className="text-success">91%</span>
                  <span>healthy accounts</span>
                </div>
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-warning">
                <div className="metric-top">
                  <span className="metric-label">Pending</span>
                  <span className="metric-icon"><i className="bi bi-hourglass-split" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">184</div>
                <div className="metric-meta">
                  <span className="text-warning">12</span>
                  <span>need approval</span>
                </div>
              </article>
            </div>

            <div className="col-12 col-sm-6 col-xl-3">
              <article className="metric-card metric-danger">
                <div className="metric-top">
                  <span className="metric-label">Suspended</span>
                  <span className="metric-icon"><i className="bi bi-slash-circle" aria-hidden="true"></i></span>
                </div>
                <div className="metric-value">38</div>
                <div className="metric-meta">
                  <span className="text-danger">4</span>
                  <span>flagged today</span>
                </div>
              </article>
            </div> */}
          </section>

          <section className="panel mt-3">
            <div className="table-responsive">
              <table
                className="table align-middle mb-0"
                id="usersTable"
                data-searchable-table=""
              >
                <thead>
                  <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Email</th>
                    <th scope="col">Role</th>
                    <th scope="col" className="text-end">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((item) => (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>
                        <div className="d-flex align-items-center gap-2">
                          <img
                            className="avatar-img avatar-sm"
                            src={`https://i.pravatar.cc/${item.id? item.id + 100 : 100}`}
                            alt="Sarah Ahmed"
                          />
                          <div>
                            <p className="fw-semibold mb-0">{item.name}</p>
                            <p className="text-muted small mb-0">{item.email}</p>
                          </div>
                        </div>
                      </td>
                      <td>{item.role}</td>
                      <td>
                        <span className="badge text-bg-success">Active</span>
                      </td>
                      <td>
                        <div className="d-flex gap-1 justify-content-end">
                          <Link
                            to={`/user-details/${item.id}`}
                            className="btn btn-sm btn-outline-success"
                          >
                            <i className="bi bi-eye"></i>
                          </Link>
                          <Link
                            to={`/user-edit/${item.id}`}
                            className="btn btn-sm btn-outline-primary"
                          >
                            <i className="bi bi-pencil-square"></i>
                          </Link>
                          <button className="btn btn-sm btn-outline-danger">
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="d-flex flex-column flex-sm-row align-items-sm-center justify-content-between gap-3 mt-3">
              <p className="text-muted small mb-0">
                Showing 1 to 5 of 124 users
              </p>
              <nav aria-label="Users pagination">
                <ul className="pagination pagination-sm mb-0">
                  <li className="page-item disabled">
                    <a className="page-link" href="#">
                      Previous
                    </a>
                  </li>
                  <li className="page-item active">
                    <a className="page-link" href="#">
                      1
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      2
                    </a>
                  </li>
                  <li className="page-item">
                    <a className="page-link" href="#">
                      Next
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}
export default UserManage;
