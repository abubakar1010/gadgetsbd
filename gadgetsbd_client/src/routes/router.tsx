import { createBrowserRouter } from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../pages/Home/Home";
import Login from "../components/Auth/Login";
import Register from "../components/Auth/Register";
import DashboardLayout from "../Layout/DashboardLayout";
import BuyerOverview from "../components/Dashboard/Buyer/BuyerOverview";
import MyCart from "../components/Dashboard/Buyer/MyCart";
import Wishlist from "../components/Dashboard/Buyer/Wishlist";
import SellerOverview from "../components/Dashboard/Seller/SellerOverview";
import AddProduct from "../components/Dashboard/Seller/AddProduct";
import OurProduct from "../components/Dashboard/Seller/OurProduct";
import Product from "../pages/Product/Product";
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
                path: "/product",
                element: <Product />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
        ]
    },
    {
        path: "/dashboard",
        element: <DashboardLayout />,
        children:[
            // buyer routes
            {
                path: "/dashboard/buyer-overview",
                element: <BuyerOverview />
            },
            {
                path: "/dashboard/cart",
                element: <MyCart />
            },
            {
                path: "/dashboard/wishlist",
                element: <Wishlist />
            },

            // seller routes

            {
                path: "/dashboard/seller-overview",
                element: <SellerOverview />
            },
            {
                path: "/dashboard/add-product",
                element: <AddProduct />
            },
            {
                path: "/dashboard/our-product",
                element: <OurProduct />
            },
            
        ]
    }
])