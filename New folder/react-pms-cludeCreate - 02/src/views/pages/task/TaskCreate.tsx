import { useState } from "react"
import { defaultTask, taskStatuses, type Task } from "../../../interfaces/Task"
import { dummyProjects } from "../../../interfaces/Project"
import { dummyMembers } from "../../../interfaces/Member"

function TaskCreate({
    task,
    onClose,
    onSave,
}: {
    task: Task | null;
    onClose: () => void;
    onSave: (task: Task) => void;
}) {

    const [form, setForm] = useState<Task>(task ?? defaultTask);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "projectId") {
            const project = dummyProjects.find((p) => String(p.id) === value);
            setForm((prev) => ({
                ...prev,
                projectId: project?.id ?? 0,
                projectName: project?.name ?? "",
            }));
            return;
        }

        if (name === "assignee") {
            const member = dummyMembers.find((m) => m.name === value);
            setForm((prev) => ({
                ...prev,
                assignee: member ? { name: member.name, avatar: member.avatar } : null,
            }));
            return;
        }

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
                                <h4 className="mb-1">{task ? "Edit Task" : "Add New Task"}</h4>
                                <p className="text-body-secondary">
                                    {task ? "Update the task details below." : "Fill in the details to create a new task."}
                                </p>
                            </div>
                            <form onSubmit={handleSubmit}>
                                <div className="row g-4">
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="title">Task Title</label>
                                        <input
                                            type="text"
                                            id="title"
                                            name="title"
                                            className="form-control"
                                            placeholder="e.g. Design login page"
                                            value={form.title}
                                            onChange={handleChange}
                                            required
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="projectId">Project</label>
                                        <select
                                            id="projectId"
                                            name="projectId"
                                            className="form-select"
                                            value={form.projectId || ""}
                                            onChange={handleChange}
                                            required
                                        >
                                            <option value="" disabled>Select project</option>
                                            {dummyProjects.map((project) => (
                                                <option key={project.id} value={project.id}>
                                                    {project.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="assignee">Assignee</label>
                                        <select
                                            id="assignee"
                                            name="assignee"
                                            className="form-select"
                                            value={form.assignee?.name ?? ""}
                                            onChange={handleChange}
                                        >
                                            <option value="">Unassigned</option>
                                            {dummyMembers.map((member) => (
                                                <option key={member.id} value={member.name}>
                                                    {member.name}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="dueDate">Due Date</label>
                                        <input
                                            type="date"
                                            id="dueDate"
                                            name="dueDate"
                                            className="form-control"
                                            value={form.dueDate}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label" htmlFor="priority">Priority</label>
                                        <select
                                            id="priority"
                                            name="priority"
                                            className="form-select"
                                            value={form.priority}
                                            onChange={handleChange}
                                        >
                                            <option value="Low">Low</option>
                                            <option value="Medium">Medium</option>
                                            <option value="High">High</option>
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
                                            {taskStatuses.map((status) => (
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="col-12">
                                        <label className="form-label" htmlFor="description">Description</label>
                                        <textarea
                                            id="description"
                                            name="description"
                                            className="form-control"
                                            rows={3}
                                            placeholder="Short task description"
                                            value={form.description}
                                            onChange={handleChange}
                                        ></textarea>
                                    </div>
                                    <div className="col-12 text-center">
                                        <button type="submit" className="btn btn-primary me-2">
                                            {task ? "Save Changes" : "Create Task"}
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
export default TaskCreate
