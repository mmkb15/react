import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'
import Counter from './Count.tsx'
import App from './App.tsx'
import { CardSection } from './CardSection.tsx'
import Effect from './Effect.tsx'
import UserManage from './UserManage.tsx'
import Home from './Home.tsx';
import Login from './Login.tsx';

const links = createBrowserRouter([
  // {path: "/", element: <App />,},
  // {path: "/userManage", element: <UserManage />,},
  // {path: "/cardSection", element: <CardSection />,},
  // {path: "/test", element: <h1>Test Page</h1> },
  { path: "/", element: <App />, 
    children: [
      { path: "/", element: <Home />},
      { path: "/UserManage", element: <UserManage />},
      { path: "/test", element: <h1>Test<b>Page</b></h1>},
    ]
  },
  {path: "/Login", element: <Login /> },
  {path: "*", element: <h1 className='text-danger text-center py-5'>404 Page Not Found</h1> },
  
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
     {/* <App /> */}
     {/* <CardSection />
     <Counter/> */}
     {/* <Effect />
     <UserManage /> */}
     
     <RouterProvider router={links}/>
  </StrictMode>
)
