export interface Phase {
    id?: number;
    projectId: number;
    projectName: string;
    name: string;
    status: "Not Started" | "In Progress" | "Completed" | "Delayed";
    startDate: string;
    endDate: string;
    progress: number;
    description?: string;
}

export const defaultPhase: Phase = {
    projectId: 0,
    projectName: "",
    name: "",
    status: "Not Started",
    startDate: "",
    endDate: "",
    progress: 0,
    description: "",
};

export const phaseStatuses: Phase["status"][] = ["Not Started", "In Progress", "Completed", "Delayed"];

// Dummy data for Phase 1 (no backend yet)
export const dummyPhases: Phase[] = [
    {
        id: 1,
        projectId: 1,
        projectName: "Angular Project",
        name: "Requirement Analysis",
        status: "Completed",
        startDate: "2026-05-01",
        endDate: "2026-05-15",
        progress: 100,
        description: "Gather and finalize requirements from stakeholders.",
    },
    {
        id: 2,
        projectId: 1,
        projectName: "Angular Project",
        name: "UI/UX Design",
        status: "Completed",
        startDate: "2026-05-16",
        endDate: "2026-06-05",
        progress: 100,
        description: "Wireframes and high-fidelity design.",
    },
    {
        id: 3,
        projectId: 1,
        projectName: "Angular Project",
        name: "Development",
        status: "In Progress",
        startDate: "2026-06-06",
        endDate: "2026-09-01",
        progress: 55,
        description: "Core module development.",
    },
    {
        id: 4,
        projectId: 1,
        projectName: "Angular Project",
        name: "Testing",
        status: "Not Started",
        startDate: "2026-09-02",
        endDate: "2026-09-15",
        progress: 0,
        description: "QA and user acceptance testing.",
    },
    {
        id: 5,
        projectId: 2,
        projectName: "React Project",
        name: "Requirement Analysis",
        status: "Completed",
        startDate: "2026-03-01",
        endDate: "2026-03-10",
        progress: 100,
    },
    {
        id: 6,
        projectId: 2,
        projectName: "React Project",
        name: "Development",
        status: "Completed",
        startDate: "2026-03-11",
        endDate: "2026-05-20",
        progress: 100,
    },
    {
        id: 7,
        projectId: 2,
        projectName: "React Project",
        name: "Deployment",
        status: "Completed",
        startDate: "2026-05-21",
        endDate: "2026-06-01",
        progress: 100,
    },
    {
        id: 8,
        projectId: 3,
        projectName: "VueJs Project",
        name: "Requirement Analysis",
        status: "In Progress",
        startDate: "2026-08-01",
        endDate: "2026-08-20",
        progress: 40,
    },
    {
        id: 9,
        projectId: 4,
        projectName: "Bootstrap Project",
        name: "Design",
        status: "Delayed",
        startDate: "2026-07-01",
        endDate: "2026-07-20",
        progress: 20,
        description: "Waiting on brand assets from client.",
    },
];
