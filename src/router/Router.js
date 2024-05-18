import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../pages/utils/ProtectedRoute";
import Order from "../pages/Order";

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
    ]
    return createBrowserRouter(router);
}
export default createRouter;