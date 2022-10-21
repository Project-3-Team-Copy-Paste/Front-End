import React, { useEffect, useState } from "react";
import ReviewsBanner from "../shared/ReviewsBanner";
import MoviesBanner from "../shared/MoviesBanner";
import { fetchAllMovies } from "../../functions/fetch";
import ReviewForm from "../shared/ReviewForm";

function MainPage() {
	const [movies, setMovies] = useState([]);
	const [reviews, setReviews] = useState([]);
	useEffect(() => {
		const abortController = new AbortController();
		const fetchData = async () => {
			try {
<<<<<<< HEAD
				const movies = await fetchAllMovies();
=======
				const movies = await fetchTrendingMovies(abortController.signal);
>>>>>>> 7d3602e (Add fetchTrendingMovies function and cleanup function for library)
				const reviewsResponse = await fetch("http://localhost:8000/reviews", {
					signal: abortController.signal,
				});
				const reviews = await reviewsResponse.json();
<<<<<<< HEAD
				setMovies([movies[0], movies[1], movies[2]]);
=======
				setMovies([movies.results[0], movies.results[1], movies.results[2]]);
>>>>>>> 7d3602e (Add fetchTrendingMovies function and cleanup function for library)
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
<<<<<<< HEAD
				<h2>Reviews</h2>
				<ReviewsBanner reviews={reviews} />
=======
				{/* <ReviewsBanner reviews={reviews} /> */}
>>>>>>> 7d3602e (Add fetchTrendingMovies function and cleanup function for library)
				<ReviewForm />
			</>
		);
	}

	return <div>{render()}</div>;
}

export default MainPage;
