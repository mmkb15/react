export type NotificationType = "task" | "deadline" | "comment" | "project";

export interface AppNotification {
    id: number;
    type: NotificationType;
    title: string;
    message: string;
    time: string;
    read: boolean;
    avatar?: string;
}

export const notificationIcon: Record<NotificationType, { icon: string; color: string }> = {
    task: { icon: "tabler-checkbox", color: "success" },
    deadline: { icon: "tabler-clock-exclamation", color: "danger" },
    comment: { icon: "tabler-message-circle", color: "info" },
    project: { icon: "tabler-briefcase", color: "primary" },
};

// Dummy data for Phase 1 (no backend yet)
export const dummyNotifications: AppNotification[] = [
    {
        id: 1,
        type: "task",
        title: "Task assigned to you",
        message: "Sophia Wilkerson assigned you \"API integration for product listing\".",
        time: "2 hours ago",
        read: false,
        avatar: "6.png",
    },
    {
        id: 2,
        type: "deadline",
        title: "Deadline approaching",
        message: "\"Design login & dashboard wireframes\" is due in 2 days.",
        time: "5 hours ago",
        read: false,
    },
    {
        id: 3,
        type: "comment",
        title: "New comment",
        message: "Christina Parker commented on \"Fix responsive layout issues\".",
        time: "1 day ago",
        read: true,
        avatar: "7.png",
    },
    {
        id: 4,
        type: "project",
        title: "Project status updated",
        message: "\"React Project\" was marked as Completed.",
        time: "3 days ago",
        read: true,
    },
];
