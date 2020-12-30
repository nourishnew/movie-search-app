import { useMutation } from "react-query";
import axios from "axios";

const BASE_API_URL = "https://shopify-shoppies-movie-app.herokuapp.com";

export default function useCreateUser() {
	const id = Date.now().toString(36) + Math.random().toString(36).substr(2);
	return useMutation(
		({ name }) => {
			return axios.post(`${BASE_API_URL}/app/user/signup`, {
				name,
				id,
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		}
	);
}
