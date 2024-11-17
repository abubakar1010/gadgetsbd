import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "../components/Loading";
import { useUserData } from "../hooks/useUserData";

const SellerRoute = ({children}: Readonly<{children: ReactNode}>) => {

    const auth = useAuth()
    const location = useLocation()
    const user = useUserData()    

    if(auth!.loading) return <Loading />

    if(auth!.user && user.role === "Seller") return children

    return (
        <Navigate to={"/login"} state={location.pathname} />
    );
};

export default SellerRoute;