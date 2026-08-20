import { useState } from "react"
import { Link, useNavigate } from "react-router"
import axios from "axios"
import { defaultMember, type Member } from "../../../interfaces/Member"
import { API_BASE_URL } from "../../../config"

function MemberCreate() {

    const navigate = useNavigate();
    const [form, setForm] = useState<Member>(defaultMember);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({ name: "", email: "", role: "" });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        const newErrors = { name: "", email: "", role: "" };
        if (form.name === "") newErrors.name = "Full name is required";
        if (form.email === "") newErrors.email = "Email is required";
        if (form.role === "") newErrors.role = "Role is required";
        setErrors(newErrors);

        if (newErrors.name !== "" || newErrors.email !== "" || newErrors.role !== "") return;

        axios
            .post(API_BASE_URL + "/members", form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Member added successfully!");
                navigate("/member");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Member create failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Add New Member</h4>
                        <p className="mb-0 text-body-secondary">Fill in the details to add a new team member.</p>
                    </div>
                    <Link to="/member" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Members
                    </Link>
                </div>

                {msg !== "" && (
                    <div className="alert alert-info" role="alert">
                        {msg}
                    </div>
                )}

                <div className="card">
                    <div className="card-body">
                        <form>
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
                                    />
                                    <small className="text-danger">{errors.name}</small>
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
                                    />
                                    <small className="text-danger">{errors.email}</small>
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
                                    />
                                    <small className="text-danger">{errors.role}</small>
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
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <button type="button" className="btn btn-label-secondary" onClick={() => setForm(defaultMember)}>
                                        Cancel
                                    </button>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Add Member
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}
export default MemberCreate
