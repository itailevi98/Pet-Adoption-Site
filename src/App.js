import "./App.css";
import { AuthContext } from "./context/AuthContext";
import MainApplication from "./MainApplication";
import { verifyUserLogin, getUserById } from "./lib/userApi";
import { useEffect, useState } from "react";
import localforage from "localforage";

export default function App() {
    const [user, setUser] = useState(null);

    async function login(user) {
        try{
            const token = await verifyUserLogin(user);
            if (token) {
                await localforage.setItem("token", token);
                const id = token.split(".")[1];
                const user = await getUserById(id);
                setUser(user);
            }
        } catch (err) {
            console.log(err);
        }
    }

    async function logout() {
        try{
            await localforage.setItem("token", null);
            setUser(null);
        } catch (err) {
            console.log(err);
        }
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
            } catch (err) {
                console.log(err);
            }
        }
        getUser();
    }, []);

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout
        }}>
            <MainApplication />
        </AuthContext.Provider>
    );
}
