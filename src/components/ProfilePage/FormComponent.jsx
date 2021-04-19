import { useState } from "react";

export default function FormComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");

    /* 
        ^^^^^^^^^^^^ 
        These are gonna have to change once I set up 
        authorization, get the current user signed in
        and change those values to the current users'
        parameters.
    */

    const [error, setError] = useState(false);

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

    return (
        <form>
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
            {error && <div className="alert alert-danger" role="alert">
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
                required
            />

            <button type="submit" className="btn btn-primary">Signup</button>
        </form>
    );


}