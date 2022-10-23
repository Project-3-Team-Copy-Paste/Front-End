import React from "react";
import { Link } from "react-router-dom";

function MovieItem({ movie }) {
	return (
		<div className="movieItem">
			<Link to={`/library/${movie.id}`}>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt={movie.title}
					style={{ height: "20rem" }}
				/>
				<p className="hidden">{movie.title}</p>
			</Link>
		</div>
	);
}

export default MovieItem;
