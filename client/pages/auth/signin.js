import { useState } from 'react'
import Router from 'next/router'
import useRequest from "../../hooks/use-request"

const SignIn = () => {
	// here we are using hooks to set the initial values for the 
	// below pieces of state
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const { doRequest, errors } = useRequest({
		url: '/api/users/signin',
		method: 'post',
		body: {
			email, password
		},
		onSuccess: () => {
			Router.push('/')
		}
	})

	const onSubmit = async (event) => {
		event.preventDefault();

		await doRequest();


	}

	return (
		<form onSubmit={onSubmit}>
			<h1>Sign In</h1>
			<div className="form-group">
				<labal>Email Address</labal>
				<input className="form-control" onChange={e => setEmail(e.target.value)}></input>
			</div>
			<div className="form-group">
				<labal>Password</labal>
				<input type="password" className="form-control" onChange={e => setPassword(e.target.value)}></input>
			</div>

			{/*no need to check here because you'll remember that the default is null */  errors}
			<button className="btn btn-primary">Sign in</button>
		</form>
	)
}

export default SignIn;