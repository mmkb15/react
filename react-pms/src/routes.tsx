import { createBrowserRouter } from "react-router";
import App from './App.tsx'
import Dashboard from "./views/pages/Dashboard.tsx";
import UserManage from "./views/pages/user/UserManage.tsx";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {path: "/", element: <Dashboard />,},
        {path: "/", element: <UserManage />,},
    ]
        
  },
]);