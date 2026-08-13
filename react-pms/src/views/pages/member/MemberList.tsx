import { useState } from "react"
import { dummyMembers, type Member } from "../../../interfaces/Member"
import MemberCreate from "./MemberCreate"

function MemberList() {

    const [members, setMembers] = useState<Member[]>(dummyMembers);
    const [showModal, setShowModal] = useState(false);
    const [editingMember, setEditingMember] = useState<Member | null>(null);

    const handleAddNew = () => {
        setEditingMember(null);
        setShowModal(true);
    }

    const handleEdit = (member: Member) => {
        setEditingMember(member);
        setShowModal(true);
    }

    const handleDelete = (id?: number) => {
        if (!id) return;
        const ok = window.confirm("Remove this member? This action cannot be undone.");
        if (ok) {
            setMembers((prev) => prev.filter((m) => m.id !== id));
        }
    }

    const handleSave = (member: Member) => {
        if (member.id) {
            setMembers((prev) => prev.map((m) => (m.id === member.id ? member : m)));
        } else {
            const nextId = Math.max(0, ...members.map((m) => m.id ?? 0)) + 1;
            setMembers((prev) => [...prev, { ...member, id: nextId }]);
        }
        setShowModal(false);
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Members</h4>
                        <p className="mb-0 text-body-secondary">Everyone working across your projects.</p>
                    </div>
                    <button type="button" className="btn btn-primary" onClick={handleAddNew}>
                        <i className="icon-base ti tabler-plus me-1"></i>
                        Add New Member
                    </button>
                </div>

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
                                                <span className="fw-medium text-heading">{member.name}</span>
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
                                                    <a
                                                        className="dropdown-item waves-effect"
                                                        href="javascript:void(0);"
                                                        onClick={() => handleEdit(member)}
                                                    >
                                                        <i className="icon-base ti tabler-pencil me-1"></i> Edit
                                                    </a>
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

            {showModal && (
                <MemberCreate
                    member={editingMember}
                    onClose={() => setShowModal(false)}
                    onSave={handleSave}
                />
            )}
        </>
    )
}
export default MemberList
