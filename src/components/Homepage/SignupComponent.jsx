import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { createUser, userLogin } from "../../lib/userApi";

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
    const { login } = useAuth();
    

    async function handleOnFormSubmit(event) {
        event.preventDefault();
        setPasswordError(false);
        setSignupError(false);
        if (password !== password2) {
            setPasswordError(true);
            return;
        }
        const newUser = {
            email,
            password,
            firstName,
            lastName,
            phoneNumber,
        };
        try {
            await createUser(newUser);
            const token = await userLogin(email, password);
            try {
                login(token);
                setModalClose();
            } catch (err) {
                setSignupError(true);
            }
        }
        catch (err) {
            setSignupError(true);
        }
    }

    return (
        <form className="p-2 m-2 d-flex flex-column" onSubmit={(event) => handleOnFormSubmit(event)}>
            <h2 className="text-center">Signup</h2>
            {signupError && <div className="alert alert-danger" role="alert">
                Signup Error: Make sure all the fields are correct and the email is not already in use!
            </div>}
            <div className="form-group">
                <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="email" 
                        name="email"
                        onChange={(event) => setEmail(event.target.value)}
                        value={email}
                        required
                    />
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="password" className="col-form-label">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password" 
                        name="password"
                        onChange={(event) => setPassword(event.target.value)}
                        value={password}
                        required
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="password2" className="col-form-label">Type your password again</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="password2" 
                        name="password2"
                        onChange={(event) => setPassword2(event.target.value)}
                        value={password2}
                        required
                    />
                </div>
                {passwordError && <div className="alert alert-danger my-2" role="alert">
                    Make sure that the passwords match!
                </div>}
            </div>
            <div className="row">
                <div className="form-group col-md-6">
                    <label htmlFor="firstName" className="col-form-label">First Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="firstName" 
                        name="firstName"
                        onChange={(event) => setFirstName(event.target.value)}
                        value={firstName}
                        required
                    />
                </div>
                <div className="form-group col-md-6">
                    <label htmlFor="lastName" className="col-form-label">Last Name</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        id="lastName" 
                        name="lastName"
                        onChange={(event) => setLastName(event.target.value)}
                        value={lastName}
                        required
                    />
                </div>
            </div>
            <div className="form-group">
                <label htmlFor="phone" className="col-form-label">Phone Number</label>
                <input 
                    type="tel" 
                    className="form-control" 
                    id="phone" 
                    name="phone"
                    onChange={(event) => setPhoneNumber(event.target.value)}
                    value={phoneNumber}
                    placeholder="Format: xxxxxxxxxx"
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-2 w-50 mx-auto">Signup</button>
        </form>
    );
}