import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { userLogin } from "../../lib/userApi";

export default function LoginComponent(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userNameError, setUserNameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [loading, setLoading] = useState(false);
    const { setModalClose } = props;
    const { login } = useAuth();

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        try {
            setLoading(true);
            setUserNameError(false);
            setPasswordError(false);
            setServerError(false);
            const token = await userLogin(email, password);
            if (token) {
                login(token);
                setModalClose();
            }
            else {
                setServerError(true);
            }
            setLoading(false);
        } catch (err) {
            if (err.response.data.error === "Username does not exist") {
                setUserNameError(true);
            }
            else if (err.response.data.error === "Incorrect password") {
                setPasswordError(true);
            }
            else {
                setServerError(true);
            }
            setLoading(false);
        }
        
    }

    return (
        <form className="p-2 m-2 d-flex flex-column" onSubmit={(event) => handleOnFormSubmit(event)}>
            <h2 className="text-center">Login</h2>
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
            {userNameError && <div className="alert alert-danger mt-3" role="alert">
                Username does not exist. Please enter a valid username.
            </div>}
            {passwordError && <div className="alert alert-danger mt-3" role="alert">
                Incorrect password. Please enter the correct password.
            </div>}
            {serverError && <div className="alert alert-danger mt-3" role="alert">
                Server Error. Please try again later.
            </div>}

            {!loading && <button type="submit" className="btn btn-primary mt-2 w-50 mx-auto">Login</button>}
            {loading && <div className="mt-3 mx-auto spinner-border" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>}
        </form>
    );
}
