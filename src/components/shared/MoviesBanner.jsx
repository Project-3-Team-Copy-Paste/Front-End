import React from "react";
import MovieItem from "./MovieItem";

function MoviesBanner({ movies }) {
	return (
		<div className="bannerContainer movieBannerContainer">
			<h2 className="movieTitle">Movies</h2>
			<div className="banner movieBanner">
				{movies.length > 0 ? (
					movies.map((movie) => <MovieItem key={movie.id} movie={movie} />)
				) : (
					<div>No movies</div>
				)}
			</div>
		</div>
	);
}

export default MoviesBanner;
