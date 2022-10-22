import React from "react";
import MovieItem from "./MovieItem";

function MoviesBanner({ movies }) {
	return (
		<div className="bannerContainer movieBannerContainer">
			<h2>Movies</h2>
			<div className="banner movieBanner">
				{movies.map((movie) => (
					<MovieItem key={movie.id} movie={movie} />
				))}
			</div>
		</div>
	);
}

export default MoviesBanner;
