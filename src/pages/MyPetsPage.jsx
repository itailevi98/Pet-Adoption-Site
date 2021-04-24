import { useEffect, useState } from "react";
import NoPetsTextComponent from "../components/MyPetsPage/NoPetsTextComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { useAuth } from "../context/AuthContext";
import { getPetById } from "../lib/petsApi";
import { getPetsByUser } from "../lib/userPetsApi";
import PetsList from "../components/PetsList/PetsList";

export default function MyPetsPage() {
    const [savedPets, setSavedPets] = useState([]);
    const [ownedPets, setOwnedPets] = useState([]);
    const [displayOwnedPets, setDisplayOwnedPets] = useState(true);
    const [displaySavedPets, setDisplaySavedPets] = useState(false);
    const { token } = useAuth();

    useEffect(() => {

        async function getUsersPets() {
            const userPets = await getPetsByUser(token);
            if (userPets) {
                const userSavedPets = [];
                const userOwnedPets = [];
                for (let i = 0; i < userPets.length; i++) {
                    const { pet_id, saved, owned } = userPets[i];
                    const pet = await getPetById(pet_id);
                    if (saved) userSavedPets.push(pet);
                    if (owned) userOwnedPets.push(pet);
                }
                setSavedPets(userSavedPets);
                setOwnedPets(userOwnedPets);
            }
        } 

        getUsersPets(); 

        return () => {

        }

    }, [token]);

    return (
        <div>
            <NavbarComponent />
            <div className="d-flex align-items-center flex-column">
                <h1>These are all the pets you have saved</h1>
                <div>
                    <div className="form-check">
                        <input onChange={() => {
                            setDisplayOwnedPets(true);
                            setDisplaySavedPets(false);
                        }} className="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1" checked={displayOwnedPets}/>
                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                            Display Owned Pets
                        </label>
                    </div>
                    <div className="form-check">
                        <input onChange={() => {
                            setDisplaySavedPets(true);
                            setDisplayOwnedPets(false);
                        }}  className="form-check-input" type="radio" name="savedPets" id="savedPets" checked={displaySavedPets}/>
                        <label className="form-check-label" htmlFor="savedPets">
                            Display Saved Pets
                        </label>
                    </div>
                </div> 
                { displayOwnedPets && ownedPets.length > 0 && <div>
                    <PetsList pets={ownedPets}/>
                </div>}
                { displayOwnedPets && ownedPets.length === 0 && <NoPetsTextComponent /> }
                { displaySavedPets && savedPets.length > 0 && <div>
                    <PetsList pets={savedPets}/>
                </div>}
                { displaySavedPets && savedPets.length === 0 && <div>No saved pets</div> }
            </div>
        </div>
    );
}
