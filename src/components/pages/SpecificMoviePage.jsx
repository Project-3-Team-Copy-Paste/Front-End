import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import fetchData from '../../functions/fetch';

function SpecificMoviePage() {
	const [data, setData] = useState([]);
	const { movieID } = useParams();

	useEffect(() => {
		fetchData().then((fetchData) => {
			console.log(fetchData);
			setData(fetchData);
		});
	}, []);

	function renderData() {
		if (data.length === 0) {
			return <p>Loading...</p>;
		} else {
			return renderPage(data[0]);
		}
	}

	function renderPage(movie) {
		return (
			<div>
				<img src={movie.jsonnnob.image} alt='Poster' />
				<h2>{movie.jsonnnob.name}</h2>
				<h4>{movie.jsonnnob.datePublished}</h4>
				<div>{movie.jsonnnob.contentRating}</div>
				<div>
					{movie.jsonnnob.genre.map((genre) => {
						return <span key={genre}>{genre}</span>;
					})}
				</div>
				<p>{movie.jsonnnob.description}</p>
			</div>
		);
	}

	return <div>{renderData()}</div>;
}

export default SpecificMoviePage;
