import React, { useEffect, useState } from 'react';
import MovieItem from '../shared/MovieItem';
import { fetchTrendingMovies } from '../../functions/fetch';

function LibraryPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
		fetchTrendingMovies().then((res) => {
			setData([...res.results]);
		});
	}, []);

	function renderData() {
		if (data.length === 0) {
			return <p>Loading...</p>;
		} else {
			return data.map((movie) => {
				return <MovieItem key={movie.id} movie={movie} />;
			});
		}
	}

	return <div>{renderData()}</div>;
}

export default LibraryPage;
