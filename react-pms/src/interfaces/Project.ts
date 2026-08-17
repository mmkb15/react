export interface ProjectMember {
    name: string;
    avatar: string;
}

export interface Project {
    id?: number;
    name: string;
    client: string;
    icon: string;
    iconColor: string;
    status: "Active" | "Completed" | "Scheduled" | "Pending" | "On Hold";
    deadline: string;
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
    status: "Pending",
    deadline: "",
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
        status: "Active",
        deadline: "2026-09-15",
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
        status: "Completed",
        deadline: "2026-06-01",
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
        status: "Scheduled",
        deadline: "2026-11-20",
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
        status: "Pending",
        deadline: "2026-08-30",
        description: "Marketing site refresh using Bootstrap 5 utility classes.",
        members: [
            { name: "Lilian Fuller", avatar: "5.png" },
            { name: "Christina Parker", avatar: "7.png" },
        ],
        totalTasks: 8,
        completedTasks: 2,
    },
];
