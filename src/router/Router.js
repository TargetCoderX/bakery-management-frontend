import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../pages/utils/ProtectedRoute";
import Order from "../pages/Order";
import AllOrders from "../pages/AllOrders";
import Billing from "../pages/Billing";

const createRouter = (isAuth) => {
    let router = [
        {
            path: "/",
            element: isAuth ? <Navigate to="/dashboard" /> : <Navigate to={`/login`} />,
        },
        {
            path: "/login",
            element: isAuth ? <Navigate to="/dashboard" /> : <Login />,
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute isAuth={isAuth}><Dashboard /></ProtectedRoute>,
        },
        {
            path: "/orders/:customer_id",
            element: <ProtectedRoute isAuth={isAuth}><Order /></ProtectedRoute>,
        },
        {
            path: "/all-orders",
            element: <ProtectedRoute isAuth={isAuth}><AllOrders /></ProtectedRoute>,
        },
        {
            path: "/billing/:phone_number?",
            element: <ProtectedRoute isAuth={isAuth}><Billing /></ProtectedRoute>,
        },
    ]
    return createBrowserRouter(router);
}
export default createRouter;