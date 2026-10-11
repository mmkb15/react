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
import ProductManage from "./views/pages/product/ProductManage";

// Login Functions
import { loggedIn, needToLogin } from "./utils/auth.ts";




export const routes = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    loader: needToLogin,
    children: [
      {
        path: "/",
        element: <Dashboard />,
        loader: needToLogin,
      },

      // User
      {
        path: "/user",
        element: <UserManage />,
        loader: needToLogin,
      },
      {
        path: "/user-create",
        element: <UserCreate />,
        loader: needToLogin,
      },
      {
        path: "/user-edit/:id",
        element: <UserEdit />
      },
      {
        path: "/user-details/:id",
        element: <UserDetails />,
        loader: needToLogin,
      },

      // Prodcut
      {
        path: "/product",
        element: <ProductManage />,
        loader: needToLogin,
      },
      {
        path: "/product-create",
        element: <ProductCreate />,
        loader: needToLogin,
      },

      // Post
      {
        path: "/post",
        element: <PostManage />,
        loader: needToLogin,
      },
      {
        path: "/post-create",
        element: <PostCreate />,
        loader: needToLogin,
      },
      {
        path: "/post-edit/:id",
        element: <PostEdit />,
        loader: needToLogin,
      },
      {
        path: "/post-details/:id",
        element: <PostDetails />,
        loader: needToLogin,
      },
    ]
  },
  {
    path: "/login",
    element: <Login />,
    loader: loggedIn
  },
  {
    path: "*",
    element: <NotFound />
  }
]); 