import { useEffect, useState } from "react";
import { Link, useHistory, withRouter } from "react-router-dom";
import { getPetById } from "../../../lib/petsApi";
import { changeUserRole, getFullUserById } from "../../../lib/userApi";

function UserDetails(props) {
    const [user, setUser] = useState();
    const [userPets, setUserPets] = useState([]);
    const { userId } = props;
    const [error, setError] = useState(false);
    const history = useHistory();

    async function handleOnClick() {
        if (user.role === "user") await changeUserRole(user.id, "admin");
        else await changeUserRole(user.id, "user");
        history.go(0);
    }

    useEffect(() => {
        async function fetchFullUserDetails(userId) {
            try {
                const { user, userPets } = await getFullUserById(userId);
                setUser(user);
                if (userPets) {
                    const fetchedPets = [];
                    for (const petId of userPets) {
                        const id = petId.pet_id;
                        const pet = await getPetById(id);
                        fetchedPets.push(pet);
                    }
                    setUserPets(fetchedPets);
                }
            } catch (err) {
                setError(true);
            }
        }

        if (userId) {
            fetchFullUserDetails(userId);
        }
    }, [userId]);

    if (!user) {
        return <div></div>
    }

    return (
        <div className="text-center">
            {error && "Error getting information from server."}
            {!error && <ul className="list-group list-group-flush">
                <li className="list-group-item">Name: {user.first_name} {user.last_name}</li>
                <li className="list-group-item">Email: {user.email}</li>
                <li className="list-group-item">Phone #: {user.phone_number}</li>
                <li className="list-group-item">Bio: {user.bio}</li>
                <li className="list-group-item">Role: {user.role}</li>
                <li className="list-group-item">Created Date: {user.created_date}</li>
                <h3 className="mt-3">User Owned Pets: </h3>
                {userPets.length === 0 && "User does not own any pets"}
                {userPets.length > 0 && <ul className="list-group">
                    {userPets.map((pet) => {
                        const petLink = `/pets/${pet.pet_id}`;
                        return <Link to={petLink} key={pet.pet_id} className="list-group-item">Pet ID: {pet.pet_id}, Name: {pet.name} </Link>
                    })}
                </ul>}
                <button onClick={() => handleOnClick()} className="btn btn-primary mt-3">
                    {user.role === "user" && "Make Admin"}
                    {user.role === "admin" && "Make User"}
                </button>
            </ul>}
        </div>
    );
}

export default withRouter(UserDetails);
