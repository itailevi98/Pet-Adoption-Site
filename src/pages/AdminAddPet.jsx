import FormComponent from "../components/Admin/AdminPetPage/FormComponent";
import { useAuth } from "../context/AuthContext";
import { Redirect } from "react-router";

export default function AdminPet() {
    const { user } = useAuth();

    if (!user || user.role !== "admin") {
        return <Redirect to="/"/>
    }

    return (
        <div>
            <div className="text-center">
                <h1>Add a Pet</h1>
                <h3>Make sure all the fields are in the appropriate format.</h3>
                <p>When you are done, click "Add Pet".</p>
            </div>
            
            <FormComponent />
        </div>
    );
}