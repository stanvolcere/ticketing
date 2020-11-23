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

// <RespondToQuestions questionset={questionset} questions={questions} responses={re}></RespondToQuestions>

// try {
//     const questionset_res = await axios.get(`http://localhost:5000/questionsets/${questionset_id}?links=false`);
//     const questionset = questionset_res.data.data;

//     const questions_res = await axios.get(`http://localhost:5000/questionsets/${questionset_id}/questions?links=false`);
//     const questions = questions_res.data.data;

//     const responses_res = await axios.get(`http://localhost:5000/responsesets?links=false&questionset_id=${questionset_id}`).catch((err) => {
//         console.log(err);
//         return [];
//     });
//     const responses = responses_res.data.data;

//     return { questionset, questions, responses };
// } catch(err) {
//     console.log();
// }