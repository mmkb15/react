export interface TaskAssignee {
    name: string;
    avatar: string;
}

export type TaskStatus = "To Do" | "In Progress" | "Review" | "Done";
export type TaskPriority = "Low" | "Medium" | "High";

export interface Task {
    id?: number;
    title: string;
    projectId: number;
    projectName: string;
    status: TaskStatus;
    priority: TaskPriority;
    dueDate: string;
    description?: string;
    assignee: TaskAssignee | null;
}

// Turns "2026-09-05" into something human-friendly like "Sep 05 · 5 days left"
// or "Sep 05 · 3 days overdue" instead of showing the raw ISO date everywhere.
export const formatDueDate = (dueDate: string, status?: TaskStatus): { text: string; isOverdue: boolean } => {
    if (!dueDate) return { text: "—", isOverdue: false };

    const due = new Date(dueDate + "T00:00:00");
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.round((due.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    const label = due.toLocaleDateString("en-US", { month: "short", day: "2-digit" });

    // A finished task is never "overdue" — it's just done.
    if (status === "Done") return { text: label, isOverdue: false };

    if (diffDays < 0) return { text: `${label} · ${Math.abs(diffDays)} days overdue`, isOverdue: true };
    if (diffDays === 0) return { text: `${label} · Due today`, isOverdue: false };
    if (diffDays === 1) return { text: `${label} · 1 day left`, isOverdue: false };
    return { text: `${label} · ${diffDays} days left`, isOverdue: false };
}

export const defaultTask: Task = {
    title: "",
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
        projectId: 4,
        projectName: "Bootstrap Project",
        status: "To Do",
        priority: "Low",
        dueDate: "2026-09-10",
        description: "Resolve overflow issues on tablet breakpoint.",
        assignee: { name: "Lilian Fuller", avatar: "5.png" },
    },
    {
        id: 6,
        title: "Prepare release notes",
        projectId: 2,
        projectName: "React Project",
        status: "Done",
        priority: "Low",
        dueDate: "2026-06-01",
        description: "Summarize changes for v1.0 release.",
        assignee: { name: "Christina Parker", avatar: "7.png" },
    },
];
