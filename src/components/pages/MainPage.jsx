import React, { useEffect, useState } from "react";
import ReviewsBanner from "../shared/ReviewsBanner";
import MoviesBanner from "../shared/MoviesBanner";
import { fetchAllMovies } from "../../functions/fetch";

function MainPage() {
	const [movies, setMovies] = useState([]);
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
				const movies = await fetchAllMovies();
				const reviewsResponse = await fetch("http://localhost:8000/reviews", {
					signal: abortController.signal,
				});
				const reviews = await reviewsResponse.json();
				setMovies([movies[0], movies[1], movies[2]]);
				setReviews([reviews[0], reviews[1], reviews[2]]);
			} catch (err) {
				if (!abortController.signal.aborted) {
					console.error(err);
				}
			}
		};
		fetchData();
		return () => {
			abortController.abort();
		};
	}, []);

	function render() {
		return (
			<>
				<h2>Movies</h2>
				<MoviesBanner movies={movies} />
				<h2>Reviews</h2>
				<ReviewsBanner reviews={reviews} />
			</>
		);
	}

	return <div>{render()}</div>;
}

export default MainPage;
