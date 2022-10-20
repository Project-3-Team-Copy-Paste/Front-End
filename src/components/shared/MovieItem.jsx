import React from 'react';
import { Link } from 'react-router-dom';

function MovieItem({ movie }) {
	return (
		<div>
			<Link to={`/library/${movie.tt_id}`}>
				<img src={movie.jsonnnob.image} alt={`${movie.jsonnnob.name}`} />
				<p className='hidden'>{movie.jsonnnob.name}</p>
			</Link>
		</div>
	);
}

export default MovieItem;
