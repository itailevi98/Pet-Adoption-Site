import HeaderComponent from "../components/Homepage/HeaderComponent";
import TextComponent from "../components/Homepage/TextComponent";
import { Link, withRouter } from "react-router-dom";
import Modal from "react-modal";
import LoginComponent from "../components/Homepage/LoginComponent";
import SignupComponent from "../components/Homepage/SignupComponent";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import styles from "../components/Homepage/styles/homepage.module.css";
import image from "../assets/animals-lined-up.jpeg";

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
            <div className="p-5 mb-4 bg-light rounded-3">
                <div className="container-fluid">
                    <HeaderComponent />
                    {!token && <div className="text-center">
                        <p className="fs-4">Want to bring home a new pet? You can browse pets on our database, and find your new friend to bring home to the family.</p>
                        <Link to="/search" className="btn btn-info">Start your search</Link>
                    </div>}
                </div>
            </div>
            <img
                        src={image}
                        alt="pets-lined-up"
                        className={styles.petsImage}
                    />
            {!token && (
                <div className="container mt-3 mb-3">
                    <div className="row text-center">
                        <div className="col-md-6 pt-3 mb-3">
                            <TextComponent />
                        </div>
                        <div className="col-md-6">
                            <div>
                                Want to bring home a new pet?
                            </div>
                            <button
                                className="btn btn-info w-50"
                                onClick={() => setLoginModalIsOpen(true)}
                            >
                                Login
                            </button>
                            <div>
                                Or join today!
                            </div>
                            <button
                                className="btn btn-info w-50"
                                onClick={() => setSignupModalIsOpen(true)}
                            >
                                Signup
                            </button>
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
                <div className="container mt-3 mb-3">
                    <div className="row text-center">
                        <div className="col-lg-4 mb-3">
                            <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="https://placekitten.com/140/140" alt="Kitten"></img>
                    
                            <h2>View your pets.</h2>
                            <p>Check out all of your saved and owned (fostered/adopted) pets.</p>
                            <Link to="/my-pets" className="btn btn-info">My Pets Page &raquo;</Link>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="http://placeimg.com/140/140/animals" alt="Kitten"></img>
                            <h2>Find a new pet.</h2>
                            <p>You can search for a new pet by animal type, name, and more.</p>
                            <Link to="/search" className="btn btn-info">Search &raquo;</Link>
                        </div>
                        <div className="col-lg-4 mb-3">
                            <img className="bd-placeholder-img rounded-circle" width="140" height="140" src="https://place-puppy.com/140x140" alt="Kitten"></img>
                            <h2>Edit your profile.</h2>
                            <p>You can change your profile settings in the Profile Page.</p>
                            <Link to="/profile" className="btn btn-info">Edit profile &raquo;</Link>
                        </div>
                    </div>
              </div>
            )}
        </div>
    );
}

export default withRouter(Homepage);
