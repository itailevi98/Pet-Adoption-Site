import { useEffect, useState } from "react";
import { getPets } from "../lib/petsApi";
import NoPetsTextComponent from "../components/MyPetsPage/NoPetsTextComponent";
import MyPetsList from "../components/MyPetsPage/MyPetsList";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";

export default function MyPetsPage() {
    const [myPets, setMyPets] = useState([]);

    async function fetchMyPets() {
        try {
            const pets = await getPets();
            setMyPets(pets);
        } catch (err) {
            throw new Error(err);
        }
    }

    useEffect(() => {
        fetchMyPets();
      }, []);

    return (
        <div>
            <NavbarComponent />
            <div className="d-flex align-items-center flex-column">
                <h1>These are all the pets you have saved</h1>
                {!myPets && <NoPetsTextComponent />}
                {myPets && <MyPetsList myPets={myPets}/>}
            </div>
        </div>
    );
}
