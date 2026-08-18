import { createBrowserRouter } from "react-router";
import App from "./App";
import Dashboard from "./views/pages/Dashboard";
import UserManage from "./views/pages/user/UserManage";
import UserCreate from "./views/pages/user/UserCreate";
import UserEdit from "./views/pages/user/UserEdit";
import NotFound from "./views/pages/NotFound";
import Login from "./views/pages/auth/Login";
import UserDetails from "./views/pages/user/UserDetails";
import PostManage from "./views/pages/post/PostManage";
import PostCreate from "./views/pages/post/PostCreate";
import PostEdit from "./views/pages/post/PostEdit";
import PostDetails from "./views/pages/post/PostDetails";
import ProductCreate from "./views/pages/product/ProductCreate";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Dashboard />
      },

      // User
      {
        path: "/user",
        element: <UserManage />
      },
      {
        path: "/user-create",
        element: <UserCreate />
      },
      {
        path: "/user-edit/:id",
        element: <UserEdit />
      },
      {
        path: "/user-details/:id",
        element: <UserDetails />
      },

      // Prodcut
      {
        path: "/product-create",
        element: <ProductCreate />
      },

      // Post
      {
        path: "/post",
        element: <PostManage />
      },
      {
        path: "/post-create",
        element: <PostCreate />
      },
      {
        path: "/post-edit/:id",
        element: <PostEdit />
      },
      {
        path: "/post-details/:id",
        element: <PostDetails />
      },
    ]
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "*",
    element: <NotFound />
  }
]); 