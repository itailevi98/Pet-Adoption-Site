import { createContext, useState, useEffect, useContext } from "react";
import localforage from "localforage";

export const AuthContext = createContext({
    token: null,
    login: (token) => {},
    logout: () => {},
    isInitiallyLoaded: false,
});

export const useAuth = () => {
    return useContext(AuthContext);
}

function AuthProvider(props) {
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
    const [token, setToken] = useState(null);
    async function login(token) {
        setToken(token);
        await localforage.setItem("token", token);
    }

    async function logout() {
        setToken(null);
        await localforage.removeItem("token");
    }

    useEffect(() => {
        async function getToken() {
            const token = await localforage.getItem("token");
            if (token) {
                setToken(token);
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
            isInitiallyLoaded
        }}>
            {props.children}
        </AuthContext.Provider>
    )

}

export default AuthProvider;
