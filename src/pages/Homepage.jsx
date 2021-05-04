import HeaderComponent from "../components/Homepage/HeaderComponent";
import TextComponent from "../components/Homepage/TextComponent";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-modal";
import LoginComponent from "../components/Homepage/LoginComponent";
import SignupComponent from "../components/Homepage/SignupComponent";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../components/Homepage/styles/homepage.module.css";
import image from "../components/Homepage/images/animals-lined-up.jpeg";

Modal.setAppElement("#root");

function Homepage() {
    const [loginModalIsOpen, setLoginModalIsOpen] = useState(false);
    const [signupModalIsOpen, setSignupModalIsOpen] = useState(false);
    const { token } = useAuth();

    function setLoginModalClose() {
        setLoginModalIsOpen(false);
    }

    function setSignupModalClose() {
        setSignupModalIsOpen(false);
    }

    return (
        <div>
            <HeaderComponent />
            <div className="d-flex justify-content-center">
                <img
                    src={image}
                    alt="pets-lined-up"
                    className={styles.petsImage}
                />
            </div>
            {!token && (
                <div className="d-flex flex-column align-items-center">
                    <Link className="btn btn-outline-primary mt-3" to="/search">
                        Search for a new pet
                    </Link>
                    <div className="container mt-3 mb-3">
                        <div className="row">
                            <div className="col-md-6 pt-3">
                                <TextComponent />
                            </div>
                            <div className="col-md-6 text-center">
                                <div>
                                    Want to bring home a new pet?
                                </div>
                                <button
                                    className="btn btn-primary w-50"
                                    onClick={() => setLoginModalIsOpen(true)}
                                >
                                    Login
                                </button>
                                <div>
                                    Or join today!
                                </div>
                                <button
                                    className="btn btn-primary w-50"
                                    onClick={() => setSignupModalIsOpen(true)}
                                >
                                    Signup
                                </button>
                            </div>
                        </div>
                    </div>
                    <Modal
                        className={styles.loginModal}
                        isOpen={loginModalIsOpen}
                        onRequestClose={() => setLoginModalIsOpen(false)}
                    >
                        <LoginComponent
                            setModalClose={() => setLoginModalClose()}
                        />
                    </Modal>
                    <Modal
                        className={styles.signupModal}
                        isOpen={signupModalIsOpen}
                        onRequestClose={() => setSignupModalIsOpen(false)}
                    >
                        <SignupComponent
                            setModalClose={() => setSignupModalClose()}
                        />
                    </Modal>
                </div>
            )}
            {token && (
                <div className="container text-center mt-4">
                    <div className="row">
                        <div className="col">
                            Check out all of your saved and owned
                            (fostered/adopted) pets in your{" "}
                            <Link to="/my-pets"> My Pets Page</Link>.
                        </div>
                        <div className="col">
                            Want to find a new pet?{" "}
                            <Link to="/search">Search</Link> for a new pet to
                            add to the list.
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default withRouter(Homepage);
