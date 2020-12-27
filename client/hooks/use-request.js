import axios from "axios"
import { useState } from 'react'

const useRequest = ({ url, method, body, onSuccess }) => {
	const [errors, setErrors] = useState(null);

	const doRequest = async () => {
		try {
			// clear out our previous errors if any when we make a new request 
			setErrors(null)
			const response = await axios[method](url, body);

			if (onSuccess) {
				onSuccess(response.data);
			}

			return response.data;

		} catch (err) {
			console.log(err)
			setErrors(<div className="alert alert-danger">
				<h4>Something went wrong....</h4>
				<ul className="my-0">
					{err.response && err.response.data && err.response.data.map((e) => <li key={e.message}>{e.message}</li>)}
				</ul>
			</div>)
		}
	}

	return { doRequest, errors }
}

export default useRequest;