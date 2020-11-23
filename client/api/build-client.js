import axios from 'axios'

const buildClient = ({ req }) => {
	console.log(req)
	if (typeof window === 'undefined') {
		console.log("SERVERRRRRRRR!")
		return axios.create({
			baseURL: 'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local',
			// indicates to ingress nginx which domain we want to access from withing the clusters
			headers: req.headers,
		});
	} else {
		// must be on the browser
		return axios.create({
			baseURL: '/'
		})
	}
};

module.exports = { buildClient }
// EXAMPLE
// if (typeof window === 'undefined') {
//     // pattern for requests on the kubernetes clusters

//     // http://SERVICENAME.NAMESPACE.srv.cluster.local
//     const { data } = await axios.get('http://ingress-nginx.ingress-nginx.svc.cluster.local/api/users/currentuser', {
//         // indicates to ingress nginx which domain we want to access from withing the clusters
//         headers: req.headers
//     });

//     return data;
// } else {
//     // domain gets prepended to the request when on the browser
//     const { data } = await axios.get('/api/users/currentuser');

//     return data;
// }