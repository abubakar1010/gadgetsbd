import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useAuth } from "../hooks/useAuth";
import { CircleLoader } from "react-spinners";

const Layout = () => {
    const auth = useAuth()

    console.log(auth!.user);
    

    if(!auth!.user){
        return <>
        <div className=" w-full min-h-screen flex justify-center items-center">
        <CircleLoader color="green" />
        </div>
        </>
    }
    return (
        <div>
            <Navbar />
            <div className=" min-h-screen">
                <Outlet />
            </div>
            <Footer />
        </div>
    );
};

export default Layout;