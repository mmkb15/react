import { createBrowserRouter } from "react-router";
import App from './App.tsx'
import Dashboard from "./views/pages/Dashboard.tsx";
import MemberList from "./views/pages/member/MemberList.tsx";
import NotFound from "./views/pages/NotFound.tsx";
import Login from "./views/pages/auth/Login.tsx";
import Register from "./views/pages/auth/Register.tsx";
import ProjectList from "./views/pages/project/ProjectList.tsx";
import ProjectDetails from "./views/pages/project/ProjectDetails.tsx";
import Tasks from "./views/pages/task/Tasks.tsx";
import CalendarView from "./views/pages/calendar/CalendarView.tsx";
import NotificationList from "./views/pages/notification/NotificationList.tsx";
import Reports from "./views/pages/report/Reports.tsx";
import Profile from "./views/pages/settings/Profile.tsx";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {path: "/", element: <Dashboard />,},
        {path: "/team", element: <MemberList />,},
        {path: "/project", element: <ProjectList />,},
        {path: "/project/:id", element: <ProjectDetails />,},
        {path: "/task", element: <Tasks />,},
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