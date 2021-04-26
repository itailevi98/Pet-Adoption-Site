import { useState } from "react";
import { useAuth } from "../../../context/AuthContext";
import { addPet } from "../../../lib/petsApi";

export default function FormComponent() {
    const { token } = useAuth();

    const [inputs, setInputs] = useState({});
    const [petPicture, setPetPicture] = useState(null);
    const [adoptionStatus, setAdoptionStatus] = useState("AVAILABLE");
    const [hypoallergenic, setHypoallergenic] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    function handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const prev = { ...inputs };
        prev[name] = value;
        setInputs(prev);
    }

    async function handleOnSubmit(event) {
        event.preventDefault();
        const prev = inputs;
        prev["hypoallergenic"] = hypoallergenic;
        prev["adoptionStatus"] = adoptionStatus;
        const fd = new FormData();
        fd.append("petPicture", petPicture);
        for (let key in prev) {
            fd.append(key, prev[key]);
        }
        try {
            const pet = await addPet(fd, token);
            if (pet) {
                setSuccess(true);
            }
        } catch (err) {
            setError(true);
        }
    }

    return (
        <form
            className="p-2 m-2 d-flex flex-column justify-content-center"
            onSubmit={(event) => handleOnSubmit(event)}
        >
            {success && (
                <div className="alert alert-success" role="alert">
                    Pet has been added
                </div>
            )}
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
            <label htmlFor="type" className="col-form-label">
                Animal Type:
            </label>
            <input
                type="text"
                className="form-control"
                id="type"
                name="type"
                onChange={(event) => handleOnChange(event)}
                value={inputs.type ? inputs.type : ""}
                required
            />

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
            />
            <h3>Pet Status:</h3>
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
                Upload Picture:
            </label>
            <input
                type="file"
                className="form-control"
                id="petPicture"
                name="petPicture"
                onChange={(event) => setPetPicture(event.target.files[0])}
                accept="image/*"
                required
            />

            <label htmlFor="height" className="col-form-label">
                Height (in m):
            </label>
            <input
                type="number"
                className="form-control"
                id="height"
                name="height"
                onChange={(event) => handleOnChange(event)}
                value={inputs.height ? inputs.height : ""}
                required
            />

            <label htmlFor="weight" className="col-form-label">
                Weight (in kg):
            </label>
            <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                onChange={(event) => handleOnChange(event)}
                value={inputs.weight ? inputs.weight : ""}
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
                required
            />

            <div>
                <h2>Hypoallergenic:</h2>
                <div className="form-check">
                    <input
                        onChange={() => {
                            setHypoallergenic(true);
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
                            setHypoallergenic(false);
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
                required
            />

            <button type="submit" className="btn btn-primary mt-2 w-50 mx-auto">
                Add Pet
            </button>
        </form>
    );
}
