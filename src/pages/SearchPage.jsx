import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { useEffect, useState } from "react";
import { searchPets } from "../lib/petsApi";
import PetsList from "../components/PetsList/PetsList";
import { useHistory, useLocation, withRouter } from "react-router";

function SearchPage() {
    const [basicSearchQuery, setBasicSearchQuery] = useState("");
    const [advancedSearchOpen, setAdvancedSearchOpen] = useState(false);
    const [fosteredStatus, setFosteredStatus] = useState(false);
    const [adoptedStatus, setAdoptedStatus] = useState(false);
    const [availableStatus, setAvailableStatus] = useState(false);
    const [animalType, setAnimalType] = useState("");
    const [petName, setPetName] = useState("");
    const [height, setHeight] = useState(0);
    const [weight, setWeight] = useState(0);
    const [pets, setPets] = useState([]);
    const history = useHistory();
    const location = useLocation();

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        if (!advancedSearchOpen) {
            const query = {
                basicSearchQuery
            };
            const searchResults = await searchPets(query);
            setPets(searchResults);
            history.push({
                pathname:"/search",
                search: `type=${basicSearchQuery}`
            });
        } else {
            setBasicSearchQuery("");
            const query = {
                fosteredStatus,
                adoptedStatus,
                availableStatus,
                animalType,
                petName,
                height,
                weight
            };
            const searchResults = await searchPets(query);
            setPets(searchResults);
            let historySearchParams = "";
            for (const key in query) {
                if (query[key]) {
                    historySearchParams += `${key}=${query[key]}&`;
                }
            }
            if (historySearchParams.slice(-1) === "&") historySearchParams = historySearchParams.slice(0, -1);
            history.push({
                pathname:"/search",
                search: historySearchParams
            });
        }
    }

    // useEffect(() => {
    //     if (location.search) {
    //         const search = location.search.slice(1);
    //         const query = JSON.parse('{"' + decodeURI(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g,'":"') + '"}');
    //         if (Object.keys(query).length === 1 && "animalType" in query){
    //             setBasicSearchQuery(query.animalType);
    //         }
    //         else {
    //             console.log(query);
    //             console.log("fosteredStatus" in query);
    //             if ("fosteredStatus" in query) setFosteredStatus(true);
    //             if ("adoptedStatus" in query) setAdoptedStatus(true);
    //             if ("availableStatus" in query) setAvailableStatus(true);
    //             if ("animalType" in query) setAnimalType(query.animalType);
    //             if ("height" in query) setHeight(query.height);
    //             if ("weight" in query) setWeight(query.weight);
    //             if ("petName" in query) setPetName(query.petName);
    //             setAdvancedSearchOpen(true);
    //         }
    //     }
        
    // }, [location]);

    return (
        <div>
            <NavbarComponent />
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
                    value={basicSearchQuery}
                    onChange={(event) =>
                        setBasicSearchQuery(event.target.value)
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
                <div className={advancedSearchOpen ? "collapse container show" : "collapse container"} id="collapseExample">
                    <div className="row mt-2 mb-3">
                        <div className="col d-flex flex-column align-items-center">
                            <h4>Adoption Status</h4>
                            <ul className="p-0">
                                <li className="form-check">
                                    <input
                                        onClick={(event) =>
                                            setAdoptedStatus(!adoptedStatus)
                                        }
                                        className="form-check-input"
                                        type="checkbox"
                                        name="adopted"
                                        id="adopted"
                                        value={adoptedStatus}
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
                                        onClick={(event) =>
                                            setFosteredStatus(!fosteredStatus)
                                        }
                                        className="form-check-input"
                                        type="checkbox"
                                        name="fostered"
                                        id="fostered"
                                        value={fosteredStatus}
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
                                        onClick={(event) =>
                                            setAvailableStatus(!availableStatus)
                                        }
                                        className="form-check-input"
                                        type="checkbox"
                                        name="available"
                                        id="available"
                                        value={availableStatus}
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
                            <label htmlFor="animal-type">Animal Type:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="animal-type"
                                id="animal-type"
                                value={animalType}
                                onChange={(event) =>
                                    setAnimalType(event.target.value)
                                }
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="pet-name">Pet Name:</label>
                            <input
                                className="form-control"
                                type="text"
                                name="pet-name"
                                id="pet-name"
                                value={petName}
                                onChange={(event) =>
                                    setPetName(event.target.value)
                                }
                            />
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col">
                            <label htmlFor="height">Height (in m):</label>
                            <input
                                className="form-control"
                                type="number"
                                name="height"
                                id="height"
                                value={height}
                                onChange={(event) =>
                                    setHeight(event.target.value)
                                }
                            />
                        </div>
                        <div className="col">
                            <label htmlFor="weight">Weight (in kg):</label>
                            <input
                                className="form-control"
                                type="number"
                                name="weight"
                                id="weight"
                                value={weight}
                                onChange={(event) =>
                                    setWeight(event.target.value)
                                }
                            />
                        </div>
                    </div>
                </div>
                <button className="mt-2 btn btn-primary" type="submit">
                    Search
                </button>
            </form>
            {pets && 
            <div>
                <PetsList pets={pets}/>
            </div>}
        </div>
    );
}

export default withRouter(SearchPage);
