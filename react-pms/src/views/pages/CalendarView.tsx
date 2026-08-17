import { useMemo, useState } from "react"
import { dummyTasks } from "../../interfaces/Task"
import { dummyProjects } from "../../interfaces/Project"

const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
];

interface DayEvent {
    label: string;
    color: string;
}

function CalendarView() {

    const [current, setCurrent] = useState(() => new Date());

    // Build a map of "YYYY-MM-DD" -> events, from dummy tasks (due dates) and projects (deadlines)
    const eventsByDate = useMemo(() => {
        const map: Record<string, DayEvent[]> = {};

        dummyTasks.forEach((task) => {
            if (!task.dueDate) return;
            if (!map[task.dueDate]) map[task.dueDate] = [];
            map[task.dueDate].push({ label: `Task: ${task.title}`, color: "info" });
        });

        dummyProjects.forEach((project) => {
            if (!project.deadline) return;
            if (!map[project.deadline]) map[project.deadline] = [];
            map[project.deadline].push({ label: `Deadline: ${project.name}`, color: "danger" });
        });

        return map;
    }, []);

    const year = current.getFullYear();
    const month = current.getMonth();

    const firstDayOfMonth = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    const cells: (number | null)[] = [
        ...Array(firstDayOfMonth).fill(null),
        ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];

    const changeMonth = (delta: number) => {
        setCurrent(new Date(year, month + delta, 1));
    }

    const formatKey = (day: number) => {
        const mm = String(month + 1).padStart(2, "0");
        const dd = String(day).padStart(2, "0");
        return `${year}-${mm}-${dd}`;
    }

    const today = new Date();
    const isToday = (day: number) =>
        day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

    return (
        <div className="container-xxl flex-grow-1 container-p-y">

            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h4 className="mb-1">Calendar</h4>
                    <p className="mb-0 text-body-secondary">Task due dates and project deadlines at a glance.</p>
                </div>
                <div className="d-flex align-items-center gap-2">
                    <button type="button" className="btn btn-icon btn-label-secondary" onClick={() => changeMonth(-1)}>
                        <i className="icon-base ti tabler-chevron-left"></i>
                    </button>
                    <h5 className="mb-0 mx-2">{monthNames[month]} {year}</h5>
                    <button type="button" className="btn btn-icon btn-label-secondary" onClick={() => changeMonth(1)}>
                        <i className="icon-base ti tabler-chevron-right"></i>
                    </button>
                </div>
            </div>

            <div className="card">
                <div className="table-responsive">
                    <table className="table table-bordered m-0">
                        <thead>
                            <tr>
                                {weekDays.map((day) => (
                                    <th key={day} className="text-center">{day}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {Array.from({ length: Math.ceil(cells.length / 7) }, (_, week) => (
                                <tr key={week}>
                                    {cells.slice(week * 7, week * 7 + 7).map((day, idx) => {
                                        const key = day ? formatKey(day) : null;
                                        const dayEvents = key ? eventsByDate[key] ?? [] : [];
                                        return (
                                            <td
                                                key={idx}
                                                className="align-top p-2"
                                                style={{ height: "100px", width: "14.28%" }}
                                            >
                                                {day && (
                                                    <>
                                                        <div
                                                            className={`fw-medium mb-1 ${isToday(day) ? "badge bg-primary rounded-circle" : ""}`}
                                                            style={isToday(day) ? { width: "24px", height: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center" } : undefined}
                                                        >
                                                            {day}
                                                        </div>
                                                        <div className="d-flex flex-column gap-1">
                                                            {dayEvents.map((event, i) => (
                                                                <span
                                                                    key={i}
                                                                    className={`badge bg-label-${event.color} text-truncate d-block text-start`}
                                                                    title={event.label}
                                                                >
                                                                    {event.label}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </>
                                                )}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
export default CalendarView
