import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
import { searchPets } from "../../../lib/petsApi";

export default function PetsComponent() {
    const [pets, setPets] = useState([]);

    useEffect(() => {
        async function fetchPets() {
            const pets = await searchPets("");
            setPets(pets);        
        }
        fetchPets();
    }, [])

    return (
        <div>
            <h1 className="mt-3">Pets</h1>
            <h3>Click on a pet to edit their information.</h3>
            <ul className="list-group mb-3">
                {pets.map(pet => {
                    return <Link to={`/admin/pet/${pet.pet_id}`} key={pet.pet_id} className="list-group-item">{pet.name}, {pet.adoption_status}</Link>
                })}
            </ul>
        </div>
    )
}