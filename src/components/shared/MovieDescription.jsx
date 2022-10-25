import React from 'react';

function MovieDescription({ movie }) {
	function renderGenres(movie) {
		if (movie.genres) {
			return (
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
			);
		}
		return null;
	}

	function renderData(movie) {
		return (
			<>
				<img
					className='smPoster'
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt='Poster'
				/>
				<div className='specificMovieItem'>
					<h2 className='smTitle'>{movie.title}</h2>
					<div>Description:</div>
					<p className='smOverview'>{movie.overview}</p>
					{renderGenres(movie)}
					<h4 className='smReleaseDate'>Release Date: {movie.release_date}</h4>
				</div>
			</>
		);
	}

	return <>{movie ? renderData(movie) : null}</>;
}

export default MovieDescription;
