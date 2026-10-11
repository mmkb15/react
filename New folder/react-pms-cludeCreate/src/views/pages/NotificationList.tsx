import { useState } from "react"
import { dummyNotifications, notificationIcon, type AppNotification } from "../../interfaces/Notification"

function NotificationList() {

    const [notifications, setNotifications] = useState<AppNotification[]>(dummyNotifications);

    const unreadCount = notifications.filter((n) => !n.read).length;

    const markAsRead = (id: number) => {
        setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
    }

    const markAllRead = () => {
        setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    }

    const removeNotification = (id: number) => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
    }

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="mb-1">Notifications</h4>
                    <p className="mb-0 text-body-secondary">
                        {unreadCount > 0 ? `You have ${unreadCount} unread notification(s).` : "You're all caught up."}
                    </p>
                </div>
                {unreadCount > 0 && (
                    <button type="button" className="btn btn-label-secondary" onClick={markAllRead}>
                        <i className="icon-base ti tabler-checks me-1"></i>
                        Mark all as read
                    </button>
                )}
            </div>

            <div className="card">
                <ul className="list-group list-group-flush">
                    {notifications.map((notification) => {
                        const meta = notificationIcon[notification.type];
                        return (
                            <li
                                key={notification.id}
                                className={`list-group-item d-flex align-items-start gap-3 ${!notification.read ? "bg-lighter" : ""}`}
                            >
                                {notification.avatar ? (
                                    <div className="avatar avatar-sm flex-shrink-0">
                                        <img
                                            src={`../../assets/img/avatars/${notification.avatar}`}
                                            alt="Avatar"
                                            className="rounded-circle"
                                        />
                                    </div>
                                ) : (
                                    <span className={`avatar avatar-sm flex-shrink-0`}>
                                        <span className={`avatar-initial rounded-circle bg-label-${meta.color}`}>
                                            <i className={`icon-base ti ${meta.icon}`}></i>
                                        </span>
                                    </span>
                                )}
                                <div className="flex-grow-1">
                                    <div className="d-flex justify-content-between">
                                        <p className="mb-0 fw-medium text-heading">{notification.title}</p>
                                        {!notification.read && <span className="badge badge-dot bg-primary"></span>}
                                    </div>
                                    <p className="mb-1 text-body-secondary">{notification.message}</p>
                                    <small className="text-body-secondary">{notification.time}</small>
                                </div>
                                <div className="d-flex flex-column gap-2">
                                    {!notification.read && (
                                        <button
                                            type="button"
                                            className="btn btn-icon btn-text-secondary"
                                            title="Mark as read"
                                            onClick={() => markAsRead(notification.id)}
                                        >
                                            <i className="icon-base ti tabler-check"></i>
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="btn btn-icon btn-text-secondary"
                                        title="Remove"
                                        onClick={() => removeNotification(notification.id)}
                                    >
                                        <i className="icon-base ti tabler-x"></i>
                                    </button>
                                </div>
                            </li>
                        );
                    })}
                    {notifications.length === 0 && (
                        <li className="list-group-item text-center py-5 text-body-secondary">
                            No notifications.
                        </li>
                    )}
                </ul>
            </div>
        </div>
    )
}
export default NotificationList
