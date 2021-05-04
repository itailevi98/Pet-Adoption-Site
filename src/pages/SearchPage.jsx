import { useEffect, useState } from "react";
import { searchPets } from "../lib/petsApi";
import PetsList from "../components/PetsList/PetsList";
import { useHistory, useLocation, withRouter } from "react-router";

function SearchPage() {
    const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
    const [fosteredStatus, setFosteredStatus] = useState(false);
    const [adoptedStatus, setAdoptedStatus] = useState(false);
    const [availableStatus, setAvailableStatus] = useState(false);
    const [noResults, setNoResults] = useState(false);
    const [loading, setLoading] = useState(false);
    const [pets, setPets] = useState([]);
    const [inputs, setInputs] = useState({});
    const history = useHistory();
    const location = useLocation();

    function handleOnChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const prev = { ...inputs };
        if (name === "animalType" && value === "Select an option...") {
            if (prev.animalType) {
                delete prev.animalType;
                setInputs(prev);
            }
            return;
        }
        prev[name] = value;
        setInputs(prev);
    }

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        setLoading(true);
        if (!advancedSearchOpen) {
            const basicSearchQuery = inputs.basicSearchQuery;
            if (!basicSearchQuery) {
                const searchResults = await searchPets({});
                setPets(searchResults);
                setLoading(false);
                history.push({
                    pathname: "/search",
                    search: ''
                });
                return;
            }
            else {
                setLoading(false);
                history.push({
                    pathname:"/search",
                    search: `type=${inputs.basicSearchQuery}`
                });
            }
        } else {
            if (inputs.basicSearchQuery) delete inputs.basicSearchQuery;
            inputs["adoptedStatus"] = adoptedStatus;
            inputs["fosteredStatus"] = fosteredStatus;
            inputs["availableStatus"] = availableStatus;
            let historySearchParams = "";
            for (const key in inputs) {
                if (inputs[key]) {
                    historySearchParams += `${key}=${inputs[key]}&`;
                }
            }
            if (historySearchParams.slice(-1) === "&") historySearchParams = historySearchParams.slice(0, -1);
            if (historySearchParams === "") {
                const searchResults = await searchPets({});
                setPets(searchResults);
            }
            setLoading(false);
            history.push({
                pathname:"/search",
                search: historySearchParams
            });
        }
        
    }

    useEffect(() => {
        setNoResults(false);
        async function fetchPets() {
            const search = location.search.slice(1);
            const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
            if (Object.keys(query).length === 1) {
                if (query.type) {
                    query["basicSearchQuery"] = query.type;
                    delete query.type;
                }
            }
            const searchResults = await searchPets(query);
            setPets(searchResults);
            if (query.adoptedStatus) { 
                setAdoptedStatus(true);
            }
            if (query.fosteredStatus) { 
                setFosteredStatus(true);
            }
            if (query.availableStatus) {
                setAvailableStatus(true);
            }
            setInputs(query);
            if (Object.keys(query).length > 0 && searchResults.length === 0) {
                setNoResults(true);
            }
        }
        if (location.search) {
            fetchPets();
        }
        
    }, [location.search]);

    return (
        <div>
            <div className="mb-5">
                <h1 className="text-center">Want to find the right pet for you?</h1>
                <h4 className="text-center">Use the basic search to search for a type of animal, or use our advanced search to search by a pet name, animal type, weight/height, or their adoption status.</h4>
            </div>
            <form
                onSubmit={(event) => handleOnFormSubmit(event)}
                className="d-flex flex-column align-items-center px-3"
            >
                <input
                    className="form-control me-2 mb-3"
                    type="search"
                    disabled={advancedSearchOpen}
                    placeholder={
                        advancedSearchOpen
                            ? "Search by Advanced Search"
                            : "Search by Animal Type"
                    }
                    name="basicSearchQuery"
                    value={inputs.basicSearchQuery ? inputs.basicSearchQuery : ""}
                    onChange={(event) =>
                        handleOnChange(event)
                    }
                />
                <button
                    onClick={() => setAdvancedSearchOpen(!advancedSearchOpen)}
                    className="mb-3 btn btn-outline-success"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseExample"
                    aria-expanded="false"
                    aria-controls="collapseExample"
                >
                    {!advancedSearchOpen && "Use Advanced Search"}
                    {advancedSearchOpen && "Use Basic Search"}
                </button>
                <div className={"collapse container"} id="collapseExample">
                    <div className="row mt-2 mb-3">
                        <div className="col d-flex flex-column align-items-center">
                            <h4>Adoption Status</h4>
                            <ul className="p-0">
                                <li className="form-check">
                                    <input
                                        onClick={() =>
                                            setAdoptedStatus(!adoptedStatus)
                                        }
                                        className="form-check-input"
                                        type="checkbox"
                                        name="adopted"
                                        id="adopted"
                                        defaultChecked={inputs.adoptedStatus}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="adopted"
                                    >
                                        Adopted
                                    </label>
                                </li>
                                <li className="form-check">
                                    <input
                                        onClick={() =>
                                            setFosteredStatus(!fosteredStatus)
                                        }
                                        className="form-check-input"
                                        type="checkbox"
                                        name="fostered"
                                        id="fostered"
                                        defaultChecked={inputs.fosteredStatus}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="fostered"
                                    >
                                        Fostered
                                    </label>
                                </li>
                                <li className="form-check">
                                    <input
                                        onClick={() =>
                                            setAvailableStatus(!availableStatus)
                                        }
                                        className="form-check-input"
                                        type="checkbox"
                                        name="available"
                                        id="available"
                                        defaultChecked={inputs.availableStatus}
                                    />
                                    <label
                                        className="form-check-label"
                                        htmlFor="available"
                                    >
                                        Available
                                    </label>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                        <label htmlFor="animalType">
                            Animal Type:
                        </label>
                        <select value={inputs.animalType} className="form-select" name="animalType" onChange={(event) => handleOnChange(event)}>
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
                        </div>
                        <div className="col">
                            <label htmlFor="petName">Pet Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="petName"
                                id="petName"
                                value={inputs.petName ? inputs.petName : ""}
                                onChange={(event) =>
                                    handleOnChange(event)
                                }
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="height">Height (in m, round to the nearest hundredth):</label>
                            <input
                                className="form-control"
                                type="number"
                                name="height"
                                id="height"
                                step=".01"
                                min="0"
                                value={inputs.height ? inputs.height : ""}
                                onChange={(event) =>
                                    handleOnChange(event)
                                }
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="weight">Weight (in kg, round to the nearest hundredth):</label>
                            <input
                                className="form-control"
                                type="number"
                                name="weight"
                                id="weight"
                                step=".01"
                                min="0"
                                value={inputs.weight ? inputs.weight : ""}
                                onChange={(event) =>
                                    handleOnChange(event)
                                }
                            />
                        </div>
                    </div>
                </div>
                <button className="mt-2 btn btn-primary" type="submit">
                    Search
                </button>
            </form>
            {loading && <div className="d-flex justify-content-center mt-3 mb-3">
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>}
            {pets && <PetsList pets={pets}/>}
            {noResults && <h3 className="mt-3 text-center">No Results Found.</h3>}
        </div>
    );
}

export default withRouter(SearchPage);
