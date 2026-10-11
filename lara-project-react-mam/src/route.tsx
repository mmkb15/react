import { createBrowserRouter } from "react-router";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import ManageUser from "./pages/user/ManageUser.tsx";
import CreateUser from "./pages/user/CreateUser.tsx";

export const pageRoutes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/users",
        element: <ManageUser />,
      },
      {
        path: "/users/create",
        element: <CreateUser />,
      },
    ],
  },
]);
