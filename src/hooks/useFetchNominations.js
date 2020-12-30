import { useQuery } from "react-query";
import axios from "axios";

const BASE_API_URL = "https://shopify-shoppies-movie-app.herokuapp.com";

export default function useFetchNominations(userId) {
	return useQuery(
		`${userId}fetchNominations`,
		() => {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await axios.get(
						`${BASE_API_URL}/app/nomination/${userId}`
					);
					resolve(response.data);
				} catch (error) {
					reject(error);
				}
			});
		},
		{
			refetchOnWindowFocus: true,
			onSuccess: (data) => {},
			onError: (data) => {},
		}
	);
}
