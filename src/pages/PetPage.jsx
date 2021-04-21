import { useEffect, useState } from "react";
import { useLocation, withRouter } from "react-router";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { getPetById } from "../lib/petsApi";

function PetPage() {
    const [pet, setPet] = useState({});
    const location = useLocation();
    
    useEffect(() => {
        async function getPet() {
            const id = location.pathname.slice(6);
            const response = await getPetById(id);
            if (response) {
                setPet(response);
            }
        }  
        getPet();
    }, [location])


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
                <h3>{pet.type}</h3>
            </div>
        </div>
        
    );
}

export default withRouter(PetPage);
