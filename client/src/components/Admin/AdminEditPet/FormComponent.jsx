import { useEffect, useState } from "react";
import { useHistory, withRouter } from "react-router";
import { editPet, getPetById } from "../../../lib/petsApi";
import styles from "./editPet.module.css";

function FormComponent(props) {
    const { petId } = props;
    const [inputs, setInputs] = useState({});
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const [adoptionStatus, setAdoptionStatus] = useState("");
    const [hypoallergenic, setHypoallergenic] = useState(false);
    const [petPicture, setPetPicture] = useState();
    const history = useHistory();

    function handleOnChange(event) {
        const files = event.target.files;
        const type = event.target.type;
        const value = event.target.value;
        const name = event.target.name;
        const prev = { ...inputs };
        if (type === "file") {
            setPetPicture(files[0]);
            delete prev.petPicture;
            setInputs(prev);
            return;
        }
        if (name === "type" && value === "Select an option...") {
            if (prev.type) {
                delete prev.type;
                setInputs(prev);
            }
            return;
        }
        prev[name] = value;
        setInputs(prev);
    }

    async function handleOnSubmit(event) {
        event.preventDefault();
        setLoading(true);
        const prev = inputs;
        prev["hypoallergenic"] = hypoallergenic;
        prev["adoptionStatus"] = adoptionStatus;
        const fd = new FormData();
        fd.append("petPicture", petPicture);
        for (let key in prev) {
            fd.append(key, prev[key]);
        }
        try {
            await editPet(fd, petId);
            setSuccess(true);
            setError(false);
            setLoading(false);
            setTimeout(() => {
                history.go(0);
            }, 3000)
            
        } catch (err) {
            setError(true);
            setLoading(false);
        }
    }

    useEffect(() => {
        async function fetchPet() {
            const pet = await getPetById(petId);
            const { type, picture, name, height, weight, color, bio, dietary_restrictions, breed } = pet;
            if (pet.hypoallergenic === 1) setHypoallergenic(true);
            else setHypoallergenic(false)
            setAdoptionStatus(pet.adoption_status);
            setInputs({
                type,
                petName: name,
                height, 
                weight, 
                color, 
                bio,
                dietaryRestrictions: dietary_restrictions,
                breed,
                petPicture: picture
            });
        }
        fetchPet();
    }, [petId]);

    return (
        <form
            className="container d-flex flex-column justify-content-center"
            onSubmit={(event) => handleOnSubmit(event)}
        >
            <div className={styles.imageContainer}>
                {inputs.petPicture !== "null" && <img className={styles.petPicture} src={inputs.petPicture} alt="Pet"/>}
                {inputs.petPicture === "null" && <span className="my-auto">No Pet Picture Found!</span>}
            </div>
            

            <label htmlFor="type" className="col-form-label">
                Animal Type:
            </label>
            <select value={inputs.type} className="form-select" name="type" onChange={(event) => handleOnChange(event)}>
                <option>Select an option...</option>
                <option value="Dog">Dog</option>
                <option value="Cat">Cat</option>
                <option value="Parrot">Parrot</option>
                <option value="Hamster">Hamster</option>
                <option value="Rabbit">Rabbit</option>
                <option value="Ferret">Ferret</option>
                <option value="Mouse">Mouse</option>
                <option value="Spider">Spider</option>
                <option value="Turtle">Turtle</option>
                <option value="Snake">Snake</option>
                <option value="Iguana">Iguana</option>
                <option value="Other">Other</option>
            </select>

            <label htmlFor="petName" className="col-form-label">
                Pet Name:
            </label>
            <input
                type="text"
                className="form-control"
                id="petName"
                name="petName"
                onChange={(event) => handleOnChange(event)}
                value={inputs.petName ? inputs.petName : ""}
                placeholder="Required"
                required
            />
            <label className="mt-3">Pet Status:</label>
            <div>
                <div className="form-check">
                    <input
                        onChange={() => {
                            setAdoptionStatus("ADOPTED");
                        }}
                        className="form-check-input"
                        type="radio"
                        name="adopted-status"
                        id="adopted-status"
                        checked={adoptionStatus === "ADOPTED"}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="adopted-status"
                    >
                        Adopted
                    </label>
                </div>
                <div className="form-check">
                    <input
                        onChange={() => {
                            setAdoptionStatus("FOSTERED");
                        }}
                        className="form-check-input"
                        type="radio"
                        name="fostered-status"
                        id="fostered-status"
                        checked={adoptionStatus === "FOSTERED"}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="fostered-status"
                    >
                        Fostered
                    </label>
                </div>
                <div className="form-check">
                    <input
                        onChange={() => {
                            setAdoptionStatus("AVAILABLE");
                        }}
                        className="form-check-input"
                        type="radio"
                        name="availabe-status"
                        id="available-status"
                        checked={adoptionStatus === "AVAILABLE"}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="available-status"
                    >
                        Available
                    </label>
                </div>
            </div>

            <label htmlFor="petPicture" className="col-form-label">
                Upload A New Picture:
            </label>
            <input
                type="file"
                className="form-control"
                id="petPicture"
                name="petPicture"
                onChange={(event) => handleOnChange(event)}
                accept="image/*"
            />

            <label htmlFor="height" className="col-form-label">
                Height (in m, round to the nearest hundredth):
            </label>
            <input
                type="number"
                className="form-control"
                id="height"
                name="height"
                step=".01"
                onChange={(event) => handleOnChange(event)}
                value={inputs.height ? inputs.height : ""}
                placeholder="Required"
                required
            />

            <label htmlFor="weight" className="col-form-label">
                Weight (in kg, round to the nearest hundredth):
            </label>
            <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                step=".01"
                onChange={(event) => handleOnChange(event)}
                value={inputs.weight ? inputs.weight : ""}
                placeholder="Required"
                required
            />

            <label htmlFor="color" className="col-form-label">
                Color:
            </label>
            <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                onChange={(event) => handleOnChange(event)}
                value={inputs.color ? inputs.color : ""}
                placeholder="Required"
                required
            />

            <label htmlFor="bio" className="col-form-label">
                Bio:
            </label>
            <input
                type="text"
                className="form-control"
                id="bio"
                name="bio"
                onChange={(event) => handleOnChange(event)}
                value={inputs.bio ? inputs.bio : ""}
                placeholder="Required"
                required
            />

            <div>
                <label className="mt-3">Hypoallergenic:</label>
                <div className="form-check">
                    <input
                        onChange={() => {
                            setHypoallergenic(!hypoallergenic);
                        }}
                        className="form-check-input"
                        type="radio"
                        name="hypoallergenic-yes"
                        id="hypoallergenic-yes"
                        checked={hypoallergenic}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="hypoallergenic-yes"
                    >
                        Yes
                    </label>
                </div>
                <div className="form-check">
                    <input
                        onChange={() => {
                            setHypoallergenic(!hypoallergenic);
                        }}
                        className="form-check-input"
                        type="radio"
                        name="hypoallergenic-no"
                        id="hypoallergenic-no"
                        checked={!hypoallergenic}
                    />
                    <label
                        className="form-check-label"
                        htmlFor="hypoallergenic-no"
                    >
                        No
                    </label>
                </div>
            </div>

            <label htmlFor="dietaryRestrictions" className="col-form-label">
                Dietary Restrictions:
            </label>
            <input
                type="text"
                className="form-control"
                id="dietaryRestrictions"
                name="dietaryRestrictions"
                onChange={(event) => handleOnChange(event)}
                value={inputs.dietaryRestrictions ? inputs.dietaryRestrictions : ""}
                placeholder="Required"
                required
            />

            <label htmlFor="breed" className="col-form-label">
                Breed:
            </label>
            <input
                type="text"
                className="form-control"
                id="breed"
                name="breed"
                onChange={(event) => handleOnChange(event)}
                value={inputs.breed ? inputs.breed : ""}
                placeholder="Required"
                required
            />

            {!loading && <button type="submit" className="btn btn-primary mt-2 mb-3 w-50 mx-auto">
                Update Pet
            </button>}
            {success && (
                <div className="alert alert-success" role="alert">
                    Pet has been edited
                </div>
            )}
            {loading && <div className="d-flex justify-content-center mt-3 mb-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            {error && (
                <div className="alert alert-danger" role="alert">
                    <p>Error adding pet:</p>
                    <ul>
                        <li>
                            Make sure all the fields are in the correct format
                        </li>
                        <li>Make sure all the required fields are filled</li>
                    </ul>
                </div>
            )}
        </form>
    );
}

export default withRouter(FormComponent);
