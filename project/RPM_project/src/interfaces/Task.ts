export interface TaskAssignee {
    name: string;
    avatar: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Review" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
    id?: number;
    title: string;
    phaseId: number;
    phaseName: string;
    projectId: number;
    projectName: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    description?: string;
    assignee: TaskAssignee | null;
}

export const defaultTask: Task = {
    title: "",
    phaseId: 0,
    phaseName: "",
    projectId: 0,
    projectName: "",
    status: "To Do",
    priority: "Medium",
    dueDate: "",
    description: "",
    assignee: null,
};

export const taskStatuses: TaskStatus[] = ["To Do", "In Progress", "Review", "Done"];

// Dummy data for Phase 1 (no backend yet)
export const dummyTasks: Task[] = [
    {
        id: 1,
        title: "Setup project repository",
        phaseId: 1,
        phaseName: "Planning",
        projectId: 1,
        projectName: "Angular Project",
        status: "Done",
        priority: "High",
        dueDate: "2026-07-01",
        description: "Initialize repo, branching strategy and CI pipeline.",
        assignee: { name: "Lilian Fuller", avatar: "5.png" },
    },
    {
        id: 2,
        title: "Design login & dashboard wireframes",
        phaseId: 3,
        phaseName: "Design",
        projectId: 2,
        projectName: "React Project",
        status: "In Progress",
        priority: "Medium",
        dueDate: "2026-08-20",
        description: "Low-fidelity wireframes for auth and dashboard pages.",
        assignee: { name: "Sophia Wilkerson", avatar: "6.png" },
    },
    {
        id: 3,
        title: "API integration for product listing",
        phaseId: 4,
        phaseName: "Planning",
        projectId: 3,
        projectName: "VueJs Project",
        status: "To Do",
        priority: "High",
        dueDate: "2026-09-05",
        description: "Connect product listing page with REST API.",
        assignee: { name: "Christina Parker", avatar: "7.png" },
    },
    {
        id: 4,
        title: "Write unit tests for auth module",
        phaseId: 2,
        phaseName: "Development",
        projectId: 1,
        projectName: "Angular Project",
        status: "Review",
        priority: "Medium",
        dueDate: "2026-08-28",
        description: "Cover login, register and token refresh flows.",
        assignee: { name: "Sophia Wilkerson", avatar: "6.png" },
    },
    {
        id: 5,
        title: "Fix responsive layout issues",
        phaseId: 2,
        phaseName: "Development",
        projectId: 1,
        projectName: "Angular Project",
        status: "To Do",
        priority: "Low",
        dueDate: "2026-09-10",
        description: "Resolve overflow issues on tablet breakpoint.",
        assignee: { name: "Lilian Fuller", avatar: "5.png" },
    },
    {
        id: 6,
        title: "Prepare release notes",
        phaseId: 3,
        phaseName: "Design",
        projectId: 2,
        projectName: "React Project",
        status: "Done",
        priority: "Low",
        dueDate: "2026-06-01",
        description: "Summarize changes for v1.0 release.",
        assignee: { name: "Christina Parker", avatar: "7.png" },
    },
];
