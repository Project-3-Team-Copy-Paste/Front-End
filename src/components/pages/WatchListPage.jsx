import React, { useEffect, useState } from 'react';
import MovieItem from '../shared/MovieItem';
import { fetchMoviesRelatedToUserById } from '../../functions/fetch';

function WatchListPage() {
	const [data, setData] = useState([]);
	const userId = localStorage.getItem('userId');
	const jwtToken = localStorage.getItem('JWT');

	useEffect(() => {
		const abortController = new AbortController();
		if (userId) {
			fetchMoviesRelatedToUserById(userId, jwtToken, abortController.signal)
				.then((res) => {
					setData(res);
				})
				.catch((err) => {
					console.error(err);
				});
		}
		return () => {
			abortController.abort();
		};
	}, []);

	function renderData() {
		if (data === 0) {
			return <p>Loading...</p>;
		} else {
			return data.map((movie) => {
				return <MovieItem key={movie.id} movie={movie} />;
			});
		}
	}

	return <div className='movieItemList'>{renderData()}</div>;
}

export default WatchListPage;
