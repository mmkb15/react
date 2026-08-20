import { useEffect, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axios from "axios"
import { defaultPhase, phaseStatuses, type Phase } from "../../../interfaces/Phase"
import { type Project } from "../../../interfaces/Project"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function PhaseCreate() {

    const { projectId } = useParams();
    const navigate = useNavigate();
    const [form, setForm] = useState<Phase>({ ...defaultPhase, projectId: Number(projectId) });
    const [project, setProject] = useState<Project | null>(null);
    const [msg, setMsg] = useState("");
    const [errors, setErrors] = useState({ name: "" });

    function getProject() {
        axios
            .get(API_BASE_URL + "/projects/" + projectId)
            .then((res) => {
                setProject(res.data);
                setForm((prev) => ({ ...prev, projectName: res.data.name }));
            })
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProject();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: name === "budgetCost" || name === "actualCost" ? Number(value) : value }));
    }

    function handleSubmit() {
        const newErrors = { name: "" };
        if (form.name === "") newErrors.name = "Phase name is required";
        setErrors(newErrors);

        if (newErrors.name !== "") return;

        axios
            .post(API_BASE_URL + "/phases", form, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Phase created successfully!");
                navigate(`/project-details/${projectId}`);
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Phase create failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: project ? project.name : "...", to: `/project-details/${projectId}` },
                        { label: "Add Phase" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Add New Phase</h4>
                        <p className="mb-0 text-body-secondary">
                            Project: {project ? project.name : "..."}
                        </p>
                    </div>
                    <Link to={`/project-details/${projectId}`} className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Project
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
                                    <label className="form-label" htmlFor="name">Phase Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        placeholder="e.g. Planning, Design, Development"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                    <small className="text-danger">{errors.name}</small>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="status">Status</label>
                                    <select
                                        id="status"
                                        name="status"
                                        className="form-select"
                                        value={form.status}
                                        onChange={handleChange}
                                    >
                                        {phaseStatuses.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))}
                                    </select>
                                </div>
                                <div className="col-12 col-md-3">
                                    <label className="form-label" htmlFor="expectedStartDate">Expected Start</label>
                                    <input
                                        type="date"
                                        id="expectedStartDate"
                                        name="expectedStartDate"
                                        className="form-control"
                                        value={form.expectedStartDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-3">
                                    <label className="form-label" htmlFor="expectedEndDate">Expected End</label>
                                    <input
                                        type="date"
                                        id="expectedEndDate"
                                        name="expectedEndDate"
                                        className="form-control"
                                        value={form.expectedEndDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-3">
                                    <label className="form-label" htmlFor="actualStartDate">Actual Start</label>
                                    <input
                                        type="date"
                                        id="actualStartDate"
                                        name="actualStartDate"
                                        className="form-control"
                                        value={form.actualStartDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-3">
                                    <label className="form-label" htmlFor="actualEndDate">Actual End</label>
                                    <input
                                        type="date"
                                        id="actualEndDate"
                                        name="actualEndDate"
                                        className="form-control"
                                        value={form.actualEndDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="budgetCost">Budget Cost</label>
                                    <input
                                        type="number"
                                        id="budgetCost"
                                        name="budgetCost"
                                        className="form-control"
                                        value={form.budgetCost}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="actualCost">Actual Cost</label>
                                    <input
                                        type="number"
                                        id="actualCost"
                                        name="actualCost"
                                        className="form-control"
                                        value={form.actualCost}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12">
                                    <label className="form-label" htmlFor="description">Description</label>
                                    <textarea
                                        id="description"
                                        name="description"
                                        className="form-control"
                                        rows={3}
                                        value={form.description}
                                        onChange={handleChange}
                                    ></textarea>
                                </div>
                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <Link to={`/project-details/${projectId}`} className="btn btn-label-secondary">
                                        Cancel
                                    </Link>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Create Phase
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
export default PhaseCreate
