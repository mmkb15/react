import { createBrowserRouter } from "react-router";
import App from './App.tsx'
import Dashboard from "./views/pages/Dashboard.tsx";
import NotFound from "./views/pages/NotFound.tsx";
import Login from "./views/pages/auth/Login.tsx";
import Register from "./views/pages/auth/Register.tsx";

// Project module (Manage / Create / Edit / Details - teacher-er structure)
import ProjectManage from "./views/pages/project/ProjectManage.tsx";
import ProjectCreate from "./views/pages/project/ProjectCreate.tsx";
import ProjectEdit from "./views/pages/project/ProjectEdit.tsx";
import ProjectDetails from "./views/pages/project/ProjectDetails.tsx";

// Task module
import TaskManage from "./views/pages/task/TaskManage.tsx";
import TaskCreate from "./views/pages/task/TaskCreate.tsx";
import TaskEdit from "./views/pages/task/TaskEdit.tsx";
import TaskDetails from "./views/pages/task/TaskDetails.tsx";
import TaskBoard from "./views/pages/task/TaskBoard.tsx";

// Member module
import MemberManage from "./views/pages/member/MemberManage.tsx";
import MemberCreate from "./views/pages/member/MemberCreate.tsx";
import MemberEdit from "./views/pages/member/MemberEdit.tsx";
import MemberDetails from "./views/pages/member/MemberDetails.tsx";

import CalendarView from "./views/pages/CalendarView.tsx";
import NotificationList from "./views/pages/NotificationList.tsx";
import Reports from "./views/pages/Reports.tsx";
import Profile from "./views/pages/Profile.tsx";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {path: "/", element: <Dashboard />,},

        {path: "/project", element: <ProjectManage />,},
        {path: "/project-create", element: <ProjectCreate />,},
        {path: "/project-edit/:id", element: <ProjectEdit />,},
        {path: "/project-details/:id", element: <ProjectDetails />,},

        {path: "/task", element: <TaskManage />,},
        {path: "/task-create", element: <TaskCreate />,},
        {path: "/task-edit/:id", element: <TaskEdit />,},
        {path: "/task-details/:id", element: <TaskDetails />,},
        {path: "/task/board", element: <TaskBoard />,},

        {path: "/member", element: <MemberManage />,},
        {path: "/member-create", element: <MemberCreate />,},
        {path: "/member-edit/:id", element: <MemberEdit />,},
        {path: "/member-details/:id", element: <MemberDetails />,},

        {path: "/calendar", element: <CalendarView />,},
        {path: "/notification", element: <NotificationList />,},
        {path: "/report", element: <Reports />,},
        {path: "/settings/profile", element: <Profile />,},
    ]

  },
  {path: "/login", element: <Login />  },
  {path: "/register", element: <Register />  },
  {path: "*", element: <NotFound />  }
]);
