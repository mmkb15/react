export interface BudgetItem {
    id?: number;
    projectId: number;
    projectName: string;
    category: "Development" | "Design" | "Marketing" | "Infrastructure" | "Miscellaneous";
    allocated: number;
    spent: number;
    note?: string;
}

export const defaultBudgetItem: BudgetItem = {
    projectId: 0,
    projectName: "",
    category: "Development",
    allocated: 0,
    spent: 0,
    note: "",
};

export const budgetCategories: BudgetItem["category"][] = [
    "Development",
    "Design",
    "Marketing",
    "Infrastructure",
    "Miscellaneous",
];

// Dummy data for Phase 1 (no backend yet)
export const dummyBudgetItems: BudgetItem[] = [
    { id: 1, projectId: 1, projectName: "Angular Project", category: "Development", allocated: 500000, spent: 280000 },
    { id: 2, projectId: 1, projectName: "Angular Project", category: "Design", allocated: 80000, spent: 80000 },
    { id: 3, projectId: 1, projectName: "Angular Project", category: "Infrastructure", allocated: 60000, spent: 20000 },
    { id: 4, projectId: 2, projectName: "React Project", category: "Development", allocated: 400000, spent: 390000 },
    { id: 5, projectId: 2, projectName: "React Project", category: "Marketing", allocated: 50000, spent: 50000 },
    { id: 6, projectId: 3, projectName: "VueJs Project", category: "Development", allocated: 300000, spent: 40000 },
    { id: 7, projectId: 4, projectName: "Bootstrap Project", category: "Design", allocated: 70000, spent: 15000 },
    { id: 8, projectId: 4, projectName: "Bootstrap Project", category: "Miscellaneous", allocated: 20000, spent: 5000 },
];
