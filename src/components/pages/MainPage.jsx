import React, { useEffect, useState } from "react";
import ReviewsBanner from "../shared/ReviewsBanner";
import MoviesBanner from "../shared/MoviesBanner";
import { fetchAllMovies } from "../../functions/fetch";

function MainPage() {
	const [movies, setMovies] = useState([]);
	console.log(movies)
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
			// <div className="bannerContainer">
			<>
				<MoviesBanner movies={movies} />
				<ReviewsBanner reviews={reviews} />
			</>
			// </div>
		);
	}

	return <div className="mainPage">{render()}</div>;
}

export default MainPage;
