import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { getUserById } from "../../lib/userApi";

export default function NavbarComponent() {
    const { token, logout } = useAuth();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        async function fetchUser() {
            try { 
                if (token) {
                    const user = await getUserById(token);
                    if (user) {
                        if (user.role === "admin") {
                            setIsAdmin(true);
                        }
                    }
                }
            } catch (err) {
                console.log(err);
            }
        }
        fetchUser();
    }, [token]);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-3">
            <div className="container-fluid">
                <NavLink className="navbar-brand active" exact to="/">Pet Site</NavLink>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    {token && 
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/my-pets">My Pets</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/search">Search</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/profile">My Profile</NavLink>
                        </li>
                        <li className="nav-item">
                            <div
                                className="nav-link"
                                style={{ cursor: "pointer" }}
                                onClick={() => logout()}
                            >
                                Logout
                            </div>
                        </li>
                        {isAdmin && <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/admin">Admin Dashboard</NavLink>
                        </li>}
                        {isAdmin && <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/admin/pet/add">Add Pet</NavLink>
                        </li>}
                    </ul>}
                    {!token && 
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" exact to="/">Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink activeClassName="active" className="nav-link" to="/search">Search</NavLink>
                        </li>
                    </ul>}
                    
                </div>
            </div>
        </nav>
    );
}
