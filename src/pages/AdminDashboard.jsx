import { Redirect } from "react-router";
import PetsComponent from "../components/Admin/AdminDashboard/PetsComponent";
import UsersComponent from "../components/Admin/AdminDashboard/UsersComponent";
import { useAuth } from "../context/AuthContext";

export default function AdminDashboard() {
    const { user } = useAuth();
    
    if (!user || user.role !== "admin") {
        return <Redirect to="/"/>
    }

    return (
        <div className="container text-center">
            <UsersComponent />
            <PetsComponent/>
        </div>
    );
}