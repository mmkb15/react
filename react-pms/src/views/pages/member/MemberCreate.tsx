import { useState } from "react"
import { defaultMember, type Member } from "../../../interfaces/Member"

function MemberCreate({
    member,
    onClose,
    onSave,
}: {
    member: Member | null;
    onClose: () => void;
    onSave: (member: Member) => void;
}) {

    const [form, setForm] = useState<Member>(member ?? defaultMember);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    }

    return (
        <>
            <div className="modal modal-add-new-address show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-simple">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                            <div className="text-center mb-4">
                                <h4 className="mb-1">{member ? "Edit Member" : "Add New Member"}</h4>
                                <p className="text-body-secondary">
                                    {member ? "Update the member details below." : "Fill in the details to add a new team member."}
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="name">Full Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="e.g. John Doe"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="email">Email</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            className="form-control"
                                            placeholder="john.doe@example.com"
                                            value={form.email}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="role">Role</label>
                                        <input
                                            type="text"
                                            id="role"
                                            name="role"
                                            className="form-control"
                                            placeholder="e.g. Frontend Developer"
                                            value={form.role}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="status">Status</label>
                                        <select
                                            id="status"
                                            name="status"
                                            className="form-select"
                                            value={form.status}
                                            onChange={handleChange}
                                        >
                                            <option value="Active">Active</option>
                                            <option value="Inactive">Inactive</option>
                                        </select>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary me-2">
                                            {member ? "Save Changes" : "Add Member"}
                                        </button>
                                        <button type="button" className="btn btn-label-secondary" onClick={onClose}>
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
            <div className="modal-backdrop fade show"></div>
        </>
    )
}
export default MemberCreate
