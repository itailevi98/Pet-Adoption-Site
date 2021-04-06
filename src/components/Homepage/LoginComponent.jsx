export default function LoginComponent() {
    return (
        <form action="">
            <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
            <input type="email" className="form-control" id="email" required/>
            <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
            <input type="password" className="form-control" id="password" required/>
            <button className="btn btn-primary">Login</button>
        </form>
    );
}
