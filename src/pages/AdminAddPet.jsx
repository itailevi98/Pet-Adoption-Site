import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import FormComponent from "../components/Admin/AdminPetPage/FormComponent";
import { useEffect } from "react";
import { getUserById } from "../lib/userApi";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router";

export default function AdminPet() {
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
            <FormComponent />
        </div>
    );
}