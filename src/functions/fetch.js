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
			throw err;
		}
		return { results: [] };
	}
}

export async function fetchMovieById(id, signal) {
	try {
		const url = `${searchObject.api}${searchObject.endpoints[1]}${id}?api_key=${KEY}&language=en-US`;
		console.log(url);
		const response = await axios.get(
			`${searchObject.api}${searchObject.endpoints[1]}${id}?api_key=${KEY}&language=en-US`,
			{ signal }
		);
		return response.data;
	} catch (err) {
		if (err.name !== "CanceledError") {
			throw err;
		}
		return null;
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
			throw err;
		}
		return null;
	}
}

export async function fetchAllReviews(signal) {
	const searchObject = {
		api: "https://reelz-backend.herokuapp.com/",
		endpoint: `reviews`,
		searchParams: {},
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	url.search = new URLSearchParams(searchObject.searchParams).toString();
	try {
		const response = await axios.get(url.href, { signal });
		return response.data;
	} catch (err) {
		if (err.name !== "CanceledError") {
			throw err;
		}
		return [];
	}
}

export async function fetchReviewsByMovieId(movieId, signal) {
	const searchObject = {
		api: "https://reelz-backend.herokuapp.com/",
		endpoint: `reviews/movie/${movieId}`,
		searchParams: {},
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	url.search = new URLSearchParams(searchObject.searchParams).toString();
	try {
		const response = await axios.get(url.href, { signal });
		return response.data;
	} catch (err) {
		if (err.name !== "CanceledError") {
			throw err;
		}
		return [];
	}
}

export async function postReview(reviewBody, signal) {
	const searchObject = {
		api: "https://reelz-backend.herokuapp.com/",
		endpoint: `reviews`,
		searchParams: {},
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	url.search = new URLSearchParams(searchObject.searchParams).toString();
	try {
		const response = await axios.post(url.href, reviewBody, { signal });
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function fetchAllUsers(signal) {
	const searchObject = {
		api: "https://reelz-backend.herokuapp.com/",
		endpoint: `users`,
		searchParams: {},
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	url.search = new URLSearchParams(searchObject.searchParams).toString();
	try {
		const response = await axios.get(url.href, { signal });
		return response.data;
	} catch (err) {
		// console.log(err);
		if (err.name !== "CanceledError") {
			throw err;
		}
		return [];
	}
}
