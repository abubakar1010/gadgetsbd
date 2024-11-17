import axios from "axios"
import { useEffect, useState } from "react"
import { baseURL } from "../utils/Constant"

interface User {
    role: string,
}

 export const useAdmin = () => {
    const [user, setUser] = useState<User | null>(null)
    const [fetching, setFetching] = useState<boolean>(false)

    const info = localStorage.getItem("user") || "not found"

    const email = JSON.parse(info)

    
    

        useEffect(() =>{
            setFetching(true)
            axios.get(`${baseURL}/get-user?email=${email.email}`)
        .then((res) => {
            console.log(res);
            
            setUser(res.data.result)
            
                setFetching(false)
            
        })
        .catch( (error) => {
            console.log(error);
            
        })
        },[])

    const data = {
        user,
        fetching
    }

    console.log(data);
    

    return data
}