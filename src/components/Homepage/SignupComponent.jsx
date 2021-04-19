import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { createUser } from "../../lib/userApi";

export default function SignupComponent(props) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [passwordError, setPasswordError] = useState(false);
    const [signupError, setSignupError] = useState(false);
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
            case "password2":
                setPassword2(value);
                break;
            case "firstName":
                setFirstName(value);
                break;
            case "lastName":
                setLastName(value);
                break;
            case "phone":
                setPhoneNumber(value);
                break;
            default:
                break;
        }
    }

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        if (password !== password2) {
            setPasswordError(true);
            return;
        }
        setPasswordError(false);
        const newUser = {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
        };
        try {
            await createUser(newUser);
            const loginUser = { email, password };
            login(loginUser);
            setModalClose();
        }
        catch (err) {
            setSignupError(true);
        }
    }

    return (
        <form onSubmit={(event) => handleOnFormSubmit(event)}>
            {signupError && <div className="alert alert-danger" role="alert">
                Signup Error: Make sure all the fields are correct and the email is not already in use!
            </div>}
            <label htmlFor="email" className="col-form-label">Email</label>
            <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                onChange={(event) => handleOnChange(event)}
                value={email}
                required
            />

            <label htmlFor="password" className="col-form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password"
                onChange={(event) => handleOnChange(event)}
                value={password}
                required
            />

            <label htmlFor="password2" className="col-form-label">Type your password again</label>
            <input 
                type="password" 
                className="form-control" 
                id="password2" 
                name="password2"
                onChange={(event) => handleOnChange(event)}
                value={password2}
                required
            />
            {passwordError && <div className="alert alert-danger" role="alert">
                Make sure that the passwords match!!
            </div>}

            <label htmlFor="firstName" className="col-form-label">First Name</label>
            <input 
                type="text" 
                className="form-control" 
                id="firstName" 
                name="firstName"
                onChange={(event) => handleOnChange(event)}
                value={firstName}
                required
            />

            <label htmlFor="lastName" className="col-form-label">Last Name</label>
            <input 
                type="text" 
                className="form-control" 
                id="lastName" 
                name="lastName"
                onChange={(event) => handleOnChange(event)}
                value={lastName}
                required
            />

            <label htmlFor="phone" className="col-form-label">Phone Number</label>
            <input 
                type="tel" 
                className="form-control" 
                id="phone" 
                name="phone"
                onChange={(event) => handleOnChange(event)}
                value={phoneNumber}
                placeholder="Format: xxxxxxxxxx"
                required
            />

            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    );
}