import { useContext } from "react"
import { AuthContext } from "../AuthProvider/AuthProvider"
// import { CircleLoader } from "react-spinners";

export const useAuth = () => {
    const auth = useContext(AuthContext)
    // if(auth?.loading) return <CircleLoader/>
    return auth
}