import { useState } from "react";
import { postComment } from "../lib/supportApi";

export default function ContactPage() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [comment, setComment] = useState("");

    const [charactersError, setCharactersError] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [success, setSuccess] = useState(false);

    async function handleOnSubmit(event) {
        event.preventDefault();
        setServerError(false);
        setSuccess(false);
        if (charactersError) {
            return;
        }
        const newComment = {
            name,
            email,
            comment
        };
        try {
            const status = await postComment(newComment);
            if (status === "Received comment") {
                setSuccess(true);
                setComment("");
                setEmail("");
                setName("");
            }
            else {
                setServerError(true);
            }
        } catch (err) {
            setServerError(true);
        }
    }

    return (
        <div className="container">
            <div className="text-center">
                <h1>Contact Page</h1>
                <p>
                    Want to reach out to us? Fill out the form for a complaint,
                    and we'll try to help out.
                </p>
            </div>
            {success && <div class="alert alert-success" role="alert">
                    Thank you for contacting. Your comment has been sent.
            </div>}
            {serverError && <div class="alert alert-danger" role="alert">
                    Server Error. Try again later.
            </div>}
            <form
                className="p-2 m-2 d-flex flex-column justify-content-center"
                onSubmit={(event) => handleOnSubmit(event)}
            >
                <div className="form-floating mb-3">
                    <input
                        type="email"
                        className="form-control"
                        onChange={(event) => setEmail(event.target.value)}
                        id="floatingInput"
                        placeholder="name@example.com"
                        value={email}
                        required
                    />
                    <label htmlFor="floatingInput">Email Address</label>
                </div>
                <div className="form-floating mb-3">
                    <input
                        type="name"
                        onChange={(event) => setName(event.target.value)}
                        className="form-control"
                        id="name"
                        placeholder="John Doe"
                        value={name}
                        required
                    />
                    <label htmlFor="name">Full Name</label>
                </div>
                <div className="form-floating mb-3">
                    <textarea
                        className="form-control"
                        onChange={(event) => {
                            setCharactersError(false);
                            if (event.target.value.length > 255) setCharactersError(true);
                            else setComment(event.target.value)
                        }}
                        placeholder="Enter your comment"
                        id="comment"
                        style={{ height: "200px" }}
                        value={comment}
                        required
                    />
                    <label htmlFor="comment">Comment (max. 255 characters)</label>
                </div>
                {charactersError && <div class="alert alert-danger" role="alert">
                    Greater than 255 characters!
                </div>}
                <button
                    type="submit"
                    className="btn btn-primary mt-2 w-50 mx-auto"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
