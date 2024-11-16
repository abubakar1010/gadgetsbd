import { createUserWithEmailAndPassword, GoogleAuthProvider, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, User, UserCredential } from "firebase/auth";
import { createContext, ReactNode, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

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
            setUser(currentUser)
            setLoading(false)
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