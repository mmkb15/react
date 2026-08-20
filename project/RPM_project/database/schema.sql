-- =====================================================================
-- react-pms database schema
-- Matches the fields used by the React frontend (src/interfaces/*.ts)
-- so the PHP API can be built directly on top of this without guessing
-- field names or types.
-- =====================================================================

CREATE DATABASE IF NOT EXISTS react_pms_db
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE react_pms_db;

-- ---------------------------------------------------------------------
-- Categories  (interfaces/Category.ts)
-- ---------------------------------------------------------------------
CREATE TABLE categories (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(120) NOT NULL,
    description TEXT NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Members  (interfaces/Member.ts)
-- ---------------------------------------------------------------------
CREATE TABLE members (
    id             INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name           VARCHAR(150) NOT NULL,
    email          VARCHAR(150) NOT NULL UNIQUE,
    role           VARCHAR(120) NOT NULL,
    avatar         VARCHAR(255) DEFAULT '1.png',
    status         ENUM('Active', 'Inactive') NOT NULL DEFAULT 'Active',
    -- projects_count is a computed/denormalized value; keep it in sync
    -- in the API layer whenever a project's member list changes, or
    -- replace reads of it with a COUNT() query on project_members.
    projects_count INT UNSIGNED NOT NULL DEFAULT 0,
    created_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at     TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ---------------------------------------------------------------------
-- Projects  (interfaces/Project.ts)
-- ---------------------------------------------------------------------
CREATE TABLE projects (
    id               INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    name             VARCHAR(200) NOT NULL,
    description      TEXT NULL,
    client           VARCHAR(150) NOT NULL,
    category_id      INT UNSIGNED NULL,
    icon             VARCHAR(60) DEFAULT 'tabler-briefcase',
    icon_color       VARCHAR(30) DEFAULT 'primary',
    status           ENUM('Active', 'Completed', 'Scheduled', 'Pending', 'On Hold') NOT NULL DEFAULT 'Pending',
    start_date       DATE NULL,
    deadline         DATE NULL,
    budget           DECIMAL(14, 2) NOT NULL DEFAULT 0,
    estimated_hours   INT UNSIGNED NOT NULL DEFAULT 0,
    priority         ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    manager_id       INT UNSIGNED NULL,
    attachment_name  VARCHAR(255) NULL,
    attachment_path  VARCHAR(255) NULL,
    -- total_tasks / completed_tasks are denormalized progress counters.
    -- Recompute them in the API whenever a task under this project's
    -- phases is created, updated, or deleted (or replace with a
    -- COUNT()-based query at read time).
    total_tasks      INT UNSIGNED NOT NULL DEFAULT 0,
    completed_tasks  INT UNSIGNED NOT NULL DEFAULT 0,
    created_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at       TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL,
    FOREIGN KEY (manager_id)  REFERENCES members(id)    ON DELETE SET NULL
);

-- ---------------------------------------------------------------------
-- Project <-> Member  (many-to-many; interfaces/Project.ts -> members[])
-- ---------------------------------------------------------------------
CREATE TABLE project_members (
    project_id INT UNSIGNED NOT NULL,
    member_id  INT UNSIGNED NOT NULL,
    PRIMARY KEY (project_id, member_id),
    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
    FOREIGN KEY (member_id)  REFERENCES members(id)  ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- Phases  (interfaces/Phase.ts) — belongs to a Project
-- ---------------------------------------------------------------------
CREATE TABLE phases (
    id                  INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    project_id          INT UNSIGNED NOT NULL,
    name                VARCHAR(150) NOT NULL,
    status              ENUM('Not Started', 'In Progress', 'Completed', 'Delayed') NOT NULL DEFAULT 'Not Started',
    expected_start_date DATE NULL,
    expected_end_date   DATE NULL,
    actual_start_date   DATE NULL,
    actual_end_date     DATE NULL,
    budget_cost         DECIMAL(14, 2) NOT NULL DEFAULT 0,
    actual_cost         DECIMAL(14, 2) NOT NULL DEFAULT 0,
    description         TEXT NULL,
    created_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at          TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

-- ---------------------------------------------------------------------
-- Tasks  (interfaces/Task.ts) — belongs strictly to a Phase
-- ---------------------------------------------------------------------
CREATE TABLE tasks (
    id          INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    phase_id    INT UNSIGNED NOT NULL,
    title       VARCHAR(200) NOT NULL,
    status      ENUM('To Do', 'In Progress', 'Review', 'Done') NOT NULL DEFAULT 'To Do',
    priority    ENUM('Low', 'Medium', 'High') NOT NULL DEFAULT 'Medium',
    due_date    DATE NULL,
    description TEXT NULL,
    assignee_id INT UNSIGNED NULL,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

    FOREIGN KEY (phase_id)    REFERENCES phases(id)  ON DELETE CASCADE,
    FOREIGN KEY (assignee_id) REFERENCES members(id) ON DELETE SET NULL
);

-- ---------------------------------------------------------------------
-- Helpful indexes for the lookups the frontend does most often
-- (project details -> its phases, phase details -> its tasks, etc.)
-- ---------------------------------------------------------------------
CREATE INDEX idx_projects_category ON projects(category_id);
CREATE INDEX idx_projects_manager  ON projects(manager_id);
CREATE INDEX idx_phases_project    ON phases(project_id);
CREATE INDEX idx_tasks_phase       ON tasks(phase_id);
CREATE INDEX idx_tasks_assignee    ON tasks(assignee_id);

-- ---------------------------------------------------------------------
-- Sample seed data (matches the dummy data currently in the frontend,
-- so the UI shows familiar records the moment the API is connected)
-- ---------------------------------------------------------------------
INSERT INTO categories (name, description) VALUES
    ('Web Development', 'Websites, dashboards and web apps.'),
    ('Mobile App', 'Android and iOS applications.'),
    ('Marketing Campaign', 'Promotional and branding campaigns.'),
    ('Research', 'R&D and feasibility studies.');

INSERT INTO members (name, email, role, avatar, status, projects_count) VALUES
    ('Lilian Fuller', 'lilian.fuller@example.com', 'Frontend Developer', '5.png', 'Active', 2),
    ('Sophia Wilkerson', 'sophia.wilkerson@example.com', 'UI/UX Designer', '6.png', 'Active', 3),
    ('Christina Parker', 'christina.parker@example.com', 'Backend Developer', '7.png', 'Active', 2),
    ('Albert Cook', 'albert.cook@example.com', 'Project Manager', '8.png', 'Inactive', 1);

INSERT INTO projects (name, description, client, category_id, icon, icon_color, status, start_date, deadline, budget, estimated_hours, priority, manager_id, total_tasks, completed_tasks) VALUES
    ('Angular Project', 'Internal admin dashboard rebuild.', 'Albert Cook', 1, 'tabler-brand-angular', 'danger', 'Active', '2026-06-01', '2026-09-30', 400000, 480, 'High', 4, 5, 1),
    ('React Project', 'Customer-facing storefront.', 'Barry Hunter', 1, 'tabler-brand-react-native', 'info', 'Active', '2026-04-01', '2026-08-31', 250000, 320, 'Medium', 4, 3, 1);

INSERT INTO project_members (project_id, member_id) VALUES
    (1, 1), (1, 3),
    (2, 2), (2, 3);

INSERT INTO phases (project_id, name, status, expected_start_date, expected_end_date, actual_start_date, actual_end_date, budget_cost, actual_cost, description) VALUES
    (1, 'Planning', 'Completed', '2026-06-01', '2026-06-10', '2026-06-01', '2026-06-12', 50000, 52000, 'Requirement gathering and technical planning.'),
    (1, 'Development', 'In Progress', '2026-06-13', '2026-08-15', '2026-06-15', NULL, 250000, 140000, 'Core module development.'),
    (2, 'Design', 'Completed', '2026-04-01', '2026-04-15', '2026-04-01', '2026-04-14', 60000, 58000, 'UI/UX design and wireframes.');

INSERT INTO tasks (phase_id, title, status, priority, due_date, description, assignee_id) VALUES
    (1, 'Setup project repository', 'Done', 'High', '2026-07-01', 'Initialize repo, branching strategy and CI pipeline.', 1),
    (2, 'Write unit tests for auth module', 'Review', 'Medium', '2026-08-28', 'Cover login, register and token refresh flows.', 2),
    (2, 'Fix responsive layout issues', 'To Do', 'Low', '2026-09-10', 'Resolve overflow issues on tablet breakpoint.', 1),
    (3, 'Design login & dashboard wireframes', 'In Progress', 'Medium', '2026-08-20', 'Low-fidelity wireframes for auth and dashboard pages.', 2),
    (3, 'Prepare release notes', 'Done', 'Low', '2026-06-01', 'Summarize changes for v1.0 release.', 3);
