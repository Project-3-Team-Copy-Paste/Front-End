import React from "react";
import MovieItem from "./MovieItem";

function MoviesBanner({ movies }) {
	return (
		<div style={{ display: "flex", gap: "2rem" }}>
			{movies.map((movie, index) => (
				<MovieItem key={index} movie={movie} />
			))}
		</div>
	);
}

export default MoviesBanner;
