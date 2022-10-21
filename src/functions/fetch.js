import { movies } from "./SeedMovies";
import axios from "axios";
const KEY = process.env.REACT_APP_MOVIE_KEY;

const searchObject = {
	api: "https://api.themoviedb.org/3",
	endpoints: ["/movie/popular?", "/movie/", "/search/movie?"],
};

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

export async function fetchMovieById(id, signal) {
	try {
		const response = await axios.get(
			`${searchObject.api}${searchObject.endpoints[1]}${id}?api_key=${KEY}&language=en-US`,
			{ signal }
		);
		return response.data;
	} catch (err) {
		if (err.name !== "CanceledError") {
			console.error(err);
		}
	}
}

export async function fetchMovieByName(name, signal) {
	try {
		const response = await axios.get(
			`${searchObject.api}${searchObject.endpoints[2]}api_key=${KEY}&language=en-US&query=${name}&page=1`,
			{ signal }
		);
		return response.data;
	} catch (err) {
		if (err.name !== "CanceledError") {
			console.error(err);
		}
	}
}
