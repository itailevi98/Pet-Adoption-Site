import { createContext, useState, useEffect, useContext } from "react";
import localforage from "localforage";
import { getUserById } from "../lib/userApi";

export const AuthContext = createContext({
    token: null,
    login: (token) => {},
    logout: () => {},
    isInitiallyLoaded: false,
    user: null
});

export const useAuth = () => {
    return useContext(AuthContext);
}

function AuthProvider(props) {
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(null);
    async function login(token) {
        setToken(token);
        await localforage.setItem("token", token);
        const { first_name, last_name, role } = await getUserById(token);
        setUser({ first_name, last_name, role });
        await localforage.setItem("user", {
            first_name,
            last_name,
            role
        });
    }

    async function logout() {
        setToken(null);
        setUser(null);
        await localforage.removeItem("token");
        await localforage.removeItem("user");
    }

    useEffect(() => {
        async function getToken() {
            const token = await localforage.getItem("token");
            if (token) {
                setToken(token);
                const user = await localforage.getItem("user");
                if (user) {
                    setUser(user);
                }
            } 
            
            setIsInitiallyLoaded(true);
        }
        getToken();
        
    }, []);

    return (
        <AuthContext.Provider value={{
            token, 
            login,
            logout,
            isInitiallyLoaded,
            user
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
