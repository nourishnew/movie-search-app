import { useMutation } from "react-query";
import axios from "axios";

const BASE_API_URL = "https://shopify-shoppies-movie-app.herokuapp.com";

export default function useAddToNomination() {
	console.log("adding to nomination")
	return useMutation(
		({ userId, movieId }) => {
			return axios.post(`${BASE_API_URL}/app/nomination`, {
				userId,
				movieId,
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		},
		{
			onError: ({ data }) => {
				console.log("error add");
				console.log(data);
			},
		}
	);
}
