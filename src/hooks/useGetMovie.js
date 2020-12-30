import { useQuery } from "react-query";
import axios from "axios";

export default function useGetMovie(id) {
	return useQuery(
		`${id}getMovie`,
		() => {
			return new Promise(async (resolve, reject) => {
				try {
					const response = await axios.get(
						"https://www.omdbapi.com/?i=" + id + "&apikey=34bf0bd1"
					);
					console.log(response.data);
					resolve(response.data);
				} catch (err) {
					reject(err);
				}
			});
		},
		{
			onSuccess: ({ data }) => {
				console.log(data);
			},
		}
	);
}
