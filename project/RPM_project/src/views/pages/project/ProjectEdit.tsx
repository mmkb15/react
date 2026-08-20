import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router"
import axios from "axios"
import { defaultProject, projectPriorities, type Project, type ProjectMember } from "../../../interfaces/Project"
import { type Category } from "../../../interfaces/Category"
import { type Member } from "../../../interfaces/Member"
import { API_BASE_URL } from "../../../config"
import Breadcrumb from "../../../components/Breadcrumb"

function ProjectEdit() {

    const { id } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [form, setForm] = useState<Project>(defaultProject);
    const [categories, setCategories] = useState<Category[]>([]);
    const [members, setMembers] = useState<Member[]>([]);
    const [selectedMembers, setSelectedMembers] = useState<ProjectMember[]>([]);
    const [attachment, setAttachment] = useState<File | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [msg, setMsg] = useState("");

    // Inline "add new category" state — no need to leave this page
    const [showNewCategory, setShowNewCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");

    // Load the existing project data and fill it into the form
    function getProject() {
        axios
            .get(API_BASE_URL + "/projects/" + id)
            .then((res) => {
                setForm(res.data);
                setSelectedMembers(res.data.members ?? []);
            })
            .catch((err) => console.log(err));
    }

    function getCategories() {
        axios
            .get(API_BASE_URL + "/categories")
            .then((res) => setCategories(res.data))
            .catch((err) => console.log(err));
    }

    function getMembers() {
        axios
            .get(API_BASE_URL + "/members")
            .then((res) => setMembers(res.data))
            .catch((err) => console.log(err));
    }

    useEffect(() => {
        getProject();
        getCategories();
        getMembers();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        if (name === "categoryId") {
            if (value === "__new__") {
                setShowNewCategory(true);
                return;
            }
            const category = categories.find((c) => String(c.id) === value);
            setForm((prev) => ({
                ...prev,
                categoryId: category?.id ?? 0,
                categoryName: category?.name ?? "",
            }));
            return;
        }

        if (name === "managerId") {
            const manager = members.find((m) => String(m.id) === value);
            setForm((prev) => ({
                ...prev,
                managerId: manager?.id ?? 0,
                managerName: manager?.name ?? "",
            }));
            return;
        }

        if (name === "budget" || name === "estimatedHours") {
            setForm((prev) => ({ ...prev, [name]: Number(value) }));
            return;
        }

        setForm((prev) => ({ ...prev, [name]: value }));
    }

    // Create a new category right here on the Project form (POST + select it immediately)
    function createCategory() {
        if (newCategoryName.trim() === "") return;

        axios
            .post(API_BASE_URL + "/categories", { name: newCategoryName, description: "" }, {
                headers: { "Content-Type": "application/json" },
            })
            .then((res) => {
                const created: Category = res.data;
                setCategories((prev) => [...prev, created]);
                setForm((prev) => ({ ...prev, categoryId: created.id, categoryName: created.name }));
                setNewCategoryName("");
                setShowNewCategory(false);
            })
            .catch((err) => console.log(err));
    }

    function toggleMember(member: Member) {
        const alreadySelected = selectedMembers.some((m) => m.id === member.id);

        if (alreadySelected) {
            setSelectedMembers((prev) => prev.filter((m) => m.id !== member.id));
        } else {
            setSelectedMembers((prev) => [...prev, { id: member.id, name: member.name, avatar: member.avatar }]);
        }
    }

    function handleFileSelect(file: File | undefined) {
        if (!file) return;
        setAttachment(file);
    }

    function handleDrop(e: React.DragEvent<HTMLDivElement>) {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files?.[0]);
    }

    function handleSubmit() {
        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("description", form.description ?? "");
        formData.append("client", form.client);
        formData.append("categoryId", String(form.categoryId));
        formData.append("categoryName", form.categoryName ?? "");
        formData.append("status", form.status);
        formData.append("startDate", form.startDate);
        formData.append("deadline", form.deadline);
        formData.append("budget", String(form.budget));
        formData.append("estimatedHours", String(form.estimatedHours));
        formData.append("priority", form.priority);
        formData.append("managerId", String(form.managerId));
        formData.append("managerName", form.managerName ?? "");
        formData.append("members", JSON.stringify(selectedMembers));
        if (attachment) {
            formData.append("attachment", attachment);
        }

        axios
            .put(API_BASE_URL + "/projects/" + id, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            })
            .then((res) => {
                console.log(res);
                setMsg("🎉 Project updated successfully!");
                navigate("/project");
            })
            .catch((err) => {
                console.log(err);
                setMsg("⚠️ Something went wrong. Project update failed!");
            });
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <Breadcrumb
                    items={[
                        { label: "Projects", to: "/project" },
                        { label: form.name || "Edit Project", to: form.id ? `/project-details/${form.id}` : "/project" },
                        { label: "Edit" },
                    ]}
                />

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                        <h4 className="mb-1">Edit Project</h4>
                        <p className="mb-0 text-body-secondary">Update the project details below.</p>
                    </div>
                    <Link to="/project" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Projects
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

                                {/* Project Name - full width */}
                                <div className="col-12">
                                    <label className="form-label" htmlFor="name">Project Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-control"
                                        value={form.name}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Description - full width */}
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

                                {/* Client + Category */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="client">Client</label>
                                    <input
                                        type="text"
                                        id="client"
                                        name="client"
                                        className="form-control"
                                        value={form.client}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="categoryId">Project Category</label>
                                    <select
                                        id="categoryId"
                                        name="categoryId"
                                        className="form-select"
                                        value={form.categoryId || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select category</option>
                                        {categories.map((category) => (
                                            <option key={category.id} value={category.id}>
                                                {category.name}
                                            </option>
                                        ))}
                                        <option value="__new__">+ Add new category…</option>
                                    </select>
                                    {showNewCategory && (
                                        <div className="input-group mt-2">
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder="New category name"
                                                value={newCategoryName}
                                                onChange={(e) => setNewCategoryName(e.target.value)}
                                            />
                                            <button type="button" className="btn btn-primary" onClick={createCategory}>
                                                Save
                                            </button>
                                            <button
                                                type="button"
                                                className="btn btn-label-secondary"
                                                onClick={() => { setShowNewCategory(false); setNewCategoryName(""); }}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Start Date & Deadline - side by side */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="startDate">Start Date</label>
                                    <input
                                        type="date"
                                        id="startDate"
                                        name="startDate"
                                        className="form-control"
                                        value={form.startDate}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="deadline">Deadline</label>
                                    <input
                                        type="date"
                                        id="deadline"
                                        name="deadline"
                                        className="form-control"
                                        value={form.deadline}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Budget + Estimated Hours */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="budget">Project Budget</label>
                                    <div className="input-group">
                                        <span className="input-group-text">৳</span>
                                        <input
                                            type="number"
                                            id="budget"
                                            name="budget"
                                            className="form-control"
                                            min="0"
                                            value={form.budget}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="estimatedHours">Estimated Hours</label>
                                    <input
                                        type="number"
                                        id="estimatedHours"
                                        name="estimatedHours"
                                        className="form-control"
                                        min="0"
                                        value={form.estimatedHours}
                                        onChange={handleChange}
                                    />
                                </div>

                                {/* Priority + Status */}
                                <div className="col-12 col-md-6">
                                    <label className="form-label" htmlFor="priority">Project Priority</label>
                                    <select
                                        id="priority"
                                        name="priority"
                                        className="form-select"
                                        value={form.priority}
                                        onChange={handleChange}
                                    >
                                        {projectPriorities.map((priority) => (
                                            <option key={priority} value={priority}>{priority}</option>
                                        ))}
                                    </select>
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
                                        <option value="Pending">Pending</option>
                                        <option value="Active">Active</option>
                                        <option value="Scheduled">Scheduled</option>
                                        <option value="On Hold">On Hold</option>
                                        <option value="Completed">Completed</option>
                                    </select>
                                </div>

                                {/* Project Manager / Lead */}
                                <div className="col-12">
                                    <label className="form-label" htmlFor="managerId">Project Manager / Lead</label>
                                    <select
                                        id="managerId"
                                        name="managerId"
                                        className="form-select"
                                        value={form.managerId || ""}
                                        onChange={handleChange}
                                    >
                                        <option value="" disabled>Select project manager</option>
                                        {members.map((member) => (
                                            <option key={member.id} value={member.id}>
                                                {member.name} — {member.role}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Team Members - multi-select checkbox list */}
                                <div className="col-12">
                                    <label className="form-label d-block">Team Members</label>
                                    <div className="row g-2 border rounded p-3">
                                        {members.map((member) => {
                                            const checked = selectedMembers.some((m) => m.id === member.id);
                                            return (
                                                <div className="col-12 col-md-6" key={member.id}>
                                                    <div className="form-check">
                                                        <input
                                                            type="checkbox"
                                                            className="form-check-input"
                                                            id={`member-${member.id}`}
                                                            checked={checked}
                                                            onChange={() => toggleMember(member)}
                                                        />
                                                        <label className="form-check-label" htmlFor={`member-${member.id}`}>
                                                            {member.name} <span className="text-body-secondary">({member.role})</span>
                                                        </label>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                        {members.length === 0 && (
                                            <p className="text-body-secondary mb-0">No members available yet.</p>
                                        )}
                                    </div>
                                </div>

                                {/* Project Brief / Attachments - dropzone */}
                                <div className="col-12">
                                    <label className="form-label d-block">Project Brief / Attachments</label>
                                    {form.attachmentName && !attachment && (
                                        <div className="d-flex align-items-center border rounded p-2 mb-2">
                                            <i className="icon-base ti tabler-paperclip me-1"></i>
                                            <span>Current file: {form.attachmentName}</span>
                                        </div>
                                    )}
                                    <div
                                        className="border rounded text-center p-4"
                                        style={{
                                            borderStyle: "dashed",
                                            borderWidth: "2px",
                                            cursor: "pointer",
                                            backgroundColor: isDragging ? "rgba(105,108,255,0.06)" : "transparent",
                                        }}
                                        onClick={() => fileInputRef.current?.click()}
                                        onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                                        onDragLeave={() => setIsDragging(false)}
                                        onDrop={handleDrop}
                                    >
                                        <i className="icon-base ti tabler-cloud-upload icon-lg text-body-secondary mb-2"></i>
                                        <p className="mb-1">Drag & drop a file here, or click to browse</p>
                                        <small className="text-body-secondary">Replace the current file (if any)</small>
                                        <input
                                            ref={fileInputRef}
                                            type="file"
                                            className="d-none"
                                            onChange={(e) => handleFileSelect(e.target.files?.[0])}
                                        />
                                    </div>
                                    {attachment && (
                                        <div className="d-flex align-items-center justify-content-between border rounded p-2 mt-2">
                                            <span>
                                                <i className="icon-base ti tabler-paperclip me-1"></i>
                                                {attachment.name}
                                            </span>
                                            <button
                                                type="button"
                                                className="btn btn-sm btn-text-danger"
                                                onClick={() => setAttachment(null)}
                                            >
                                                <i className="icon-base ti tabler-x"></i>
                                            </button>
                                        </div>
                                    )}
                                </div>

                                <div className="col-12 d-flex flex-wrap justify-content-end gap-2 mt-2">
                                    <Link to="/project" className="btn btn-label-secondary">
                                        Cancel
                                    </Link>
                                    <button type="button" className="btn btn-primary" onClick={handleSubmit}>
                                        Update Project
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
export default ProjectEdit
