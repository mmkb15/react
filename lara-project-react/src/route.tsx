import { createBrowserRouter } from "react-router";

import App from "./App.tsx";

import About from './pages/About.tsx';
import Home from './pages/Home.tsx';
import Contact from './pages/Contact.tsx';
import ManageUser from "./pages/users/ManageUser.tsx";
import CreateUser from "./pages/users/CreateUser.tsx";
import ShowUser from "./pages/users/ShowUser.tsx";
import EditUser from "./pages/users/EditUser.tsx";
import Login from "./pages/Login.tsx";
import Register from "./pages/Register.tsx";
import { needAuth, notAuth } from "./utils/Auth.ts";
import AccessDenied from "./pages/error/AccessDenied.tsx";
import NotFound from "./pages/NotFound.tsx";


export const pageRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: needAuth,
    children: [
      {path: "/", element: <Home />},
      {path: "/about", element: <About />},
      {path: "/contact", element: <Contact />},
      {path: "/users", element: <ManageUser />},
      {path: "/users/create", element: <CreateUser />},
      {path: "/users/:id", element: <ShowUser />},
      {path: "/users/:id/edit", element: <EditUser />},
    ]
  },
  {
    path: "/login",
    loader: notAuth,
    element: <Login />,
  },
  {
    path: "/register",
    loader: notAuth,
    element: <Register />,
  },
  {
    path: "/access-denied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);