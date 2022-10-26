import React, { useEffect, useState } from "react";
import ReviewsBanner from "../shared/ReviewsBanner";
import MoviesBanner from "../shared/MoviesBanner";
import { fetchAllReviews, fetchTrendingMovies } from "../../functions/fetch";
import MainPageSlideshow from "../shared/MainPageSlideshow";

function MainPage() {
	const [movies, setMovies] = useState([]);
	const [reviews, setReviews] = useState([]);
	const [fetch, setFetch] = useState(0);

	useEffect(() => {
		const abortController = new AbortController();
		Promise.all([fetchTrendingMovies(abortController.signal), fetchAllReviews(abortController.signal)])
			.then(([{ results }, reviews]) => {
				setMovies(results);
				setReviews(reviews.length > 3 ? reviews.slice(0, 3) : reviews);
			})
			.catch((err) => {
				if (!abortController.signal.aborted) {
					console.error(err);
				}
			});
		return () => {
			abortController.abort();
		};
	}, [fetch]);

	function render() {
		return (
			<div className="mainPage">
				<MainPageSlideshow movies={movies} />
				<MoviesBanner movies={movies.length > 0 ? [movies[0], movies[1], movies[2]] : []} />
				<ReviewsBanner reviews={reviews} setFetch={setFetch} />
			</div>
		);
	}

	return <>{render()}</>;
}

export default MainPage;
