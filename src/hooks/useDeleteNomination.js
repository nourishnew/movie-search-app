import { useMutation } from "react-query";
import axios from "axios";

const BASE_API_URL = "https://shopify-shoppies-movie-app.herokuapp.com";

export default function useDeleteNomination() {
	return useMutation(
		({ userId, movieId }) => {
			console.log(userId);
			console.log(movieId);
			return axios.delete(`${BASE_API_URL}/app/nomination/${movieId}`, {
				data: {
					userId: userId,
				},
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		},
		{
			onError: ({ data }) => {
				console.log("error delete");
				console.log(data);
			},
		}
	);
}
