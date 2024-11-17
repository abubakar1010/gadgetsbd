import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";
import axios from "axios";
import { baseURL } from "../utils/Constant";

interface AuthInfo{
    user: User | null;
    loading: boolean;
    createUser: (email: string, password: string) => Promise<UserCredential>;
    login: (email: string, password: string) => Promise<UserCredential>;
    logout: () => Promise<void>;
    loginWithGoogle: () => Promise<UserCredential>;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthInfo | null>(null)


const AuthProvider = ({children}: Readonly<{
    children: ReactNode;
  }>) => {

    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    const googleProvider = new GoogleAuthProvider()

    const createUser = (email: string, password: string) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    }

    const login = (email: string, password: string) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth,email, password)
    }

    const logout = () => {
        setLoading(true)
        return signOut(auth)
    }

    const loginWithGoogle = () => {
        setLoading(true)
        return signInWithPopup(auth, googleProvider)
    }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setLoading(true)
            setUser(currentUser)
            if(currentUser){
                localStorage.setItem("user", JSON.stringify(currentUser))
                axios.post(`${baseURL}/authentication`, {email: currentUser.email})
                .then( (res) => {
                    const token: string = res?.data?.token
                    localStorage.setItem("access-token", token)
                    setLoading(false)
                })
                .catch( error => {
                    console.log(error);
                    
                })
                
            }else{
                localStorage.removeItem("access-token")
                localStorage.removeItem("user")
                console.log(localStorage.getItem("user"));
                
                setLoading(false)
            }
        })
        return () => unSubscribe()
    },[])

    const authInfo = {
        user, 
        loading, 
        createUser, 
        login,
        logout,
        loginWithGoogle
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;