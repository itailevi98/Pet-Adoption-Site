
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../lib/userApi";

export default function HeaderComponent() {
    const { token } = useAuth();
    const [user, setUser] = useState();
    
    useEffect(() => {
        async function getUser() {
            if (token) {
                const user = await getUserById(token);
                setUser(user);
            }
        }
        getUser();
    }, [token]);

    return (
        <h1 className="d-flex justify-content-center">
            {user && `Welcome ${user.first_name} ${user.last_name}!`}
            {!user && "Welcome to My Pet Adoption Site!"}
        </h1>  
    );
}