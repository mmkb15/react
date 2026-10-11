import { useState } from "react"
import { Link, useParams } from "react-router"
import {
    dummyProjects,
    costCategories,
    defaultPhases,
    getPhaseColor,
    getProjectHealth,
    type Project,
    type BudgetItem,
    type Expense,
    type Milestone,
} from "../../../interfaces/Project"
import ProjectHealthBadge from "../../../components/ui/ProjectHealthBadge"

const statusBadge: Record<Project["status"], string> = {
    Active: "primary",
    Completed: "success",
    Scheduled: "info",
    Pending: "warning",
    "On Hold": "secondary",
}

const priorityBadge: Record<Project["priority"], string> = {
    Low: "success",
    Medium: "warning",
    High: "danger",
}

// If the project's current phase isn't one of the default suggested phases
// (i.e. it's custom), slot it in right before "Closure" so the stepper still
// makes sense as a sequence.
const buildInitialSequence = (currentPhase: string): string[] => {
    if (defaultPhases.includes(currentPhase)) return [...defaultPhases];
    return [...defaultPhases.slice(0, -1), currentPhase, defaultPhases[defaultPhases.length - 1]];
}

const formatMoney = (value: number) => `৳${value.toLocaleString("en-US")}`;

function ProjectDetails() {

    const { id } = useParams();
    const project = dummyProjects.find((p) => String(p.id) === id);

    // Local state so Add Budget Item / Add Expense / Add Milestone actually work
    // on this page (same "no backend yet" pattern used across the app).
    const [budgetItems, setBudgetItems] = useState<BudgetItem[]>(project?.budgetItems ?? []);
    const [expenses, setExpenses] = useState<Expense[]>(project?.expenses ?? []);
    const [milestones, setMilestones] = useState<Milestone[]>(project?.milestones ?? []);

    const [budgetForm, setBudgetForm] = useState({ category: costCategories[0], description: "", amount: "" });
    const [expenseForm, setExpenseForm] = useState({ date: "", category: costCategories[0], amount: "", note: "" });
    const [milestoneForm, setMilestoneForm] = useState({ title: "", dueDate: "" });

    // Phase process: a sequence of phases for THIS project, plus which one is current.
    const [phaseSequence, setPhaseSequence] = useState<string[]>(() => buildInitialSequence(project?.phase ?? "Initiation"));
    const [currentPhase, setCurrentPhase] = useState<string>(project?.phase ?? "Initiation");
    const [newPhaseTitle, setNewPhaseTitle] = useState("");

    if (!project) {
        return (
            <div className="container-xxl flex-grow-1 container-p-y">
                <div className="card">
                    <div className="card-body text-center py-5">
                        <h5 className="mb-2">Project not found</h5>
                        <p className="text-body-secondary mb-4">This project may have been removed.</p>
                        <Link to="/project" className="btn btn-primary">Back to Projects</Link>
                    </div>
                </div>
            </div>
        );
    }

    const budgetTotal = budgetItems.reduce((sum, item) => sum + item.amount, 0);
    const actualTotal = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const budgetUsedPercent = budgetTotal ? Math.min(100, Math.round((actualTotal / budgetTotal) * 100)) : 0;
    const isOverBudget = actualTotal > budgetTotal;

    const progress = project.totalTasks
        ? Math.round((project.completedTasks / project.totalTasks) * 100)
        : 0;

    const completedMilestones = milestones.filter((m) => m.completed).length;

    // Add a planned budget line item (Planning phase activity)
    const handleAddBudgetItem = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = Number(budgetForm.amount);
        if (!budgetForm.description || !amount) return;
        const nextId = Math.max(0, ...budgetItems.map((b) => b.id)) + 1;
        setBudgetItems((prev) => [...prev, { id: nextId, category: budgetForm.category, description: budgetForm.description, amount }]);
        setBudgetForm({ category: costCategories[0], description: "", amount: "" });
    }

    // Log a real expense (Execution phase activity)
    const handleAddExpense = (e: React.FormEvent) => {
        e.preventDefault();
        const amount = Number(expenseForm.amount);
        if (!expenseForm.date || !amount) return;
        const nextId = Math.max(0, ...expenses.map((ex) => ex.id)) + 1;
        setExpenses((prev) => [...prev, { id: nextId, date: expenseForm.date, category: expenseForm.category, amount, note: expenseForm.note }]);
        setExpenseForm({ date: "", category: costCategories[0], amount: "", note: "" });
    }

    const handleAddMilestone = (e: React.FormEvent) => {
        e.preventDefault();
        if (!milestoneForm.title) return;
        const nextId = Math.max(0, ...milestones.map((m) => m.id)) + 1;
        setMilestones((prev) => [...prev, { id: nextId, title: milestoneForm.title, dueDate: milestoneForm.dueDate, completed: false }]);
        setMilestoneForm({ title: "", dueDate: "" });
    }

    const toggleMilestone = (mid: number) => {
        setMilestones((prev) => prev.map((m) => (m.id === mid ? { ...m, completed: !m.completed } : m)));
    }

    const currentPhaseIndex = phaseSequence.indexOf(currentPhase);

    const moveToNextPhase = () => {
        if (currentPhaseIndex < phaseSequence.length - 1) {
            setCurrentPhase(phaseSequence[currentPhaseIndex + 1]);
        }
    }

    const moveToPreviousPhase = () => {
        if (currentPhaseIndex > 0) {
            setCurrentPhase(phaseSequence[currentPhaseIndex - 1]);
        }
    }

    // Inserts a brand-new phase right after the current one in the sequence —
    // this is how a project can have extra custom phases (e.g. "Client Review")
    // beyond the default Initiation → Planning → Execution → ... flow.
    const handleAddPhase = (e: React.FormEvent) => {
        e.preventDefault();
        const title = newPhaseTitle.trim();
        if (!title || phaseSequence.includes(title)) return;
        setPhaseSequence((prev) => {
            const next = [...prev];
            next.splice(currentPhaseIndex + 1, 0, title);
            return next;
        });
        setNewPhaseTitle("");
    }

    return (
        <>
            <div className="container-xxl flex-grow-1 container-p-y">

                <div className="d-flex justify-content-between align-items-center mb-4">
                    <div className="d-flex align-items-center">
                        <i className={`icon-base ti ${project.icon} icon-lg text-${project.iconColor} me-3`}></i>
                        <div>
                            <h4 className="mb-1">{project.name}</h4>
                            <p className="mb-0 text-body-secondary">Client: {project.client}</p>
                        </div>
                    </div>
                    <Link to="/project" className="btn btn-label-secondary">
                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                        Back to Projects
                    </Link>
                </div>

                <div className="row g-4">
                    {/* Left column */}
                    <div className="col-12 col-lg-8">

                        {/* Overview */}
                        <div className="card mb-4">
                            <h5 className="card-header">Overview</h5>
                            <div className="card-body">
                                <p className="mb-4">{project.description || "No description added yet."}</p>
                                <div className="row g-4">
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Category</p>
                                        <p className="fw-medium mb-0">{project.category}</p>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Project Manager</p>
                                        <p className="fw-medium mb-0">{project.projectManager || "—"}</p>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Phase</p>
                                        <span className={`badge bg-label-${getPhaseColor(currentPhase)}`}>{currentPhase}</span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Health</p>
                                        <ProjectHealthBadge health={getProjectHealth(project)} />
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Status</p>
                                        <span className={`badge bg-label-${statusBadge[project.status]}`}>{project.status}</span>
                                    </div>
                                    <div className="col-6 col-md-3">
                                        <p className="text-body-secondary mb-1">Priority</p>
                                        <span className={`badge bg-label-${priorityBadge[project.priority]}`}>{project.priority}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="card mb-4">
                            <h5 className="card-header">Timeline</h5>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-borderless m-0">
                                        <thead>
                                            <tr>
                                                <th></th>
                                                <th>Expected</th>
                                                <th>Actual</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="text-body-secondary">Start Date</td>
                                                <td className="fw-medium">{project.expectedStartDate || "—"}</td>
                                                <td>{project.actualStartDate || <span className="badge bg-label-secondary">Not started</span>}</td>
                                            </tr>
                                            <tr>
                                                <td className="text-body-secondary">End Date</td>
                                                <td className="fw-medium">{project.expectedEndDate || "—"}</td>
                                                <td>{project.actualEndDate || <span className="badge bg-label-secondary">Not finished</span>}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>

                        {/* Phase Process — visual stepper + advance/rewind + add custom phase */}
                        <div className="card mb-4">
                            <h5 className="card-header">Phase Process</h5>
                            <div className="card-body">
                                <div className="d-flex flex-wrap align-items-start mb-4">
                                    {phaseSequence.map((phase, index) => {
                                        const isDone = index < currentPhaseIndex;
                                        const isCurrent = index === currentPhaseIndex;
                                        return (
                                            <div key={phase} className="d-flex align-items-start" style={{ minWidth: "120px" }}>
                                                <div className="d-flex flex-column align-items-center text-center" style={{ width: "120px" }}>
                                                    <span
                                                        className={`avatar avatar-sm mb-2 ${isCurrent ? "" : ""}`}
                                                    >
                                                        <span
                                                            className={`avatar-initial rounded-circle ${
                                                                isDone
                                                                    ? "bg-success"
                                                                    : isCurrent
                                                                        ? `bg-${getPhaseColor(phase)}`
                                                                        : "bg-label-secondary"
                                                            }`}
                                                        >
                                                            {isDone ? (
                                                                <i className="icon-base ti tabler-check text-white"></i>
                                                            ) : (
                                                                index + 1
                                                            )}
                                                        </span>
                                                    </span>
                                                    <small className={isCurrent ? "fw-medium text-heading" : "text-body-secondary"}>
                                                        {phase}
                                                    </small>
                                                </div>
                                                {index < phaseSequence.length - 1 && (
                                                    <div
                                                        className={`mt-3 ${isDone ? "border-success" : "border-secondary"}`}
                                                        style={{ borderTopWidth: "2px", borderTopStyle: "solid", width: "40px" }}
                                                    ></div>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>

                                <div className="d-flex flex-wrap gap-2 mb-4">
                                    <button
                                        type="button"
                                        className="btn btn-label-secondary btn-sm"
                                        onClick={moveToPreviousPhase}
                                        disabled={currentPhaseIndex <= 0}
                                    >
                                        <i className="icon-base ti tabler-arrow-left me-1"></i>
                                        Move Back
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-primary btn-sm"
                                        onClick={moveToNextPhase}
                                        disabled={currentPhaseIndex >= phaseSequence.length - 1}
                                    >
                                        Move to Next Phase
                                        <i className="icon-base ti tabler-arrow-right ms-1"></i>
                                    </button>
                                </div>

                                <form className="row g-2 align-items-end" onSubmit={handleAddPhase}>
                                    <div className="col-8 col-md-9">
                                        <label className="form-label small mb-1">Add New Phase (inserted right after the current phase)</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="e.g. Client Review"
                                            value={newPhaseTitle}
                                            onChange={(e) => setNewPhaseTitle(e.target.value)}
                                        />
                                    </div>
                                    <div className="col-4 col-md-3">
                                        <button type="submit" className="btn btn-sm btn-label-primary w-100">
                                            <i className="icon-base ti tabler-plus me-1"></i> Add Phase
                                        </button>
                                    </div>
                                </form>
                                <p className="text-body-secondary small mb-0 mt-3">
                                    Phase changes here are local to this session, same as the rest of this app — once the
                                    backend is connected, moving phases will be saved permanently.
                                </p>
                            </div>
                        </div>

                        {/* Milestones */}
                        <div className="card mb-4">
                            <h5 className="card-header d-flex justify-content-between align-items-center">
                                <span>Milestones</span>
                                <span className="badge bg-label-secondary">{completedMilestones} / {milestones.length} done</span>
                            </h5>
                            <div className="card-body">
                                <ul className="list-group list-group-flush mb-4">
                                    {milestones.map((milestone) => (
                                        <li key={milestone.id} className="list-group-item d-flex align-items-center px-0">
                                            <div className="form-check me-2">
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    checked={milestone.completed}
                                                    onChange={() => toggleMilestone(milestone.id)}
                                                    id={`milestone-${milestone.id}`}
                                                />
                                            </div>
                                            <label htmlFor={`milestone-${milestone.id}`} className="flex-grow-1 mb-0" style={milestone.completed ? { textDecoration: "line-through" } : undefined}>
                                                {milestone.title}
                                            </label>
                                            <small className="text-body-secondary">{milestone.dueDate || "—"}</small>
                                        </li>
                                    ))}
                                    {milestones.length === 0 && (
                                        <li className="list-group-item px-0 text-body-secondary">No milestones added yet.</li>
                                    )}
                                </ul>
                                <form className="row g-2 align-items-end" onSubmit={handleAddMilestone}>
                                    <div className="col-12 col-md-6">
                                        <label className="form-label small mb-1">Milestone Title</label>
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="e.g. UAT sign-off"
                                            value={milestoneForm.title}
                                            onChange={(e) => setMilestoneForm((prev) => ({ ...prev, title: e.target.value }))}
                                        />
                                    </div>
                                    <div className="col-8 col-md-4">
                                        <label className="form-label small mb-1">Due Date</label>
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={milestoneForm.dueDate}
                                            onChange={(e) => setMilestoneForm((prev) => ({ ...prev, dueDate: e.target.value }))}
                                        />
                                    </div>
                                    <div className="col-4 col-md-2">
                                        <button type="submit" className="btn btn-sm btn-primary w-100">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>

                        {/* Task progress */}
                        <div className="card">
                            <h5 className="card-header">Task Progress</h5>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-2">
                                    <span>Overall completion</span>
                                    <span className="fw-medium">{progress}%</span>
                                </div>
                                <div className="progress" style={{ height: "8px" }}>
                                    <div className="progress-bar" role="progressbar" style={{ width: `${progress}%` }} aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}></div>
                                </div>
                                <p className="text-body-secondary mt-3 mb-0">
                                    Detailed task board (Kanban / List) is available from the Tasks menu.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Right column: Budget + Expenses + Team */}
                    <div className="col-12 col-lg-4">

                        {/* Budget summary */}
                        <div className="card mb-4">
                            <h5 className="card-header">Budget Summary</h5>
                            <div className="card-body">
                                <div className="d-flex justify-content-between mb-1">
                                    <span className="text-body-secondary">Total Budget</span>
                                    <span className="fw-medium">{formatMoney(budgetTotal)}</span>
                                </div>
                                <div className="d-flex justify-content-between mb-2">
                                    <span className="text-body-secondary">Actual Cost</span>
                                    <span className={`fw-medium ${isOverBudget ? "text-danger" : ""}`}>{formatMoney(actualTotal)}</span>
                                </div>
                                <div className="progress mb-2" style={{ height: "8px" }}>
                                    <div
                                        className={`progress-bar ${isOverBudget ? "bg-danger" : "bg-success"}`}
                                        role="progressbar"
                                        style={{ width: `${budgetUsedPercent}%` }}
                                        aria-valuenow={budgetUsedPercent}
                                        aria-valuemin={0}
                                        aria-valuemax={100}
                                    ></div>
                                </div>
                                {isOverBudget ? (
                                    <p className="text-danger mb-0">
                                        <i className="icon-base ti tabler-alert-triangle me-1"></i>
                                        Over budget by {formatMoney(actualTotal - budgetTotal)}
                                    </p>
                                ) : (
                                    <p className="text-body-secondary mb-0">
                                        {formatMoney(budgetTotal - actualTotal)} remaining ({budgetUsedPercent}% used)
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Budget breakdown (planned line items) */}
                        <div className="card mb-4">
                            <h5 className="card-header">Budget Breakdown</h5>
                            <div className="card-body">
                                <ul className="list-group list-group-flush mb-3">
                                    {budgetItems.map((item) => (
                                        <li key={item.id} className="list-group-item px-0 d-flex justify-content-between">
                                            <div>
                                                <span className="badge bg-label-secondary me-2">{item.category}</span>
                                                <span>{item.description}</span>
                                            </div>
                                            <span className="fw-medium">{formatMoney(item.amount)}</span>
                                        </li>
                                    ))}
                                    {budgetItems.length === 0 && (
                                        <li className="list-group-item px-0 text-body-secondary">No budget items yet.</li>
                                    )}
                                </ul>
                                <form onSubmit={handleAddBudgetItem}>
                                    <div className="mb-2">
                                        <select
                                            className="form-select form-select-sm"
                                            value={budgetForm.category}
                                            onChange={(e) => setBudgetForm((prev) => ({ ...prev, category: e.target.value }))}
                                        >
                                            {costCategories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="Description"
                                            value={budgetForm.description}
                                            onChange={(e) => setBudgetForm((prev) => ({ ...prev, description: e.target.value }))}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            placeholder="Amount (৳)"
                                            min={0}
                                            value={budgetForm.amount}
                                            onChange={(e) => setBudgetForm((prev) => ({ ...prev, amount: e.target.value }))}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-label-primary w-100">
                                        <i className="icon-base ti tabler-plus me-1"></i> Add Budget Item
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Expense log (actual spending) */}
                        <div className="card mb-4">
                            <h5 className="card-header">Expense Log</h5>
                            <div className="card-body">
                                <ul className="list-group list-group-flush mb-3">
                                    {expenses.map((expense) => (
                                        <li key={expense.id} className="list-group-item px-0">
                                            <div className="d-flex justify-content-between">
                                                <span className="badge bg-label-secondary">{expense.category}</span>
                                                <span className="fw-medium">{formatMoney(expense.amount)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between mt-1">
                                                <small className="text-body-secondary">{expense.note || "—"}</small>
                                                <small className="text-body-secondary">{expense.date}</small>
                                            </div>
                                        </li>
                                    ))}
                                    {expenses.length === 0 && (
                                        <li className="list-group-item px-0 text-body-secondary">No expenses logged yet.</li>
                                    )}
                                </ul>
                                <form onSubmit={handleAddExpense}>
                                    <div className="mb-2">
                                        <input
                                            type="date"
                                            className="form-control form-control-sm"
                                            value={expenseForm.date}
                                            onChange={(e) => setExpenseForm((prev) => ({ ...prev, date: e.target.value }))}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <select
                                            className="form-select form-select-sm"
                                            value={expenseForm.category}
                                            onChange={(e) => setExpenseForm((prev) => ({ ...prev, category: e.target.value }))}
                                        >
                                            {costCategories.map((cat) => (
                                                <option key={cat} value={cat}>{cat}</option>
                                            ))}
                                        </select>
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="number"
                                            className="form-control form-control-sm"
                                            placeholder="Amount (৳)"
                                            min={0}
                                            value={expenseForm.amount}
                                            onChange={(e) => setExpenseForm((prev) => ({ ...prev, amount: e.target.value }))}
                                        />
                                    </div>
                                    <div className="mb-2">
                                        <input
                                            type="text"
                                            className="form-control form-control-sm"
                                            placeholder="Note (optional)"
                                            value={expenseForm.note}
                                            onChange={(e) => setExpenseForm((prev) => ({ ...prev, note: e.target.value }))}
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-sm btn-label-primary w-100">
                                        <i className="icon-base ti tabler-plus me-1"></i> Log Expense
                                    </button>
                                </form>
                            </div>
                        </div>

                        {/* Team */}
                        <div className="card">
                            <h5 className="card-header">Team Members</h5>
                            <ul className="list-group list-group-flush">
                                {project.members.map((member) => (
                                    <li key={member.name} className="list-group-item d-flex align-items-center">
                                        <div className="avatar avatar-sm me-3">
                                            <img src={`../../assets/img/avatars/${member.avatar}`} alt="Avatar" className="rounded-circle" />
                                        </div>
                                        <span>{member.name}</span>
                                    </li>
                                ))}
                                {project.members.length === 0 && (
                                    <li className="list-group-item text-body-secondary">No members assigned yet.</li>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default ProjectDetails
