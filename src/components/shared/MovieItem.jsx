import React from "react";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
	return (
		<div className="movieItem">
			<Link to={`/library/${movie.id}`}>
				<img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.original_title} />
				<p className="hidden">{movie.original_title}</p>
			</Link>
		</div>
	);
}

export default MovieItem;
