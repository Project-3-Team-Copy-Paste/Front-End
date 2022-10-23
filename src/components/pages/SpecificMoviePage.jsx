import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { fetchMovieById, fetchReviewsByMovieId } from "../../functions/fetch";
import ReviewsBanner from "../shared/ReviewsBanner";

function SpecificMoviePage() {
	const [data, setData] = useState(null);
	const [reviews, setReviews] = useState(null);
	const { movieID } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		Promise.all([
			fetchMovieById(movieID, abortController.signal),
			fetchReviewsByMovieId(movieID, abortController.signal),
		])
			.then(([movie, reviews]) => {
				setData(movie);
				setReviews(reviews);
			})
			.catch((err) => console.error(err));

		return () => {
			abortController.abort();
		};
	}, [movieID]);

	function renderData() {
		if (data === null) {
			return <p>Loading...</p>;
		} else {
			return renderPage(data);
		}
	}

	function renderPage(movie) {
		if (!movie) {
			return <div>No movie found!</div>;
		}
		return (
			<div
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie["backdrop_path"]})`,
					backgroundRepeat: "no-repeat",
					backgroundSize: "100% auto",
				}}>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt="Poster"
					style={{ height: "25rem" }}
				/>
				<h2>{movie.title}</h2>
				<h4>{movie.release_date}</h4>
				<div>
					{movie.genres.map((genre) => {
						return <span key={genre.id}>{genre.name}</span>;
					})}
				</div>
				<p>{movie.overview}</p>
				<ReviewsBanner reviews={reviews} movieTitle={movie.title} movieID={movie.id} />
			</div>
		);
	}

	return <div>{renderData()}</div>;
}

export default SpecificMoviePage;
