import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function LoginComponent(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);
    const { setModalClose } = props;
    const authContext = useContext(AuthContext);
    const { login } = authContext;

    function handleOnChange(event) {
        const { name, value } = event.target;
        switch (name) {
            case "email":
                setEmail(value);
                break;
            case "password":
                setPassword(value);
                break;
            default:
                break;
        }
    }

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        const user = {
            email, 
            password,
        };
        try{
            login(user);
            setModalClose();
        } catch (err) {
            setError(true);
        }
    }

    return (
        <form onSubmit={(event) => handleOnFormSubmit(event)}>
            <label htmlFor="email" className="col-sm-2 col-form-label">
                Email
            </label>
            <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                onChange={(event) => handleOnChange(event)}
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
                onChange={(event) => handleOnChange(event)}
                value={password}
            />
            {error && <div className="alert alert-danger" role="alert">
                Username or Password is incorrect. Enter the correct information.
            </div>}

            <button type="submit" className="btn btn-primary">
                Login
            </button>
        </form>
    );
}
