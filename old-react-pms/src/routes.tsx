import { createBrowserRouter } from "react-router";
import App from './App.tsx'
import Dashboard from "./views/pages/Dashboard.tsx";
import UserManage from "./views/pages/user/UserManage.tsx";
import NotFound from "./views/pages/NotFound.tsx";
import Login from "./views/pages/auth/Login.tsx";
import Register from "./views/pages/auth/Register.tsx";


export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children:[
        {path: "/", element: <Dashboard />,},
        {path: "/user", element: <UserManage />,},
    ]
        
  },
  {path: "/login", element: <Login />  },
  {path: "/register", element: <Register />  },
  {path: "*", element: <NotFound />  }
]);