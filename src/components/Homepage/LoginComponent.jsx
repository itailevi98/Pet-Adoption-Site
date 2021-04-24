import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userLogin } from "../../lib/userApi";

export default function LoginComponent(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { setModalClose } = props;
    const { login } = useAuth();

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        const token = await userLogin(email, password);
        if (token) {
            login(token);
            setModalClose();
        }
        else {
            setError(true);
        }
    }

    return (
        <form className="p-2 m-2 d-flex flex-column justify-content-center" onSubmit={(event) => handleOnFormSubmit(event)}>
            <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
            </label>
            <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required />

            <label htmlFor="password" className="col-sm-2 col-form-label">
                Password
            </label>
            <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                required
                onChange={(event) => setPassword(event.target.value)}
                value={password}
            />
            {error && <div className="alert alert-danger" role="alert">
                Username or Password is incorrect. Enter the correct information.
            </div>}

            <button type="submit" className="btn btn-primary mt-2 w-50 mx-auto">Login</button>
        </form>
    );
}
