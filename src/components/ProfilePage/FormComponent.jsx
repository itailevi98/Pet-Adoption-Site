import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import localforage from "localforage";
import { updateUser } from "../../lib/userApi";

export default function FormComponent() {
    const authContext = useContext(AuthContext);
    const { user } = authContext;
    const { first_name, last_name, phone_number } = user;
    const [email, setEmail] = useState(user.email);
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState(first_name);
    const [lastName, setLastName] = useState(last_name);
    const [phoneNumber, setPhoneNumber] = useState(phone_number);
    const [bio, setBio] = useState(user.bio ? user.bio : "");

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
            case "bio":
                setBio(value);
                break;
            default:
                break;
        }
    }

    async function handleOnSubmit(event) {
        event.preventDefault();
        if (password !== password2) {
            setError(true);
            return;
        }
        setError(false);
        try{
            const token = await localforage.getItem("token");
            const id = token.split(".")[1];
            let updatedUser;
            if (password) {
                updatedUser = {
                    id,
                    email,
                    password,
                    firstName,
                    lastName,
                    phoneNumber,
                    bio,
                };
            }
            else {
                updatedUser = {
                    id,
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    bio,
                };
            }
            await updateUser(updatedUser);
            alert("Profile has been updated");
        } catch (err) {
            alert("Error updating profile");
        }
    }

    return (
        <form onSubmit={(event) => handleOnSubmit(event)}>
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
                placeholder="Enter password only if you want to change your current password"
            />

            <label htmlFor="password2" className="col-form-label">Type your password again</label>
            <input 
                type="password" 
                className="form-control" 
                id="password2" 
                name="password2"
                onChange={(event) => handleOnChange(event)}
                value={password2}
                placeholder="Passwords must match"
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

            <label htmlFor="bio" className="col-form-label">Bio</label>
            <input 
                type="text" 
                className="form-control" 
                id="bio" 
                name="bio"
                onChange={(event) => handleOnChange(event)}
                value={bio}
            />

            <button type="submit" className="btn btn-primary">Update Profile</button>
        </form>
    );
}
