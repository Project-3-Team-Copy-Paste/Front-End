import React from "react";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
	return (
			<Link to={`/library/${movie.id}`} className={'movieItem'}>
				<img className="movieItemPoster"
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.original_title}
				/>
				<p className='hidden movieItemTitle'>{movie.original_title}</p>
			</Link>
	);
}

export default MovieItem;
