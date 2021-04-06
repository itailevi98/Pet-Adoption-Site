export default function SignupComponent() {
    return (
        <form action="">
            <label htmlFor="email" className="col-form-label">Email</label>
            <input type="email" className="form-control" id="email"/>
            <label htmlFor="password" className="col-form-label">Password</label>
            <input type="password" className="form-control" id="password"/>
            <label htmlFor="password2" className="col-form-label">Type your password again</label>
            <input type="password" className="form-control" id="password2"/>
            <label htmlFor="firstName" className="col-form-label">First Name</label>
            <input type="text" className="form-control" id="firstName"/>
            <label htmlFor="lastName" className="col-form-label">Last Name</label>
            <input type="password" className="form-control" id="lastName"/>
            <label htmlFor="phone" className="col-form-label">Phone Number</label>
            <input type="tel" className="form-control" id="phone"/>
            <button className="btn btn-primary">Signup</button>
        </form>
    );
}