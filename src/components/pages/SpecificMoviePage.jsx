import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { fetchMovieById } from '../../functions/fetch';

function SpecificMoviePage() {
	const [data, setData] = useState([]);
	const { movieID } = useParams();

	useEffect(() => {
		fetchMovieById(movieID).then((movie) => {
			setData(movie);
		});
	}, []);

	function renderData() {
		if (data.length === 0) {
			return <p>Loading...</p>;
		} else {
			return renderPage(data);
		}
	}

	function renderPage(movie) {
		return (
			<div
				style={{
					backgroundImage:
						'url(' +
						'https://image.tmdb.org/t/p/original' +
						movie.backdrop_path +
						')',
				}}>
				<img
					src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
					alt='Poster'
				/>
				<h2>{movie.original_title}</h2>
				<h4>{movie.release_date}</h4>
				<div>
					{movie.genres.map((genre) => {
						return <span key={genre.id}>{genre.name}</span>;
					})}
				</div>
				<p>{movie.overview}</p>
			</div>
		);
	}

	return <div>{renderData()}</div>;
}

export default SpecificMoviePage;
