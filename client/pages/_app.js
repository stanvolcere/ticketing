import { buildClient } from '../api/build-client';
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.css';

// any css that we need imported throughout our app needs to be added here
const AppComponent = ({ Component, pageProps, currentUser }) => {
	return <div>
		<Header currentUser={currentUser}></Header>
		<Component {...pageProps} />
	</div>
}

AppComponent.getInitialProps = async (appContext) => {
	// context is in a different form than what we would expec in the page compoenent
	const client = buildClient(appContext.ctx);
	const { data } = await client.get('/api/users/currentuser')

	let pageProps = {};
	if (appContext.Component.getInitialProps) {
		pageProps = await appContext.Component.getInitialProps(appContext.ctx)
	}

	return {
		pageProps,
		...data
	};
}

export default AppComponent;