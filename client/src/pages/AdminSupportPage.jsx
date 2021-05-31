import { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import CardComponent from "../components/Admin/SupportComponents/CardComponent";
import { useAuth } from "../context/AuthContext";
import { getComments } from "../lib/supportApi";

export default function AdminSupportPage() {
    const { user } = useAuth();
    const [comments, setComments] = useState([]);

    useEffect(() => {
        async function fetchComments() {
            const fetchedComments = await getComments();
            setComments(fetchedComments);
        }
        fetchComments();
    }, []);

    if (!user || user.role !== "admin") {
        return <Redirect to="/"/>
    }

    return (
        <div className="container">
            <h1 className="text-center">Admin Support Page</h1>
            <p className="text-center">Here are some things people have contacted you about.</p>
            <p className="text-center">When a comment is resolved, it will disappear on the page reload.</p>
            <ul className="d-flex flex-column align-items-center">
                {comments.map((comment) => {
                    return <CardComponent key={comment.comment_id} comment={comment}/>
                })}
            </ul>
        </div>
    );
}
