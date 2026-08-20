export interface ProjectMember {
    id?: number;
    name: string;
    avatar: string;
}

export type ProjectPriority = "Low" | "Medium" | "High";

export interface Project {
    id?: number;
    name: string;
    description?: string;
    client: string;
    categoryId?: number;
    categoryName?: string;
    icon: string;
    iconColor: string;
    status: "Active" | "Completed" | "Scheduled" | "Pending" | "On Hold";
    startDate: string;
    deadline: string;
    budget: number;
    estimatedHours: number;
    priority: ProjectPriority;
    managerId?: number;
    managerName?: string;
    members: ProjectMember[];
    attachmentName?: string;
    totalTasks: number;
    completedTasks: number;
}

export const projectPriorities: ProjectPriority[] = ["Low", "Medium", "High"];

export const defaultProject: Project = {
    name: "",
    description: "",
    client: "",
    categoryId: 0,
    categoryName: "",
    icon: "tabler-briefcase",
    iconColor: "primary",
    status: "Pending",
    startDate: "",
    deadline: "",
    budget: 0,
    estimatedHours: 0,
    priority: "Medium",
    managerId: 0,
    managerName: "",
    members: [],
    attachmentName: "",
    totalTasks: 0,
    completedTasks: 0,
};

// Dummy data for Phase 1 (no backend yet)
export const dummyProjects: Project[] = [
    {
        id: 1,
        name: "Angular Project",
        description: "Internal admin dashboard rebuild using Angular 18 and NGRX.",
        client: "Albert Cook",
        categoryId: 1,
        categoryName: "Web Development",
        icon: "tabler-brand-angular",
        iconColor: "danger",
        status: "Active",
        startDate: "2026-06-01",
        deadline: "2026-09-15",
        budget: 500000,
        estimatedHours: 480,
        priority: "High",
        managerId: 4,
        managerName: "Albert Cook",
        members: [
            { id: 1, name: "Lilian Fuller", avatar: "5.png" },
            { id: 2, name: "Sophia Wilkerson", avatar: "6.png" },
            { id: 3, name: "Christina Parker", avatar: "7.png" },
        ],
        attachmentName: "",
        totalTasks: 24,
        completedTasks: 10,
    },
    {
        id: 2,
        name: "React Project",
        description: "Client-facing project management system built with React + TypeScript.",
        client: "Barry Hunter",
        categoryId: 1,
        categoryName: "Web Development",
        icon: "tabler-brand-react-native",
        iconColor: "info",
        status: "Completed",
        startDate: "2026-03-01",
        deadline: "2026-06-01",
        budget: 350000,
        estimatedHours: 320,
        priority: "Medium",
        managerId: 4,
        managerName: "Albert Cook",
        members: [
            { id: 1, name: "Lilian Fuller", avatar: "5.png" },
            { id: 2, name: "Sophia Wilkerson", avatar: "6.png" },
        ],
        attachmentName: "",
        totalTasks: 40,
        completedTasks: 40,
    },
    {
        id: 3,
        name: "VueJs Project",
        description: "E-commerce storefront migration to Vue 3 composition API.",
        client: "Trevor Baker",
        categoryId: 2,
        categoryName: "Mobile App",
        icon: "tabler-brand-vue",
        iconColor: "success",
        status: "Scheduled",
        startDate: "2026-11-20",
        deadline: "2026-11-20",
        budget: 200000,
        estimatedHours: 200,
        priority: "Low",
        managerId: 3,
        managerName: "Christina Parker",
        members: [
            { id: 3, name: "Christina Parker", avatar: "7.png" },
        ],
        attachmentName: "",
        totalTasks: 15,
        completedTasks: 0,
    },
    {
        id: 4,
        name: "Bootstrap Project",
        description: "Marketing site refresh using Bootstrap 5 utility classes.",
        client: "Jerry Milton",
        categoryId: 3,
        categoryName: "Marketing Campaign",
        icon: "tabler-brand-bootstrap",
        iconColor: "primary",
        status: "Pending",
        startDate: "2026-08-01",
        deadline: "2026-08-30",
        budget: 100000,
        estimatedHours: 96,
        priority: "Low",
        managerId: 1,
        managerName: "Lilian Fuller",
        members: [
            { id: 1, name: "Lilian Fuller", avatar: "5.png" },
            { id: 3, name: "Christina Parker", avatar: "7.png" },
        ],
        attachmentName: "",
        totalTasks: 8,
        completedTasks: 2,
    },
];
