import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from "react-router/dom";
import {pageRoutes as routes} from "./route";

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <RouterProvider router={routes} />
  // </StrictMode>,
)
