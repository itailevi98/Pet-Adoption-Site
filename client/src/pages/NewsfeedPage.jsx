import { Redirect } from "react-router";
import { useAuth } from "../context/AuthContext";

export default function NewsfeedPage() {
    const { user } = useAuth();

    if (!user || user.role !== "admin") {
        return <Redirect to="/"/>
    }

    return (
        <>
            <div className="text-center"> 
                <h1>Newsfeed</h1>
                <p>Keep up to date on the latest activity.</p>
                <p>When a user creates a new account, a pet's adoption status has changed, or a new animal has been added, it will show up here.</p>
            </div> 
        </>
    );
}