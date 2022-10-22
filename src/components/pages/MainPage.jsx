import React, { useEffect, useState } from "react";
import ReviewsBanner from "../shared/ReviewsBanner";
import MoviesBanner from "../shared/MoviesBanner";
import { fetchAllReviews, fetchTrendingMovies } from "../../functions/fetch";

function MainPage() {
	const [movies, setMovies] = useState([]);
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		const abortController = new AbortController();
		Promise.all([fetchTrendingMovies(abortController.signal), fetchAllReviews(abortController.signal)])
			.then(([movies, reviews]) => {
				setMovies([movies.results[0], movies.results[1], movies.results[2]]);
				setReviews([reviews[0], reviews[1], reviews[2]]);
			})
			.catch((err) => {
				if (!abortController.signal.aborted) {
					console.error(err);
				}
			});
		return () => {
			abortController.abort();
		};
	}, []);

	function render() {
		return (
			<>
				<MoviesBanner movies={movies} />
				<ReviewsBanner reviews={reviews} />
				{/* <ReviewForm /> */}
			</>
		);
	}

	return <div className="mainPage">{render()}</div>;
}

export default MainPage;
