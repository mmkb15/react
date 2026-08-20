import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axios from "axios"
import { defaultMember, type Member } from "../../../interfaces/Member"
import { API_BASE_URL } from "../../../config"

function MemberEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<Member>(defaultMember);
    const [msg, setMsg] = useState("");

    function getMember() {
        axios
            .get(API_BASE_URL + "/members/" + id)
            .then((res) => setForm(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getMember();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    }

    function handleSubmit() {
        axios
            .put(API_BASE_URL + "/members/" + id, form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Member updated successfully!");
                navigate("/member");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Member update failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Edit Member</h4>
                        <p className="mb-0 text-body-secondary">Update the member details below.</p>
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
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={form.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="role">Role</label>
                                    <input
                                        type="text"
                                        id="role"
                                        name="role"
                                        className="form-control"
                                        value={form.role}
                                        onChange={handleChange}
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
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <Link to="/member" className="btn btn-label-secondary">
                                        Cancel
                                    </Link>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Update Member
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
export default MemberEdit
