import { useState } from 'react'

export default () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = (event) => {
        event.preventDefault();

        console.log(email, password);
    }

    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
            <div className="form-group">
                <labal>Email Address</labal>
                <input className="form-control" onChange={e => setEmail(e.target.value)}></input>
            </div>
            <div className="form-group">
                <labal>Password</labal>
                <input type="password" className="form-control" onChange={e => setPassword(e.target.value)}></input>
            </div>
            <button className="btn btn-primary">Sign up</button>
        </form>
    )
}