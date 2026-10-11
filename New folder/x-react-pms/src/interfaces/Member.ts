export type MemberStatus = "Active" | "Inactive";

export interface Member {
    id?: number;
    name: string;
    email: string;
    role: string;
    avatar: string;
    status: MemberStatus;
    projectsCount: number;
}

export const defaultMember: Member = {
    name: "",
    email: "",
    role: "",
    avatar: "1.png",
    status: "Active",
    projectsCount: 0,
};

// Dummy data for Phase 1 (no backend yet)
export const dummyMembers: Member[] = [
    {
        id: 1,
        name: "Lilian Fuller",
        email: "lilian.fuller@example.com",
        role: "Frontend Developer",
        avatar: "5.png",
        status: "Active",
        projectsCount: 2,
    },
    {
        id: 2,
        name: "Sophia Wilkerson",
        email: "sophia.wilkerson@example.com",
        role: "UI/UX Designer",
        avatar: "6.png",
        status: "Active",
        projectsCount: 3,
    },
    {
        id: 3,
        name: "Christina Parker",
        email: "christina.parker@example.com",
        role: "Backend Developer",
        avatar: "7.png",
        status: "Active",
        projectsCount: 2,
    },
    {
        id: 4,
        name: "Albert Cook",
        email: "albert.cook@example.com",
        role: "Project Manager",
        avatar: "8.png",
        status: "Inactive",
        projectsCount: 1,
    },
];
