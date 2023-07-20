import { createBrowserRouter } from "react-router-dom";

import PageRoot from "./PageRoot";
import Home from "../guest-pages/home/page/Home";
import Signin from "../authentication/Signin";
import Signup from "../authentication/Signup";
import Dashboard from "../dashboard/Dashboard";
import Cart from "../dashboard/dashboard-components/Cart";
import MakePayment from "../dashboard/user/MakePayment";
import PaymentHistory from "../dashboard/user/PaymentHistory";
import MyOrders from "../dashboard/user/MyOrders";
import ManageUser from "../dashboard/admin/ManageUser";
import Allorders from "../dashboard/admin/Allorders";
import PendingOrders from "../dashboard/admin/PendingOrders";
import CompleteOrders from "../dashboard/admin/CompleteOrders";
import Profile from "../dashboard/dashboard-components/Profile";
import AddProducts from "../dashboard/admin/AddProducts";
import ManageProduct from "../dashboard/admin/ManageProduct";

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
      // {
      //   path: "/cart",
      //   element: <Cart />,
      // },
    ],
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
    children: [
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/cart",
        element: <Cart />,
      },
      {
        path: "/dashboard/make-payment",
        element: <MakePayment />,
      },
      {
        path: "/dashboard/payment-history",
        element: <PaymentHistory />,
      },
      {
        path: "/dashboard/my-orders",
        element: <MyOrders />,
      },
      {
        path: "/dashboard/manage-users",
        element: <ManageUser />,
      },
      {
        path: "/dashboard/manage-products",
        element: <ManageProduct />,
      },
      {
        path: "/dashboard/add-products",
        element: <AddProducts />,
      },
      {
        path: "/dashboard/all-orders",
        element: <Allorders />,
      },
      {
        path: "/dashboard/pending-orders",
        element: <PendingOrders />,
      },
      {
        path: "/dashboard/complete-orders",
        element: <CompleteOrders />,
      },
    ],
  },
]);
export default Routes;
