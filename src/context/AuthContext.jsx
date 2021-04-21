import { createContext, useState, useEffect, useContext } from "react";
import localforage from "localforage";
import { verifyUserLogin, getUserById } from "../lib/userApi";

export const AuthContext = createContext({
    user: null,
    login: (user) => {},
    logout: () => {},
    isInitiallyLoaded: false,
});

export const useAuth = () => {
    return useContext(AuthContext);
}

function AuthProvider(props) {
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
    const [user, setUser] = useState(null);
    async function login(user) {
        try {
            const token = await verifyUserLogin(user);
            if (token) {
                await localforage.setItem("token", token);
                const id = token.split(".")[1];
                const dbUser = await getUserById(id);
                setUser(dbUser);
            }
            return true;
        } catch (err) {
            return false;
        }
    }

    async function logout() {
        await localforage.removeItem("token");
        setUser(null);
    }

    useEffect(() => {
        async function getUser() {
            try {
                const token = await localforage.getItem("token");
                if (token) {
                    const id = token.split(".")[1];
                    const user = await getUserById(id);
                    setUser(user);
                }
                setIsInitiallyLoaded(true);
            } catch (err) {
                await localforage.setItem("token", null);
            }
        }
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user, 
            login,
            logout,
            isInitiallyLoaded
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
