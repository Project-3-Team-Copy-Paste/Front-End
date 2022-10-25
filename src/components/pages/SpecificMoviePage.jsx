import React, { useEffect, useState, useMemo } from 'react';
import { useParams } from 'react-router';
import {
	fetchMovieById,
	fetchReviewsByMovieId,
	fetchMoviesRelatedToUserById,
	updateMovieInWatchList,
} from '../../functions/fetch';
import ReviewsBanner from '../shared/ReviewsBanner';

function SpecificMoviePage() {
	const [data, setData] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [fetch, setFetch] = useState(0);
	const [finished, setFinished] = useState(false);
	const { movieID } = useParams();
	const userId = useMemo(() => localStorage.getItem('userId'), []);

	useEffect(() => {
		const abortController = new AbortController();
		Promise.all([
			fetchMovieById(movieID, abortController.signal),
			fetchReviewsByMovieId(movieID, abortController.signal),
			fetchMoviesRelatedToUserById(userId, abortController.signal),
		])
			.then(([movie, reviews, watchlist]) => {
				setData(movie);
				setReviews(reviews);
				setFinished(watchlist.find((movie) => movie.id === movieID));
			})
			.catch((err) => console.error(err));

		return () => {
			abortController.abort();
		};
	}, [movieID, fetch]);

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
				className='backgroundDiv'
				style={{
					backgroundImage: `url(https://image.tmdb.org/t/p/original/${movie['backdrop_path']})`,
					backgroundRepeat: 'no-repeat',
					backgroundSize: '100% auto',
				}}>
				<button
					type='button'
					onClick={() =>
						updateMovieInWatchList(userId, movie.id, {
							id: movie.id,
							poster_path: movie.poster_path,
							title: movie.title,
							finished: false,
						})
					}>
					Add to watchlist
				</button>
				<input
					type='checkbox'
					name='finished'
					id='finished'
					value={finished}
					onChange={() => {
						const abortController = new AbortController();
						updateMovieInWatchList(
							userId,
							movieID,
							{ finished: finished },
							abortController.signal
						).catch((err) => console.error(err));
					}}
				/>
				<label htmlFor='finished'>Finished?</label>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt='Poster'
					style={{ height: '25rem' }}
				/>
				<h2>{movie.title}</h2>
				<h4>{movie.release_date}</h4>
				<div>
					{movie.genres.map((genre) => {
						return <span key={genre.id}>{genre.name}</span>;
					})}
				</div>
				<p>{movie.overview}</p>
				<ReviewsBanner
					reviews={reviews}
					movieTitle={movie.title}
					movieID={movie.id}
					setFetch={setFetch}
				/>
			</div>
		);
	}

	return <div>{renderData()}</div>;
}

export default SpecificMoviePage;
