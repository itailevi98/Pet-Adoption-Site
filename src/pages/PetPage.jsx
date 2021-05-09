import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getPetById, savePet, deleteSavedPet, adoptPet, returnPet } from "../lib/petsApi";
import { getPetsByUser } from "../lib/userPetsApi";
import styles from "./petPageStyles.module.css";

function PetPage() {
    const [pet, setPet] = useState({});
    const [isAvailable, setIsAvailable] = useState(false);
    const [isSaved, setIsSaved] = useState(false);
    const [isOwnedByUser, setIsOwnedByUser] = useState(false);
    const { token } = useAuth();
    const location = useLocation();
    const petId = location.pathname.slice(6);
    

    async function handleOnSavePetClick() {
        if (!isSaved) {
            await savePet(pet.pet_id, token);
            setIsSaved(true);
        } 
        else {
            await deleteSavedPet(pet.pet_id, token);
            setIsSaved(false);
        }
    }

    async function handleOnAdoptClick() {
        await adoptPet(pet.pet_id, "adopt", token);
        setIsAvailable(false);
        setIsOwnedByUser(true);
        refetchPet();
    }

    async function handleOnFosterClick() {
        await adoptPet(pet.pet_id, "foster", token);
        setIsAvailable(false);
        setIsOwnedByUser(true);
        refetchPet();
    }

    async function handleOnReturnClick() {
        await returnPet(pet.pet_id, token);
        setIsAvailable(true);
        setIsOwnedByUser(false);
        refetchPet();
    }

    async function refetchPet() {
        const response = await getPetById(petId);
        if (response) {
            if (response.adoption_status === "AVAILABLE") setIsAvailable(true);
            setPet(response);
        }
    }

    useEffect(() => {
        async function checkUserSavedPets() {
            if (token) {
                const userPets = await getPetsByUser(token);
                if (userPets) {
                    for (let i = 0; i < userPets.length; i++) {
                        const userPet = userPets[i];
                        if (userPet.pet_id === pet.pet_id) {
                            if (userPet.saved) {
                                setIsSaved(true);
                            }
                            if (userPet.owned) {
                                setIsOwnedByUser(true);
                            }
                            break;
                        }
                    }
                }
            }
        }
    
        async function fetchPet() {
            const response = await getPetById(petId);
            if (response) {
                if (response.adoption_status === "AVAILABLE") setIsAvailable(true);
                setPet(response);
            }
        };

        fetchPet();
        checkUserSavedPets();
    }, [pet.pet_id, petId, token]);
    
    return (
        <div className="container mb-3">
            <div className="row">
                <div className="col-md-6 m-auto">
                    <div className={styles.imageContainer}>
                        {pet.picture !== "null" && <img className={styles.petPicture} src={pet.picture} alt="Pet"/>}
                        {pet.picture === "null" && <span className="my-auto">No Pet Picture Found!</span>}
                    </div>
                </div>
                <div className="col-md-6 d-flex flex-column align-items-center mt-3">
                    <h3><b>Name:</b> {pet.name}</h3>
                    <h3><b>Status: </b> 
                        {pet.adoption_status === "ADOPTED" && "Adopted"}
                        {pet.adoption_status === "FOSTERED" && "Fostered"}
                        {pet.adoption_status === "AVAILABLE" && "Available"} 
                    </h3>
                    <h3><b>Type:</b> {pet.type}</h3>
                    <ul className="list-group">
                        <li className="list-group-item"><b>Weight:</b> {pet.weight}kg</li>
                        <li className="list-group-item"><b>Height:</b> {pet.height}m</li>
                        <li className="list-group-item"><b>Color:</b> {pet.color}</li>
                        <li className="list-group-item"><b>Bio:</b> {pet.bio}</li>
                        <li className="list-group-item"><b>Hypoallergenic:</b> {pet.hypoallergenic === 0 ? "No" : "Yes"}</li>
                        <li className="list-group-item"><b>Dietary Restrictions:</b> {pet.dietary_restrictions ? pet.dietary_restrictions : "None"}</li>
                        <li className="list-group-item"><b>Breed:</b> {pet.breed}</li>
                    </ul>
                </div>
            </div>
            { token && <div className="mt-4 row">
                {isAvailable && <div className="col"><button onClick={() => handleOnAdoptClick()} className="btn btn-info" style={{ width: "100%" }}> 
                        Adopt
                </button></div>}
                {isAvailable && <div className="col"><button onClick={() => handleOnFosterClick()} className="btn btn-info" style={{ width: "100%" }}>
                    Foster
                </button></div>}
                {!isAvailable && isOwnedByUser && <div className="col"><button onClick={() => handleOnReturnClick()} className="btn btn-info" style={{ width: "100%" }}>
                    Return
                </button></div>}
                {!isAvailable && !isOwnedByUser && <div className="col"><button disabled className="btn btn-info" style={{ width: "100%" }}>
                    This pet is not available
                </button></div>}
                <div className="col">
                    <button onClick={() => handleOnSavePetClick()} className="btn btn-info" style={{ width: "100%" }}>
                        {isSaved && "Unsave"}
                        {!isSaved && "Save"}
                    </button>
                </div>
            </div>}
        </div>
    );
}

export default withRouter(PetPage);
