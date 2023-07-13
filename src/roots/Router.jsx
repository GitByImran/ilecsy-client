import { createBrowserRouter } from "react-router-dom";

import PageRoot from "./PageRoot";
import Home from "../guest-pages/home/page/Home";
import Signin from "../authentication/Signin";
import Signup from "../authentication/Signup";
import Dashboard from "../dashboard/Dashboard";
const Routes = createBrowserRouter([
  {
    path: "/",
    element: <PageRoot />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
]);
export default Routes;
