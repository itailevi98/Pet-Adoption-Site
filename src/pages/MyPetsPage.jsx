import { useState } from "react";
import NoPetsTextComponent from "../components/MyPetsPage/NoPetsTextComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";

export default function MyPetsPage() {
    const [myPets, setMyPets] = useState([]);

    return (
        <div>
            <NavbarComponent />
            <div className="d-flex align-items-center flex-column">
                <h1>These are all the pets you have saved</h1>
                {myPets.length === 0 && <NoPetsTextComponent />}
                {/* {myPets.length > 0 && <MyPetsList myPets={myPets}/>} */}
            </div>
        </div>
    );
}
