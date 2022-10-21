import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchMovieById, fetchReviewsByMovieId } from '../../functions/fetch';
import ReviewsBanner from '../shared/ReviewsBanner';

function SpecificMoviePage() {
	const [data, setData] = useState(null);
	const [reviews, setReviews] = useState(null);
	const { movieID } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		fetchMovieById(movieID, abortController.signal).then((movie) => {
			console.log(movie);
			setData(movie);
		});
		fetchReviewsByMovieId(movieID, abortController.signal).then((reviews) => {
			console.log(reviews);
			setReviews([...reviews]);
		});

		return () => {
			//abortController.abort();
		};
	}, []);

	function renderData() {
		if (data === null) {
			return <p>Loading...</p>;
		} else {
			return renderPage(data);
		}
	}

	function renderReviews(reviews) {
		if (reviews === null) {
			return <p>Loading...</p>;
		} else if (reviews.length === 0) {
			return (
				<p>
					We don't have any reviews on this movie yet. Do you wanna be first?
				</p>
			);
		} else {
			<ReviewsBanner reviews={reviews} />;
		}
	}

	function renderPage(movie) {
		return (
			<div
				style={{
					backgroundImage:
						'url(' +
						'https://image.tmdb.org/t/p/original' +
						movie.backdrop_path +
						')',
				}}>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt='Poster'
				/>
				<h2>{movie.original_title}</h2>
				<h4>{movie.release_date}</h4>
				<div>
					{movie.genres.map((genre) => {
						return <span key={genre.id}>{genre.name}</span>;
					})}
				</div>
				<p>{movie.overview}</p>
				{renderReviews(reviews)}
			</div>
		);
	}

	return <div>{renderData()}</div>;
}

export default SpecificMoviePage;
