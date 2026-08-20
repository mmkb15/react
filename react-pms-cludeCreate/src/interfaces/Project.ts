export interface ProjectMember {
    name: string;
    avatar: string;
}

export type ProjectStatus = "Active" | "Completed" | "Scheduled" | "Pending" | "On Hold";

// PMBOK-style project lifecycle phases
export type ProjectPhase = "Initiation" | "Planning" | "Execution" | "Monitoring & Control" | "Closure";

export const projectCategories = [
    "Web Development",
    "Mobile App",
    "Marketing",
    "Research & Development",
    "Infrastructure",
    "Design",
] as const;
export type ProjectCategory = typeof projectCategories[number];

export const projectPhases: ProjectPhase[] = [
    "Initiation",
    "Planning",
    "Execution",
    "Monitoring & Control",
    "Closure",
];

export interface Project {
    id?: number;
    name: string;
    client: string;
    icon: string;
    iconColor: string;
    category: ProjectCategory;
    phase: ProjectPhase;
    status: ProjectStatus;

    // Planned (expected) timeline
    expectedStartDate: string;
    expectedEndDate: string;

    // Actual timeline (filled in as the project really progresses)
    actualStartDate: string;
    actualEndDate: string;

    // Budget tracking
    budgetCost: number;
    actualCost: number;

    description?: string;
    members: ProjectMember[];
    totalTasks: number;
    completedTasks: number;
}

export const defaultProject: Project = {
    name: "",
    client: "",
    icon: "tabler-briefcase",
    iconColor: "primary",
    category: "Web Development",
    phase: "Initiation",
    status: "Pending",
    expectedStartDate: "",
    expectedEndDate: "",
    actualStartDate: "",
    actualEndDate: "",
    budgetCost: 0,
    actualCost: 0,
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
        expectedStartDate: "2026-06-01",
        expectedEndDate: "2026-09-15",
        actualStartDate: "2026-06-03",
        actualEndDate: "",
        budgetCost: 450000,
        actualCost: 210000,
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
        expectedStartDate: "2026-03-01",
        expectedEndDate: "2026-06-01",
        actualStartDate: "2026-03-01",
        actualEndDate: "2026-05-28",
        budgetCost: 600000,
        actualCost: 580000,
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
        expectedStartDate: "2026-09-20",
        expectedEndDate: "2026-11-20",
        actualStartDate: "",
        actualEndDate: "",
        budgetCost: 300000,
        actualCost: 0,
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
        expectedStartDate: "2026-08-10",
        expectedEndDate: "2026-08-30",
        actualStartDate: "",
        actualEndDate: "",
        budgetCost: 120000,
        actualCost: 15000,
        description: "Marketing site refresh using Bootstrap 5 utility classes.",
        members: [
            { name: "Lilian Fuller", avatar: "5.png" },
            { name: "Christina Parker", avatar: "7.png" },
        ],
        totalTasks: 8,
        completedTasks: 2,
    },
];
