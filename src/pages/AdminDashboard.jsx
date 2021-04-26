import { useEffect } from "react";
import { Redirect } from "react-router";
import PetsComponent from "../components/Admin/AdminDashboard/PetsComponent";
import UsersComponent from "../components/Admin/AdminDashboard/UsersComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { useAuth } from "../context/AuthContext";
import { getUserById } from "../lib/userApi";

export default function AdminDashboard() {
    const { token } = useAuth();

    useEffect(() => {
        getUserById(token).then(user => {
            if (user.role !== "admin"){
                <Redirect to="/"/>
            }
        })
    }, [token]);

    return (
       <div>
           <NavbarComponent />
           <UsersComponent />
           <PetsComponent />
       </div>
    );
}