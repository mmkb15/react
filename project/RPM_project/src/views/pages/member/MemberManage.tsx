import { useEffect, useState } from "react"
import { Link } from "react-router"
import axios from "axios"
import { type Member } from "../../../interfaces/Member"
import { API_BASE_URL } from "../../../config"

function MemberManage() {

    const [members, setMembers] = useState<Member[]>([]);
    const [msg, setMsg] = useState("");

    function getAllMembers() {
        axios
            .get(API_BASE_URL + "/members")
            .then((res) => {
                setMembers(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }

    useEffect(() => {
        getAllMembers();
    }, []);

    function handleDelete(id?: number) {
        if (!id) return;
        const ok = window.confirm("Remove this member? This action cannot be undone.");
        if (!ok) return;

        axios
            .delete(API_BASE_URL + "/members/" + id)
            .then((res) => {
                if (res.status === 200) setMsg("🎉 Member removed successfully!");
                getAllMembers();
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Member remove failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Members</h4>
                        <p className="mb-0 text-body-secondary">Everyone working across your projects.</p>
                    </div>
                    <Link to="/member-create" className="btn btn-primary">
                        <i className="icon-base ti tabler-plus me-1"></i>
                        Add New Member
                    </Link>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                {/* <!-- Members List Table --> */}
                <div className="card">
                    <h5 className="card-header">All Members</h5>
                    <div className="table-responsive text-nowrap">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Member</th>
                                    <th>Email</th>
                                    <th>Role</th>
                                    <th>Projects</th>
                                    <th>Status</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody className="table-border-bottom-0">
                                {members.map((member) => (
                                    <tr key={member.id}>
                                        <td>
                                            <div className="d-flex align-items-center">
                                                <div className="avatar avatar-sm me-3">
                                                    <img
                                                        src={`../../assets/img/avatars/${member.avatar}`}
                                                        alt="Avatar"
                                                        className="rounded-circle"
                                                    />
                                                </div>
                                                <Link to={`/member-details/${member.id}`} className="fw-medium text-heading">
                                                    {member.name}
                                                </Link>
                                            </div>
                                        </td>
                                        <td>{member.email}</td>
                                        <td>{member.role}</td>
                                        <td>{member.projectsCount}</td>
                                        <td>
                                            <span className={`badge bg-label-${member.status === "Active" ? "success" : "secondary"}`}>
                                                {member.status}
                                            </span>
                                        </td>
                                        <td>
                                            <div className="dropdown">
                                                <button
                                                    type="button"
                                                    className="btn p-0 dropdown-toggle hide-arrow"
                                                    data-bs-toggle="dropdown"
                                                >
                                                    <i className="icon-base ti tabler-dots-vertical"></i>
                                                </button>
                                                <div className="dropdown-menu">
                                                    <Link className="dropdown-item waves-effect" to={`/member-details/${member.id}`}>
                                                        <i className="icon-base ti tabler-eye me-1"></i> View
                                                    </Link>
                                                    <Link className="dropdown-item waves-effect" to={`/member-edit/${member.id}`}>
                                                        <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                    </Link>
                                                    <a
                                                        className="dropdown-item waves-effect"
                                                        href="javascript:void(0);"
                                                        onClick={() => handleDelete(member.id)}
                                                    >
                                                        <i className="icon-base ti tabler-trash me-1"></i> Remove
                                                    </a>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {members.length === 0 && (
                                    <tr>
                                        <td colSpan={6} className="text-center py-4 text-body-secondary">
                                            No members yet. Click "Add New Member" to add one.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MemberManage
