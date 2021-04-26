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
            <h1>Pets</h1>
            <ul className="list-group">
                {pets.map(pet => {
                    return <Link to={`/admin/pet/${pet.pet_id}`} key={pet.pet_id} className="list-group-item">{pet.name}, {pet.adoption_status}</Link>
                })}
            </ul>
        </div>
    )
}