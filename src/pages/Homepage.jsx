import HeaderComponent from "../components/Homepage/HeaderComponent";
import TextComponent from "../components/Homepage/TextComponent";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-modal";
import LoginComponent from "../components/Homepage/LoginComponent";
import SignupComponent from "../components/Homepage/SignupComponent";
import { useState } from "react";

Modal.setAppElement('#root');


function Homepage() {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);

    return (
        <div>
            <HeaderComponent />
            <TextComponent />
            <Link to="/search">Go to Search Page</Link>
            <button className="btn btn-primary" onClick={() => setLoginModalIsOpen(true)}>Login</button>
            <button className="btn btn-primary" onClick={() => setSignupModalIsOpen(true)}>Signup</button>
            <Modal 
                isOpen={loginModalIsOpen}
                onRequestClose={() => setLoginModalIsOpen(false)} id="login-modal"
            >
                <LoginComponent />
            </Modal>
            <Modal 
                isOpen={signupModalIsOpen}
                onRequestClose={() => setSignupModalIsOpen(false)} id="signup-modal"
            >
                <SignupComponent />
            </Modal>
        </div>
    )
}

export default withRouter(Homepage);