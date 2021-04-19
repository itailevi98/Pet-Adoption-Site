import CardComponent from "./CardComponent";

export default function MyPetsList(props) {
    const { myPets } = props;
    return (
        <div className="mt-3 d-flex">
            {myPets.map((pet) =>
                <CardComponent
                    key={pet.id}
                    pet={pet}
                />
            )}
        </div>
    );
}
