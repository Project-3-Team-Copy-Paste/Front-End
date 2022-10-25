import React, { useEffect, useState, useMemo } from 'react';
import Review from '../shared/Review';
import { fetchReviewsRelatedToUserById } from '../../functions/fetch';

function JournalPage() {
	const [data, setData] = useState([]);
	const userId = useMemo(() => localStorage.getItem('userId'), []);

	useEffect(() => {
		const abortController = new AbortController();
		if (userId) {
			fetchReviewsRelatedToUserById(userId, abortController.signal)
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
			return data.map((review, index) => {
				return <Review key={index} review={review} />;
			});
		}
	}

	return <div className='reviewItemList'>{renderData()}</div>;
}

export default JournalPage;
