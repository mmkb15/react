import { Link } from "react-router"

function UserManage() {
    return(
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

              {/* <!-- Users List Table --> */}
              <div className="card">
                <h5 className="card-header">Table Basic</h5>
                <div className="table-responsive text-nowrap">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Project</th>
                        <th>Client</th>
                        <th>Users</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody className="table-border-bottom-0">
                      <tr>
                        <td>
                          <i className="icon-base ti tabler-brand-angular icon-md text-danger me-4"></i>
                          <span className="fw-medium">Angular Project</span>
                        </td>
                        <td>Albert Cook</td>
                        <td>
                          <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Lilian Fuller" data-bs-original-title="Lilian Fuller">
                              <img src="../../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Sophia Wilkerson" data-bs-original-title="Sophia Wilkerson">
                              <img src="../../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Christina Parker" data-bs-original-title="Christina Parker">
                              <img src="../../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                          </ul>
                        </td>
                        <td><span className="badge bg-label-primary me-1">Active</span></td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="icon-base ti tabler-dots-vertical"></i>
                            </button>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-pencil me-1"></i> Edit</Link>
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-trash me-1"></i> Delete</Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="icon-base ti tabler-brand-react-native icon-md text-info me-4"></i>
                          <span className="fw-medium">React Project</span>
                        </td>
                        <td>Barry Hunter</td>
                        <td>
                          <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Lilian Fuller" data-bs-original-title="Lilian Fuller">
                              <img src="../../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Sophia Wilkerson" data-bs-original-title="Sophia Wilkerson">
                              <img src="../../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Christina Parker" data-bs-original-title="Christina Parker">
                              <img src="../../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                          </ul>
                        </td>
                        <td><span className="badge bg-label-success me-1">Completed</span></td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="icon-base ti tabler-dots-vertical"></i>
                            </button>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-pencil me-2"></i> Edit</Link>
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-trash me-2"></i> Delete</Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="icon-base ti tabler-brand-vue icon-md text-success me-4"></i>
                          <span className="fw-medium">VueJs Project</span>
                        </td>
                        <td>Trevor Baker</td>
                        <td>
                          <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Lilian Fuller" data-bs-original-title="Lilian Fuller">
                              <img src="../../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Sophia Wilkerson" data-bs-original-title="Sophia Wilkerson">
                              <img src="../../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Christina Parker" data-bs-original-title="Christina Parker">
                              <img src="../../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                          </ul>
                        </td>
                        <td><span className="badge bg-label-info me-1">Scheduled</span></td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="icon-base ti tabler-dots-vertical"></i>
                            </button>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-pencil me-2"></i> Edit</Link>
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-trash me-2"></i> Delete</Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <i className="icon-base ti tabler-brand-bootstrap icon-md text-primary me-4"></i>
                          <span className="fw-medium">Bootstrap Project</span>
                        </td>
                        <td>Jerry Milton</td>
                        <td>
                          <ul className="list-unstyled m-0 avatar-group d-flex align-items-center">
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Lilian Fuller" data-bs-original-title="Lilian Fuller">
                              <img src="../../assets/img/avatars/5.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Sophia Wilkerson" data-bs-original-title="Sophia Wilkerson">
                              <img src="../../assets/img/avatars/6.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                            <li data-bs-toggle="tooltip" data-popup="tooltip-custom" data-bs-placement="top" className="avatar avatar-xs pull-up" aria-label="Christina Parker" data-bs-original-title="Christina Parker">
                              <img src="../../assets/img/avatars/7.png" alt="Avatar" className="rounded-circle"/>
                            </li>
                          </ul>
                        </td>
                        <td><span className="badge bg-label-warning me-1">Pending</span></td>
                        <td>
                          <div className="dropdown">
                            <button type="button" className="btn p-0 dropdown-toggle hide-arrow" data-bs-toggle="dropdown">
                              <i className="icon-base ti tabler-dots-vertical"></i>
                            </button>
                            <div className="dropdown-menu">
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-pencil me-2"></i> Edit</Link>
                              <Link className="dropdown-item waves-effect" to="javascript:void(0);"><i className="icon-base ti tabler-trash me-2"></i> Delete</Link>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
        </>
    )
}
export default UserManage