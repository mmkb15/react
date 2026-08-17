import { useState } from "react"
import { defaultProject, projectCategories, projectPhases, type Project } from "../../../interfaces/Project"

function ProjectCreate({
    project,
    onClose,
    onSave,
}: {
    project: Project | null;
    onClose: () => void;
    onSave: (project: Project) => void;
}) {

    const [form, setForm] = useState<Project>(project ?? defaultProject);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        setForm((prev) => ({
            ...prev,
            [name]: type === "number" ? Number(value) : value,
        }));
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(form);
    }

    return (
        <>
            <div className="modal modal-add-new-address show d-block" tabIndex={-1}>
                <div className="modal-dialog modal-dialog-centered modal-lg">
                    <div className="modal-content">
                        <div className="modal-body">
                            <button
                                type="button"
                                className="btn-close"
                                onClick={onClose}
                                aria-label="Close"
                            ></button>
                            <div className="text-center mb-4">
                                <h4 className="mb-1">{project ? "Edit Project" : "Add New Project"}</h4>
                                <p className="text-body-secondary">
                                    {project ? "Update the project details below." : "Fill in the details to create a new project."}
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">

                                    {/* Basic info */}
                                    <div className="col-12">
                                        <h6 className="text-uppercase text-body-secondary mb-0">Basic Information</h6>
                                        <hr className="mt-2 mb-0" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="name">Project Name</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            className="form-control"
                                            placeholder="e.g. Website Redesign"
                                            value={form.name}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="client">Client</label>
                                        <input
                                            type="text"
                                            id="client"
                                            name="client"
                                            className="form-control"
                                            placeholder="Client name"
                                            value={form.client}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="category">Project Category</label>
                                        <select
                                            id="category"
                                            name="category"
                                            className="form-select"
                                            value={form.category}
                                            onChange={handleChange}
                                        >
                                            {projectCategories.map((category) => (
                                                <option key={category} value={category}>{category}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="phase">Project Phase</label>
                                        <select
                                            id="phase"
                                            name="phase"
                                            className="form-select"
                                            value={form.phase}
                                            onChange={handleChange}
                                        >
                                            {projectPhases.map((phase) => (
                                                <option key={phase} value={phase}>{phase}</option>
                                            ))}
                                        </select>
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
                                            <option value="Pending">Pending</option>
                                            <option value="Active">Active</option>
                                            <option value="Scheduled">Scheduled</option>
                                            <option value="On Hold">On Hold</option>
                                            <option value="Completed">Completed</option>
                                        </select>
                                    </div>

                                    {/* Timeline */}
                                    <div className="col-12 mt-4">
                                        <h6 className="text-uppercase text-body-secondary mb-0">Timeline</h6>
                                        <hr className="mt-2 mb-0" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="expectedStartDate">Expected Starting Time</label>
                                        <input
                                            type="date"
                                            id="expectedStartDate"
                                            name="expectedStartDate"
                                            className="form-control"
                                            value={form.expectedStartDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="expectedEndDate">Expected Ending Time</label>
                                        <input
                                            type="date"
                                            id="expectedEndDate"
                                            name="expectedEndDate"
                                            className="form-control"
                                            value={form.expectedEndDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="actualStartDate">Actual Starting Time</label>
                                        <input
                                            type="date"
                                            id="actualStartDate"
                                            name="actualStartDate"
                                            className="form-control"
                                            value={form.actualStartDate}
                                            onChange={handleChange}
                                        />
                                        <div className="form-text">Leave empty if the project hasn't actually started yet.</div>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="actualEndDate">Actual Ending Time</label>
                                        <input
                                            type="date"
                                            id="actualEndDate"
                                            name="actualEndDate"
                                            className="form-control"
                                            value={form.actualEndDate}
                                            onChange={handleChange}
                                        />
                                        <div className="form-text">Leave empty if the project hasn't actually finished yet.</div>
                                    </div>

                                    {/* Budget */}
                                    <div className="col-12 mt-4">
                                        <h6 className="text-uppercase text-body-secondary mb-0">Budget</h6>
                                        <hr className="mt-2 mb-0" />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="budgetCost">Budget Cost ($)</label>
                                        <input
                                            type="number"
                                            id="budgetCost"
                                            name="budgetCost"
                                            className="form-control"
                                            placeholder="0"
                                            min={0}
                                            value={form.budgetCost}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="actualCost">Actual Cost (৳)</label>
                                        <input
                                            type="number"
                                            id="actualCost"
                                            name="actualCost"
                                            className="form-control"
                                            placeholder="0"
                                            min={0}
                                            value={form.actualCost}
                                            onChange={handleChange}
                                        />
                                        <div className="form-text">Amount spent so far on this project.</div>
                                    </div>

                                    {/* Description */}
                                    <div className="col-12 mt-4">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            rows={3}
                                            placeholder="Short project description"
                                            value={form.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>

                                    <div className="col-12 text-center mt-4">
                                        <button type="submit" className="btn btn-primary me-2">
                                            {project ? "Save Changes" : "Create Project"}
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
export default ProjectCreate
