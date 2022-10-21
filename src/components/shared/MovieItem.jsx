import React from 'react';
import { Link } from 'react-router-dom';

function MovieItem({ movie }) {
	return (
<<<<<<< HEAD
		<div>
			<Link to={`/library/${movie.tt_id}`}>
				<img src={movie.jsonnnob.image} alt={`${movie.jsonnnob.name}`} />
				<p className='hidden'>{movie.jsonnnob.name}</p>
=======
		<div className='movieItem'>
			<Link to={`/library/${movie.id}`}>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.original_title}
				/>
				<p className='hidden'>{movie.original_title}</p>
>>>>>>> c622721 (Edit LibraryPage, SpecificMoviePage and MovieItem for work with new API)
			</Link>
		</div>
	);
}

export default MovieItem;
