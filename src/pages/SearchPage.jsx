import { Link } from "react-router-dom";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";

export default function SearchPage() {
    return (
        <div>
            <NavbarComponent />
            <form className="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <Link to="/">Back to Homepage</Link>
        </div>
    );
}
