<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import MovieItem from '../shared/MovieItem';
import { fetchTrendingMovies } from '../../functions/fetch';
=======
import React, { useEffect, useState } from "react";
import MovieItem from "../shared/MovieItem";
import { fetchTrendingMovies } from "../../functions/fetch";
>>>>>>> 7d3602e (Add fetchTrendingMovies function and cleanup function for library)

function LibraryPage() {
	const [data, setData] = useState([]);

	useEffect(() => {
<<<<<<< HEAD
		fetchTrendingMovies().then((res) => {
			setData([...res.results]);
		});
=======
		const abortController = new AbortController();
		fetchTrendingMovies(abortController.signal).then((res) => {
			setData([...res.results]);
		});
		return () => {
			abortController.abort();
		};
>>>>>>> 7d3602e (Add fetchTrendingMovies function and cleanup function for library)
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
