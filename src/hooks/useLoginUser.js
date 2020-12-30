import { useMutation } from "react-query";
import axios from "axios";

const BASE_API_URL = "https://shopify-shoppies-movie-app.herokuapp.com";

export default function useLoginUser() {
	return useMutation(
		({ name }) => {
			return axios.post(`${BASE_API_URL}/app/user/login`, {
				name,
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		}
	);
}
