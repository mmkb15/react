# API Endpoints Reference

This lists every API call the React app makes (`src/views/pages/**`), so the
PHP backend can be built to match exactly — no guessing field names.

Base URL comes from `src/config.ts` (`API_BASE_URL`). All request/response
bodies are JSON, except Project create/update which use `multipart/form-data`
because of the file attachment.

---

## Categories

| Method | Endpoint             | Used in                          |
|--------|-----------------------|-----------------------------------|
| GET    | `/categories`          | CategoryManage, dropdowns          |
| GET    | `/categories/:id`      | CategoryEdit                       |
| POST   | `/categories`          | CategoryCreate, inline add-category on Project form |
| PUT    | `/categories/:id`      | CategoryEdit                       |
| DELETE | `/categories/:id`      | CategoryManage                     |

**Body (POST/PUT):**
```json
{ "name": "Web Development", "description": "Websites and web apps." }
```

---

## Members

| Method | Endpoint          | Used in                              |
|--------|-------------------|----------------------------------------|
| GET    | `/members`         | MemberManage, dropdowns (manager, assignee) |
| GET    | `/members/:id`      | MemberEdit, MemberDetails             |
| POST   | `/members`          | MemberCreate                          |
| PUT    | `/members/:id`      | MemberEdit                            |
| DELETE | `/members/:id`      | MemberManage                          |

**Body (POST/PUT):**
```json
{ "name": "Lilian Fuller", "email": "lilian@example.com", "role": "Frontend Developer", "status": "Active" }
```

---

## Projects

| Method | Endpoint          | Used in                          |
|--------|-------------------|-----------------------------------|
| GET    | `/projects`         | ProjectManage, dashboards, dropdowns |
| GET    | `/projects/:id`      | ProjectEdit, ProjectDetails, PhaseCreate |
| POST   | `/projects`          | ProjectCreate (multipart/form-data) |
| PUT    | `/projects/:id`      | ProjectEdit (multipart/form-data)   |
| DELETE | `/projects/:id`      | ProjectManage                      |

**Form fields sent (POST/PUT, multipart):**
`name, description, client, categoryId, status, startDate, deadline, budget,
estimatedHours, priority, managerId, members (JSON string of member ids),
attachment (file, optional)`

**Expected JSON response shape (GET):**
```json
{
  "id": 1,
  "name": "Angular Project",
  "description": "...",
  "client": "Albert Cook",
  "categoryId": 1,
  "categoryName": "Web Development",
  "icon": "tabler-brand-angular",
  "iconColor": "danger",
  "status": "Active",
  "startDate": "2026-06-01",
  "deadline": "2026-09-30",
  "budget": 400000,
  "estimatedHours": 480,
  "priority": "High",
  "managerId": 4,
  "managerName": "Albert Cook",
  "members": [{ "id": 1, "name": "Lilian Fuller", "avatar": "5.png" }],
  "attachmentName": null,
  "totalTasks": 5,
  "completedTasks": 1
}
```

---

## Phases (nested under a Project)

| Method | Endpoint                  | Used in                    |
|--------|-----------------------------|-------------------------------|
| GET    | `/phases?projectId=:id`      | ProjectDetails (list of phases) |
| GET    | `/phases`                    | Reports, CalendarView, Dashboard (all phases) |
| GET    | `/phases/:id`                 | PhaseEdit, PhaseDetails, TaskCreate |
| POST   | `/phases`                     | PhaseCreate                   |
| PUT    | `/phases/:id`                 | PhaseEdit                     |

**Body (POST/PUT):**
```json
{
  "projectId": 1,
  "projectName": "Angular Project",
  "name": "Development",
  "status": "In Progress",
  "expectedStartDate": "2026-06-13",
  "expectedEndDate": "2026-08-15",
  "actualStartDate": "2026-06-15",
  "actualEndDate": "",
  "budgetCost": 250000,
  "actualCost": 140000,
  "description": "Core module development."
}
```

> Note: `GET /phases?projectId=:id` and plain `GET /phases` are the same
> endpoint — filter by the `projectId` query parameter when it is present.

---

## Tasks (nested under a Phase)

| Method | Endpoint                | Used in                          |
|--------|---------------------------|-------------------------------------|
| GET    | `/tasks?phaseId=:id`       | PhaseDetails (list of tasks)         |
| GET    | `/tasks`                   | TaskManage, TaskBoard, Reports, CalendarView, Dashboard (all tasks) |
| GET    | `/tasks/:id`                | TaskEdit, TaskDetails                |
| POST   | `/tasks`                    | TaskCreate                           |
| PUT    | `/tasks/:id`                 | TaskEdit, TaskBoard (drag/move between columns) |
| DELETE | `/tasks/:id`                 | TaskManage                           |

**Body (POST/PUT):**
```json
{
  "phaseId": 2,
  "phaseName": "Development",
  "projectId": 1,
  "projectName": "Angular Project",
  "title": "Fix responsive layout issues",
  "status": "To Do",
  "priority": "Low",
  "dueDate": "2026-09-10",
  "description": "Resolve overflow issues on tablet breakpoint.",
  "assignee": { "name": "Lilian Fuller", "avatar": "5.png" }
}
```

> Note: same pattern as Phases — `GET /tasks?phaseId=:id` and plain
> `GET /tasks` are the same endpoint, filtered by query parameter.

---

## General conventions

- All dates are `YYYY-MM-DD` strings.
- All money fields (`budget`, `budgetCost`, `actualCost`) are plain numbers, no currency symbol.
- `id` fields are auto-increment integers; the frontend never sends an `id` on create.
- Successful create/update should return the saved record as JSON (or at least `{"success": true}` — the
  frontend re-fetches the list after most writes anyway).
- Successful delete should return HTTP 200.
