import { useState } from "react";
import { useHistory, withRouter } from "react-router";
import { useAuth } from "../../../context/AuthContext";
import { addPet } from "../../../lib/petsApi";

function FormComponent() {
    const { token } = useAuth();
    const history = useHistory();

    const [inputs, setInputs] = useState({});
    const [petPicture, setPetPicture] = useState(null);
    const [adoptionStatus, setAdoptionStatus] = useState("AVAILABLE");
    const [hypoallergenic, setHypoallergenic] = useState(false);

    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    function handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const prev = { ...inputs };
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
        setError(false);
        if (!prev.type) {
            setError(true);
            setLoading(false);
            return;
        }
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
                setLoading(false);
                setTimeout(() => {
                    history.go(0);
                }, 3000);
            }
        } catch (err) {
            setError(true);
        }
        setLoading(false);
    }

    return (
        <form
            className="p-2 m-2 d-flex flex-column justify-content-center"
            onSubmit={(event) => handleOnSubmit(event)}
        >
            <label htmlFor="type" className="col-form-label">
                Animal Type:
            </label>
            <select className="form-select" name="type" onChange={(event) => handleOnChange(event)}>
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
                Height (in m, round to the nearest hundredth):
            </label>
            <input
                type="number"
                className="form-control"
                id="height"
                name="height"
                min="0"
                step=".01"
                onChange={(event) => handleOnChange(event)}
                value={inputs.height ? inputs.height : ""}
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
                onChange={(event) => handleOnChange(event)}
                value={inputs.weight ? inputs.weight : ""}
                min="0"
                step=".01"
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
                <label className="mt-3">Hypoallergenic:</label>
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
            {success && (
                <div className="alert alert-success mt-3 mb-3" role="alert">
                    Pet has been added. Page will reload soon.
                </div>
            )}
            {error && (
                <div className="alert alert-danger mt-3 mb-3" role="alert">
                    <p>Error adding pet:</p>
                    <ul>
                        <li>
                            Make sure all the fields are in the correct format
                        </li>
                        <li>Make sure all the required fields are filled</li>
                    </ul>
                </div>
            )}
            {loading && <div className="d-flex justify-content-center mt-3 mb-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
        </form>
    );
}

export default withRouter(FormComponent);
