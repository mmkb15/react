export interface Category {
    id?: number;
    name: string;
    description?: string;
}

export const defaultCategory: Category = {
    name: "",
    description: "",
};

// Dummy data for Phase 1 (no backend yet)
export const dummyCategories: Category[] = [
    { id: 1, name: "Web Development", description: "Websites, dashboards and web apps." },
    { id: 2, name: "Mobile App", description: "Android and iOS applications." },
    { id: 3, name: "Marketing Campaign", description: "Promotional and branding campaigns." },
    { id: 4, name: "Research", description: "R&D and feasibility studies." },
];
