export interface ProjectMember {
    name: string;
    avatar: string;
}

export type ProjectStatus = "Active" | "Completed" | "Scheduled" | "Pending" | "On Hold";
export type ProjectPriority = "Low" | "Medium" | "High";

// Phase is free-form text now (not a fixed union) so new/custom phases can be
// added from the UI. `defaultPhases` is just the suggested starting sequence.
export type ProjectPhase = string;

export const defaultPhases: string[] = [
    "Initiation",
    "Planning",
    "Execution",
    "Monitoring & Control",
    "Closure",
];

// Kept for backward compatibility with earlier code (same list as defaultPhases).
export const projectPhases: string[] = defaultPhases;

const phaseColors: Record<string, string> = {
    Initiation: "secondary",
    Planning: "info",
    Execution: "primary",
    "Monitoring & Control": "warning",
    Closure: "success",
};

// Any custom/unknown phase falls back to "dark" so it still renders a badge.
export const getPhaseColor = (phase: string) => phaseColors[phase] ?? "dark";

export const projectCategories = [
    "Web Development",
    "Mobile App",
    "Marketing",
    "Research & Development",
    "Infrastructure",
    "Design",
] as const;
export type ProjectCategory = typeof projectCategories[number];

// A budget line item — planned cost, added during the Planning phase.
// budgetCost for a project = sum of all its BudgetItem amounts.
export interface BudgetItem {
    id: number;
    category: string;
    description: string;
    amount: number;
}

// A real expense — logged as money actually gets spent, during Execution.
// actualCost for a project = sum of all its Expense amounts.
export interface Expense {
    id: number;
    date: string;
    category: string;
    amount: number;
    note: string;
}

// A key checkpoint/deliverable inside the project timeline.
export interface Milestone {
    id: number;
    title: string;
    dueDate: string;
    completed: boolean;
}

export const costCategories = [
    "Labor",
    "Software & Tools",
    "Marketing",
    "Equipment",
    "Travel",
    "Training",
    "Miscellaneous",
] as const;

export interface Project {
    id?: number;
    name: string;
    client: string;
    icon: string;
    iconColor: string;
    category: ProjectCategory;
    phase: ProjectPhase;
    status: ProjectStatus;
    priority: ProjectPriority;
    projectManager: string;

    // Planned (expected) timeline — set by the user at creation.
    expectedStartDate: string;
    expectedEndDate: string;

    // Actual timeline — system-managed, NOT entered manually at creation.
    // actualStartDate gets set automatically the first time status becomes
    // "Active"; actualEndDate gets set automatically when status becomes
    // "Completed". See setProjectStatus() below.
    actualStartDate: string;
    actualEndDate: string;

    // Budget/cost are NOT typed in as one number — they are built up from
    // line items and expense entries, and totalled with getBudgetTotal /
    // getActualCostTotal below. This mirrors how a real project tracks money.
    budgetItems: BudgetItem[];
    expenses: Expense[];

    milestones: Milestone[];

    description?: string;
    members: ProjectMember[];
    totalTasks: number;
    completedTasks: number;
}

// Sum helpers — always compute totals from the line items, never store a flat total.
export const getBudgetTotal = (project: Project) =>
    project.budgetItems.reduce((sum, item) => sum + item.amount, 0);

export const getActualCostTotal = (project: Project) =>
    project.expenses.reduce((sum, expense) => sum + expense.amount, 0);

// Updates a project's status AND automatically records the real-world dates
// that go along with that transition, so nobody has to type "actual start
// date" by hand. Call this instead of setting `status` directly.
export const setProjectStatus = (project: Project, status: ProjectStatus): Project => {
    const today = new Date().toISOString().slice(0, 10);
    const updated: Project = { ...project, status };
    if (status === "Active" && !updated.actualStartDate) {
        updated.actualStartDate = today;
    }
    if (status === "Completed" && !updated.actualEndDate) {
        updated.actualEndDate = today;
    }
    return updated;
};

export type ProjectHealth = "Healthy" | "At Risk" | "Critical";

// A simple, explainable heuristic — not a real predictive model. It looks at:
// overdue milestones, whether the expected deadline has passed, how much of
// the budget is used, and task progress for active projects.
export const getProjectHealth = (project: Project): ProjectHealth => {
    if (project.status === "Completed") return "Healthy";

    const today = new Date().toISOString().slice(0, 10);
    const overdueMilestones = project.milestones.filter(
        (m) => !m.completed && m.dueDate && m.dueDate < today
    ).length;
    const budget = getBudgetTotal(project);
    const actual = getActualCostTotal(project);
    const budgetUsedPercent = budget ? (actual / budget) * 100 : 0;
    const isPastDeadline = Boolean(project.expectedEndDate && project.expectedEndDate < today);
    const progress = project.totalTasks ? (project.completedTasks / project.totalTasks) * 100 : 0;

    if (isPastDeadline || overdueMilestones >= 2 || budgetUsedPercent > 100) {
        return "Critical";
    }
    if (overdueMilestones >= 1 || budgetUsedPercent > 85 || (project.status === "Active" && progress < 50)) {
        return "At Risk";
    }
    return "Healthy";
};

export const defaultProject: Project = {
    name: "",
    client: "",
    icon: "tabler-briefcase",
    iconColor: "primary",
    category: "Web Development",
    phase: "Initiation",
    status: "Pending",
    priority: "Medium",
    projectManager: "",
    expectedStartDate: "",
    expectedEndDate: "",
    actualStartDate: "",
    actualEndDate: "",
    budgetItems: [],
    expenses: [],
    milestones: [],
    description: "",
    members: [],
    totalTasks: 0,
    completedTasks: 0,
};

// Dummy data for Phase 1 (no backend yet)
export const dummyProjects: Project[] = [
    {
        id: 1,
        name: "Angular Project",
        client: "Albert Cook",
        icon: "tabler-brand-angular",
        iconColor: "danger",
        category: "Web Development",
        phase: "Execution",
        status: "Active",
        priority: "High",
        projectManager: "Albert Cook",
        expectedStartDate: "2026-06-01",
        expectedEndDate: "2026-09-15",
        actualStartDate: "2026-06-03",
        actualEndDate: "",
        budgetItems: [
            { id: 1, category: "Labor", description: "Developer & designer fees", amount: 320000 },
            { id: 2, category: "Software & Tools", description: "Licenses & subscriptions", amount: 50000 },
            { id: 3, category: "Miscellaneous", description: "Contingency (10%)", amount: 80000 },
        ],
        expenses: [
            { id: 1, date: "2026-06-05", category: "Software & Tools", amount: 45000, note: "Figma + Jetbrains annual license" },
            { id: 2, date: "2026-07-10", category: "Labor", amount: 150000, note: "Milestone 1 developer payment" },
            { id: 3, date: "2026-08-01", category: "Labor", amount: 15000, note: "Overtime for sprint 3" },
        ],
        milestones: [
            { id: 1, title: "Requirement sign-off", dueDate: "2026-06-10", completed: true },
            { id: 2, title: "UI design approved", dueDate: "2026-07-01", completed: true },
            { id: 3, title: "Beta release", dueDate: "2026-08-25", completed: false },
            { id: 4, title: "Final delivery", dueDate: "2026-09-15", completed: false },
        ],
        description: "Internal admin dashboard rebuild using Angular 18 and NGRX.",
        members: [
            { name: "Lilian Fuller", avatar: "5.png" },
            { name: "Sophia Wilkerson", avatar: "6.png" },
            { name: "Christina Parker", avatar: "7.png" },
        ],
        totalTasks: 24,
        completedTasks: 10,
    },
    {
        id: 2,
        name: "React Project",
        client: "Barry Hunter",
        icon: "tabler-brand-react-native",
        iconColor: "info",
        category: "Web Development",
        phase: "Closure",
        status: "Completed",
        priority: "Medium",
        projectManager: "Sophia Wilkerson",
        expectedStartDate: "2026-03-01",
        expectedEndDate: "2026-06-01",
        actualStartDate: "2026-03-01",
        actualEndDate: "2026-05-28",
        budgetItems: [
            { id: 1, category: "Labor", description: "Full-stack development", amount: 500000 },
            { id: 2, category: "Software & Tools", description: "Cloud hosting & CI/CD", amount: 60000 },
            { id: 3, category: "Miscellaneous", description: "Contingency", amount: 40000 },
        ],
        expenses: [
            { id: 1, date: "2026-03-15", category: "Software & Tools", amount: 30000, note: "AWS setup" },
            { id: 2, date: "2026-04-20", category: "Labor", amount: 400000, note: "Developer payments (2 installments)" },
            { id: 3, date: "2026-05-25", category: "Software & Tools", amount: 25000, note: "Final month hosting + domain" },
            { id: 4, date: "2026-05-27", category: "Miscellaneous", amount: 125000, note: "Client-requested extra revisions" },
        ],
        milestones: [
            { id: 1, title: "MVP release", dueDate: "2026-04-15", completed: true },
            { id: 2, title: "UAT sign-off", dueDate: "2026-05-20", completed: true },
            { id: 3, title: "Production launch", dueDate: "2026-05-28", completed: true },
        ],
        description: "Client-facing project management system built with React + TypeScript.",
        members: [
            { name: "Lilian Fuller", avatar: "5.png" },
            { name: "Sophia Wilkerson", avatar: "6.png" },
        ],
        totalTasks: 40,
        completedTasks: 40,
    },
    {
        id: 3,
        name: "VueJs Project",
        client: "Trevor Baker",
        icon: "tabler-brand-vue",
        iconColor: "success",
        category: "Web Development",
        phase: "Planning",
        status: "Scheduled",
        priority: "Medium",
        projectManager: "Christina Parker",
        expectedStartDate: "2026-09-20",
        expectedEndDate: "2026-11-20",
        actualStartDate: "",
        actualEndDate: "",
        budgetItems: [
            { id: 1, category: "Labor", description: "Frontend migration work", amount: 220000 },
            { id: 2, category: "Software & Tools", description: "Testing tools", amount: 30000 },
            { id: 3, category: "Miscellaneous", description: "Contingency", amount: 50000 },
        ],
        expenses: [],
        milestones: [
            { id: 1, title: "Migration plan approved", dueDate: "2026-09-25", completed: false },
            { id: 2, title: "Storefront pages migrated", dueDate: "2026-10-25", completed: false },
        ],
        description: "E-commerce storefront migration to Vue 3 composition API.",
        members: [
            { name: "Christina Parker", avatar: "7.png" },
        ],
        totalTasks: 15,
        completedTasks: 0,
    },
    {
        id: 4,
        name: "Bootstrap Project",
        client: "Jerry Milton",
        icon: "tabler-brand-bootstrap",
        iconColor: "primary",
        category: "Marketing",
        phase: "Initiation",
        status: "Pending",
        priority: "Low",
        projectManager: "Lilian Fuller",
        expectedStartDate: "2026-08-10",
        expectedEndDate: "2026-08-30",
        actualStartDate: "",
        actualEndDate: "",
        budgetItems: [
            { id: 1, category: "Labor", description: "Design & frontend fixes", amount: 90000 },
            { id: 2, category: "Miscellaneous", description: "Contingency", amount: 30000 },
        ],
        expenses: [
            { id: 1, date: "2026-08-05", category: "Labor", amount: 15000, note: "Initial design draft" },
        ],
        milestones: [
            { id: 1, title: "Kickoff meeting", dueDate: "2026-08-10", completed: true },
        ],
        description: "Marketing site refresh using Bootstrap 5 utility classes.",
        members: [
            { name: "Lilian Fuller", avatar: "5.png" },
            { name: "Christina Parker", avatar: "7.png" },
        ],
        totalTasks: 8,
        completedTasks: 2,
    },
];
