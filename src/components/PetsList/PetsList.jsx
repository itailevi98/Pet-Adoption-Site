import CardComponent from "./CardComponent";

export default function PetsList(props) {
    const { pets } = props;
    return (
        <div className="mt-3 d-flex">
            {pets.map((pet) =>
                <CardComponent
                    key={pet.pet_id}
                    pet={pet}
                />
            )}
        </div>
    );
}
