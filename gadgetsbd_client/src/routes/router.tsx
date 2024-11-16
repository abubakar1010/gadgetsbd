import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import PrivateRoute from "../components/PrivateRoute";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <PrivateRoute><Register /></PrivateRoute>
            },
        ]
    }
])