import HeaderComponent from "../components/Homepage/HeaderComponent";
import TextComponent from "../components/Homepage/TextComponent";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-modal";
import LoginComponent from "../components/Homepage/LoginComponent";
import SignupComponent from "../components/Homepage/SignupComponent";
import NavbarComponent from "../components/NavbarComponent/NavbarComponent";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

Modal.setAppElement('#root');

function Homepage() {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const authContext = useContext(AuthContext);
    const { user } = authContext;

    function setLoginModalClose() {
        setLoginModalIsOpen(false);
    }

    function setSignupModalClose() {
        setSignupModalIsOpen(false);
    }

    return (
        <div>
            <NavbarComponent />
            {!user && 
            <div className="d-flex flex-column">
                <HeaderComponent />
                <TextComponent />
                <Link to="/search">Go to Search Page</Link>
                <button className="btn btn-primary" onClick={() => setLoginModalIsOpen(true)}>Login</button>
                <button className="btn btn-primary" onClick={() => setSignupModalIsOpen(true)}>Signup</button>
                <Modal 
                    isOpen={loginModalIsOpen}
                    onRequestClose={() => setLoginModalIsOpen(false)} id="login-modal"
                >
                    <LoginComponent setModalClose={() => setLoginModalClose()}/>
                </Modal>
                <Modal 
                    isOpen={signupModalIsOpen}
                    onRequestClose={() => setSignupModalIsOpen(false)} id="signup-modal"
                >
                    <SignupComponent setModalClose={() => setSignupModalClose()}/>
                </Modal>
            </div>}
            {user && 
            <div className="d-flex flex-column">
                <HeaderComponent />
            </div>}
        </div>
    );
}

export default withRouter(Homepage);