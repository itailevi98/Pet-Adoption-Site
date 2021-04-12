export default function LoginComponent() {

    function handleOnFormSubmit(event) {
        event.preventDefault();
    }

    return (
        <form onSubmit={(event) => handleOnFormSubmit(event)}>
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <input type="email" className="form-control" id="email" required/>

            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <input type="password" className="form-control" id="password" required/>

            <button type="submit" className="btn btn-primary">Login</button>
        </form>
    );
}
