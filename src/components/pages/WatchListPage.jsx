import React, { useEffect, useState, useMemo } from 'react';
import MovieItem from '../shared/MovieItem';
import { fetchMoviesRelatedToUserById } from '../../functions/fetch';

function WatchListPage() {
	const [data, setData] = useState([]);
	const userId = useMemo(() => localStorage.getItem('userId'), []); //Do we need to store it as a state? Need to test because we can have problem with useEffect()

	useEffect(() => {
		const abortController = new AbortController();
		if (userId) {
			fetchMoviesRelatedToUserById(userId, abortController.signal)
				.then((res) => {
					setData(res.results);
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
		if (data.length === 0) {
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
