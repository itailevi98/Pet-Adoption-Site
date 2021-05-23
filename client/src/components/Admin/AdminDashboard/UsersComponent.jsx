import { useEffect, useState } from "react";
import { getUsers } from "../../../lib/userApi";
import Modal from "react-modal";
import UserDetails from "./UserDetails";

Modal.setAppElement('#root');

export default function UsersComponent() {
    const [users, setUsers] = useState([]);
    const [userIsClicked, setUserIsClicked] = useState(false);
    const [currentUserId, setCurrentUserId] = useState("");

    function handleOnClick(user){
        setUserIsClicked(true);
        setCurrentUserId(user.id);
    }

    useEffect(() => {
        async function fetchAllUsers() {
            const response = await getUsers();
            if (response){
                setUsers(response);
            } 
        }
        fetchAllUsers();
    }, []);

    return (
        <div>
            <h1>Users</h1>
            <h3>Click on a user to display their details, and the pets that they own.</h3>
            <ul className="list-group">
                {users.map(user => {
                    return <button onClick={(event) => handleOnClick(user)} key={user.id} className="list-group-item">{user.first_name} {user.last_name} ({user.email})</button>
                })}
            </ul>
            <Modal 
                    isOpen={userIsClicked}
                    onRequestClose={() => {
                        setUserIsClicked(false); 
                        setCurrentUserId("");
                    }}
                >
                    <UserDetails userId={currentUserId}/>
            </Modal>
        </div>
        
    );
}