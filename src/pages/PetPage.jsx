import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { getPetById } from "../lib/petsApi";

function PetPage() {
    const [pet, setPet] = useState({});
    const location = useLocation();
    const id = location.pathname.slice(6);

    async function fetchPet() {
        try {
            const petResponse = await getPetById(id);
            if (petResponse) setPet(petResponse);

        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchPet();
    }, []);


    // {
    //     "type": "type2",
    //     "name": "name2",
    //     "adoptionStatus": "ADOPTED",
    //     "picture": "path2",
    //     "height": 2,
    //     "weight": 2,
    //     "color": "color2",
    //     "bio": "bio2",
    //     "hypoallergenic": false,
    //     "dietaryRestrictions": "diet2",
    //     "breed": "breed2"
    // }
    
    return (
        <div>
            <NavbarComponent />
            <div className="d-flex flex-column">
                <img src={pet.picture} alt="Pet"/>
                <h3>{pet.name}</h3>
            </div>
        </div>
        
    );
}

export default withRouter(PetPage);
