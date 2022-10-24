import axios from "axios";
const KEY = process.env.REACT_APP_MOVIE_KEY;
const SERVER =
	process.env.NODE_ENV === "development" ? "http://localhost:8000" : "https://reelz-backend.herokuapp.com/";

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
		api: SERVER,
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
		api: SERVER,
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

export async function postReview(reviewBody, jwtToken) {
	const searchObject = {
		api: SERVER,
		endpoint: `reviews`,
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	try {
		const response = await axios.post(url.href, reviewBody, { headers: { Authorization: `bearer ${jwtToken}` } });
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function editReview(reviewBody, reviewId, jwtToken) {
	const searchObject = {
		api: SERVER,
		endpoint: `reviews/${reviewId}`,
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	try {
		const response = await axios.put(url.href, reviewBody, { headers: { Authorization: `bearer ${jwtToken}` } });
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function deleteReview(reviewId, jwtToken) {
	const searchObject = {
		api: SERVER,
		endpoint: `reviews/${reviewId}`,
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	console.log(url);
	try {
		const response = await axios.delete(url.href, { headers: { Authorization: `bearer ${jwtToken}` } });
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function fetchAllUsers(signal) {
	const searchObject = {
		api: SERVER,
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

export async function signUp(loginInfo) {
	const searchObject = {
		api: SERVER,
		endpoint: `users/signup`,
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	try {
		const response = await axios.post(url.href, loginInfo);
		return response.data;
	} catch (err) {
		throw err;
	}
}

export async function signIn(loginInfo) {
	const searchObject = {
		api: SERVER,
		endpoint: `users/signin`,
	};
	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
	try {
		const response = await axios.post(url.href, loginInfo);
		return response.data;
	} catch (err) {
		throw err;
	}
}
