import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import Loading from "./Loading";

const PrivateRoute = ({children}: Readonly<{children: ReactNode}>) => {

    const auth = useAuth()
    const location = useLocation()
    console.log(location);
    

    if(auth!.loading) return <Loading />

    if(auth!.user) return children

    return (
        <Navigate to={"/login"} state={location.pathname} />
    );
};

export default PrivateRoute;