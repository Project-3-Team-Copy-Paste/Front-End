import React from 'react';
import { Link } from 'react-router-dom';

function MovieItem({ movie }) {
	return (
		<Link to={`/library/${movie.id}`} className={'movieItem'}>
			<img
				className='movieItemPoster'
				src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
				alt={movie.title}
			/>
			<p className='hidden movieItemTitle'>{movie.title}</p>
			{/* !ToDo: Add green mark like this https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Eo_circle_light-green_checkmark.svg/2048px-Eo_circle_light-green_checkmark.svg.png on top right corner
			if movie.finished === true*/}
		</Link>
	);
}

export default MovieItem;
