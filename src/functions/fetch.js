import { movies } from "./SeedMovies";
import axios from "axios";
const KEY = process.env.REACT_APP_MOVIE_KEY;

const searchObject = {
	api: "https://api.themoviedb.org/3",
	endpoints: ["/movie/popular?", "/movie/?", "/search/movie?"],
};

const defaultParams = new URLSearchParams(`api_key=${KEY}&language=en-US`);

export async function fetchTrendingMovies(signal) {
	try {
		const response = await axios.get(
			`${searchObject.api}${searchObject.endpoints[0]}api_key=${KEY}&language=en-US&page=1`,
			{ signal }
		);
		return response.data;
	} catch (err) {
		if (err.name !== "CanceledError") {
			console.error(err);
		}
	}
}

export async function fetchMovieById(id, signal) {}

export async function fetchMovieByName(name, signal) {}

// async function fetchApi(params) {
// 	const searchObject = {
// 		api: "https://i-m-d-b.herokuapp.com/",
// 		endpoint: "",
// 		searchParams: params, //tt: '', q: '',
// 	};

// 	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
// 	url.search = new URLSearchParams(searchObject.searchParams).toString();

// 	try {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

// export default fetchData;
