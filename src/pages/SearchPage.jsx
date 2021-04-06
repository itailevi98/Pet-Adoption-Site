import { Link } from "react-router-dom";

export default function SearchPage() {
    return (
        <div>
            <form className="d-flex">
                <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                <button class="btn btn-outline-success" type="submit">Search</button>
            </form>
            <Link to="/">Back to Homepage</Link>
        </div>
    );
}
