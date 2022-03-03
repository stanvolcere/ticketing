import { buildClient } from '../api/build-client'

function HomePage({ currentUser }) {
	return currentUser ? <h1>Welcome to Next.js! You're signed in!</h1> : <h1>Sorry you're not signed in!</h1>
}

// always executed when server side rendering is taking place
// req here is the same as what we would expect from express server - we can therfore retrieve our cookie from the req
HomePage.getInitialProps = async (context) => {
	const client = buildClient(context);
	const { data } = await client.get('/api/users/currentuser')

	return data;
}

export default HomePage
