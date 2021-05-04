import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { updateUser, getUserById } from "../../lib/userApi";
import { useHistory, withRouter } from "react-router-dom";

function FormComponent() {
    const { token, login } = useAuth();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [bio, setBio] = useState("");
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [passwordsError, setPasswordsError] = useState(false);
    const history = useHistory();

    async function handleOnSubmit(event) {
        event.preventDefault();
        if (password !== password2) {
            setPasswordsError(true);
            return;
        }
        setPasswordsError(false);
        setError(false);
        try{
            let updatedUser;
            if (password) {
                updatedUser = {
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
                    email,
                    firstName,
                    lastName,
                    phoneNumber,
                    bio,
                };
            }
            await updateUser(updatedUser, token);
            setSuccess(true);
            login(token);
            setTimeout(() => {
                history.go(0);
            }, 3000);
            
        } catch (err) {
            setError(true);
        }
    }

    useEffect(() => {
        async function fetchUser() {
            if (token) {
                const user = await getUserById(token);
                const { email, first_name, last_name, phone_number, bio } = user;
                setEmail(email);
                setFirstName(first_name);
                setLastName(last_name);
                setPhoneNumber(phone_number);
                setBio(bio);
            }
        }
        fetchUser();
    }, [token]);

    return (
        <form className="p-2 m-2 d-flex flex-column justify-content-center" onSubmit={(event) => handleOnSubmit(event)}>
            {error && 
                <div className="alert alert-danger mt-3 mb-3" role="alert">
                    <p>Error updating profile:</p>
                    <ul>
                        <li>Do not change to an already existing username</li>
                        <li>Make sure the passwords are equal (if you are changing your password)</li>
                        <li>Make sure all the fields are in the correct format</li>
                    </ul>
                </div>
            } 
            <label htmlFor="email" className="col-form-label">Email</label>
            <input 
                type="email" 
                className="form-control" 
                id="email" 
                name="email"
                onChange={(event) => setEmail(event.target.value)}
                value={email}
                required
            />

            <label htmlFor="password" className="col-form-label">Password</label>
            <input 
                type="password" 
                className="form-control" 
                id="password" 
                name="password"
                onChange={(event) => setPassword(event.target.value)}
                value={password}
                placeholder="Enter password only if you want to change your current password"
            />

            <label htmlFor="password2" className="col-form-label">Type your password again</label>
            <input 
                type="password" 
                className="form-control" 
                id="password2" 
                name="password2"
                onChange={(event) => setPassword2(event.target.value)}
                value={password2}
                placeholder="Passwords must match"
            />
            {passwordsError && <div className="alert alert-danger mt-3 mb-3" role="alert">
                Make sure that the passwords match!
            </div>}

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

            <label htmlFor="phone" className="col-form-label">Phone Number</label>
            <input 
                type="tel" 
                className="form-control" 
                id="phone" 
                name="phone"
                onChange={(event) => setPhoneNumber(event.target.value)}
                value={phoneNumber}
                required
            />

            <label htmlFor="bio" className="col-form-label">Bio</label>
            <input 
                type="text" 
                className="form-control" 
                id="bio" 
                name="bio"
                onChange={(event) => setBio(event.target.value)}
                value={bio}
            />

            <button type="submit" className="btn btn-primary mt-2 w-50 mx-auto">Update Profile</button>
            {success && 
                <div className="alert alert-success mt-3" role="alert">
                    Profile updated. Page will reload soon.
                </div>
            }
        </form>
    );
}

export default withRouter(FormComponent);
