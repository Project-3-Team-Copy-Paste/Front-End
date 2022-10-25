import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import {
	fetchMovieById,
	fetchReviewsByMovieId,
	fetchMoviesRelatedToUserById,
	updateMovieInWatchList,
} from '../../functions/fetch';
import ReviewsBanner from '../shared/ReviewsBanner';
import LoginNotification from '../shared/LoginNotification';

function SpecificMoviePage() {
	const [data, setData] = useState(null);
	const [reviews, setReviews] = useState(null);
	const [fetch, setFetch] = useState(0);
	const [finished, setFinished] = useState(false);
	const [openModal, setOpenModal] = useState(false);
	const [watched, setWatched] = useState(false);
	const { movieID } = useParams();
	const userId = localStorage.getItem('userId');
	const jwtToken = localStorage.getItem('JWT');

	useEffect(() => {
		const abortController = new AbortController();
		Promise.all([
			fetchMovieById(movieID, abortController.signal),
			fetchReviewsByMovieId(movieID, abortController.signal),
		])
			.then(([movie, reviews]) => {
				setData(movie);
				setReviews(reviews);
				if (userId && jwtToken) {
					fetchMoviesRelatedToUserById(
						userId,
						jwtToken,
						abortController.signal
					).then((watchlist) => {
						const foundMovie = watchlist.find((movie) => movie.id === movieID);
						if (foundMovie !== undefined) {
							setWatched(true);
							setFinished(foundMovie.finished);
						}
					});
				}
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

	function renderWatched(movie) {
		return (
			<button
				type='button'
				onClick={() => {
					if (userId && jwtToken) {
						updateMovieInWatchList(
							userId,
							movie.id,
							{
								id: movie.id,
								poster_path: movie.poster_path,
								title: movie.title,
								finished: false,
							},
							jwtToken
						)
							.then(() => {
								setWatched(true);
							})
							.catch((err) => console.error(err));
					} else {
						setOpenModal(true);
					}
				}}>
				Add to watchlist
			</button>
		);
	}
	// !ToDo: Add button to remove from Watchlist

	function renderFinished() {
		return (
			<>
				<input
					type='checkbox'
					id='finished'
					checked={finished}
					onChange={() => {
						setFinished(!finished);
						const abortController = new AbortController();
						if (userId && jwtToken) {
							updateMovieInWatchList(
								userId,
								movieID,
								{ finished: finished },
								jwtToken,
								abortController.signal
							)
								.then((res) => {
									console.log(res);
								})
								.catch((err) => console.error(err));
						}
					}}
				/>
				<label htmlFor='finished'>Finished?</label>
			</>
		);
	}

	function renderPage(movie) {
		if (!movie) {
			return <div>No movie found!</div>;
		}
		return (
			<div className='specificMovieContainer'>
				{!watched ? renderWatched(movie) : null}
				{openModal ? <LoginNotification setModal={setOpenModal} /> : null}
				{userId && jwtToken ? renderFinished() : null}
				<img
					className='background'
					src={`https://image.tmdb.org/t/p/original/${movie['backdrop_path']}`}
					alt='Backdrop Poster'
				/>
				<img
					className='smPoster'
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt='Poster'
				/>
				<div className='specificMovieItem'>
					<h2 className='smTitle'>{movie.title}</h2>
					<div>Description:</div>
					<p className='smOverview'>{movie.overview}</p>
					<div className='smGenres'>
						Genre(s):
						{movie.genres.map((genre) => {
							return (
								<span className='smGenre' key={genre.id}>
									{genre.name}
								</span>
							);
						})}
					</div>
					<h4 className='smReleaseDate'>Release Date: {movie.release_date}</h4>
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

	return <>{renderData()}</>;
}

export default SpecificMoviePage;
