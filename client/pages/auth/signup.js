export default () => {
    return (
        <form>
            <h1>Sign Up</h1>
            <div className="form-group">
                <labal>Email Address</labal>
                <input className="form-control"></input>
            </div>
            <div className="form-group">
                <labal>Password</labal>
                <input type="password" className="form-control"></input>
            </div>
            <button className="btn btn-primary">Sign up</button>
        </form>
    )
}