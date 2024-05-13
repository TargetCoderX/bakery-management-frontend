import { createBrowserRouter, Navigate } from "react-router-dom";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/Dashboard";
import ProtectedRoute from "../pages/utils/ProtectedRoute";

const createRouter = (isAuth) => {
    let router = [
        {
            path: "/login",
            element: isAuth ? <Navigate to="/dashboard" /> : <Login />,
        },
        {
            path: "/dashboard",
            element: <ProtectedRoute isAuth={isAuth}><Dashboard /></ProtectedRoute>,
        },
    ]
    return createBrowserRouter(router);
}
export default createRouter;