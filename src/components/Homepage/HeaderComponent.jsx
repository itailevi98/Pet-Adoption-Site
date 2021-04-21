
import { useAuth } from "../../context/AuthContext";

export default function HeaderComponent() {
    const { user } = useAuth();
    return (
        <h1 className="d-flex justify-content-center">
            {user && `Welcome ${user.first_name} ${user.last_name}!`}
            {!user && "Welcome to My Pet Adoption Site!"}
        </h1>  
    );
}