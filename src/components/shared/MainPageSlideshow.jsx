import React, { useState } from "react";
import { Link } from "react-router-dom";

function MainPageSlideshow({ movies }) {
	const [index, setIndex] = useState(0);

	return movies.length > 0 ? (
		<div className="mainPagePosterContainer">
			<img
				src={`https://image.tmdb.org/t/p/original/${movies[index]["backdrop_path"]}`}
				alt="Backdrop Poster"
				className="mainPagePoster"
			/>
			<div className="mainPagePosterGradient" />
			<div className="mainPagePosterButtonContainer">
				<button
					className="mainPagePosterButton"
					onClick={() => setIndex(index === 0 ? movies.length - 1 : index - 1)}>
					{"<"}
				</button>
				<button
					className="mainPagePosterButton"
					onClick={() => setIndex(index === movies.length - 1 ? 0 : index + 1)}>
					{">"}
				</button>
			</div>
			<div className="mainPagePosterText">
				<h2>Now Playing...</h2>
				<Link to={`library/${movies[index].id}`}>
					<h3>{movies[index].title}</h3>
				</Link>
			</div>
		</div>
	) : (
		<div>Loading</div>
	);
}

export default MainPageSlideshow;
