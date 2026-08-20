export type PhaseStatus = "Not Started" | "In Progress" | "Completed" | "Delayed";

export interface Phase {
    id?: number;
    projectId: number;
    projectName: string;
    name: string;
    status: PhaseStatus;
    expectedStartDate: string;
    expectedEndDate: string;
    actualStartDate: string;
    actualEndDate: string;
    budgetCost: number;
    actualCost: number;
    description?: string;
}

export const defaultPhase: Phase = {
    projectId: 0,
    projectName: "",
    name: "",
    status: "Not Started",
    expectedStartDate: "",
    expectedEndDate: "",
    actualStartDate: "",
    actualEndDate: "",
    budgetCost: 0,
    actualCost: 0,
    description: "",
};

export const phaseStatuses: PhaseStatus[] = ["Not Started", "In Progress", "Completed", "Delayed"];

// Dummy data for Phase 1 (no backend yet)
export const dummyPhases: Phase[] = [
    {
        id: 1,
        projectId: 1,
        projectName: "Angular Project",
        name: "Planning",
        status: "Completed",
        expectedStartDate: "2026-06-01",
        expectedEndDate: "2026-06-10",
        actualStartDate: "2026-06-01",
        actualEndDate: "2026-06-12",
        budgetCost: 50000,
        actualCost: 52000,
        description: "Requirement gathering and technical planning.",
    },
    {
        id: 2,
        projectId: 1,
        projectName: "Angular Project",
        name: "Development",
        status: "In Progress",
        expectedStartDate: "2026-06-13",
        expectedEndDate: "2026-08-15",
        actualStartDate: "2026-06-15",
        actualEndDate: "",
        budgetCost: 250000,
        actualCost: 140000,
        description: "Core module development.",
    },
    {
        id: 3,
        projectId: 2,
        projectName: "React Project",
        name: "Design",
        status: "Completed",
        expectedStartDate: "2026-04-01",
        expectedEndDate: "2026-04-15",
        actualStartDate: "2026-04-01",
        actualEndDate: "2026-04-14",
        budgetCost: 60000,
        actualCost: 58000,
        description: "UI/UX design and wireframes.",
    },
    {
        id: 4,
        projectId: 3,
        projectName: "VueJs Project",
        name: "Planning",
        status: "Not Started",
        expectedStartDate: "2026-11-20",
        expectedEndDate: "2026-11-30",
        actualStartDate: "",
        actualEndDate: "",
        budgetCost: 40000,
        actualCost: 0,
        description: "Migration scope and timeline planning.",
    },
];
