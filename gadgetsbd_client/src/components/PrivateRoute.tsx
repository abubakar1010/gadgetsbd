import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { CircleLoader } from "react-spinners";

const PrivateRoute = ({children}: Readonly<{children: ReactNode}>) => {

    const auth = useAuth()
    const location = useLocation()
    console.log(location);
    

    if(auth!.loading) return <CircleLoader />

    if(auth!.user) return children

    return (
        <Navigate to={"/login"} state={location.pathname} />
    );
};

export default PrivateRoute;