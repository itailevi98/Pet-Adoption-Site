import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { useAuth } from "../context/AuthContext";
import { getPetById, savePet, deleteSavedPet, adoptPet, returnPet } from "../lib/petsApi";
import { getPetsByUser } from "../lib/userPetsApi";

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
    }

    async function handleOnFosterClick() {
        await adoptPet(pet.pet_id, "foster", token);
        setIsAvailable(false);
        setIsOwnedByUser(true);
    }

    async function handleOnReturnClick() {
        await returnPet(pet.pet_id, token);
        setIsAvailable(true);
        setIsOwnedByUser(false);
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
        <div>
            <NavbarComponent />
            <div className="d-flex flex-column align-items-center">
                <img src={pet.picture} alt="Pet"/>
                <h3>Name: {pet.name}</h3>
                <h3>Status: {pet.adoption_status}</h3>
                <h3>Type: {pet.type}</h3>
                <ul>
                    <li>Weight: {pet.weight}kg</li>
                    <li>Height: {pet.height}m</li>
                    <li>Color: {pet.color}</li>
                    <li>Bio: {pet.bio}</li>
                    <li>Hypoallergenic: {pet.hypoallergenic === 0 ? "No" : "Yes"}</li>
                    <li>Dietary Restrictions: {pet.dietaryRestrictions ? pet.dietaryRestrictions : "None"}</li>
                    <li>Breed: {pet.breed}</li>
                </ul>
                { token && <div>
                    {isAvailable && <div>
                        <button onClick={() => handleOnAdoptClick()} className="btn btn-primary"> 
                            Adopt
                        </button>
                        <button onClick={() => handleOnFosterClick()} className="btn btn-primary">
                            Foster
                        </button>
                    </div>}
                    {!isAvailable && isOwnedByUser && <button onClick={() => handleOnReturnClick()} className="btn btn-primary">
                        Return
                    </button>}
                    {!isAvailable && !isOwnedByUser && <button disabled className="btn btn-primary">
                        This pet is not available
                    </button>}
                    <button onClick={() => handleOnSavePetClick()} className="btn btn-primary">
                        {isSaved && "Unsave"}
                        {!isSaved && "Save in My Pets"}
                    </button>
                </div>}
            </div>
        </div>
    );
}

export default withRouter(PetPage);
