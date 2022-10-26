import React, { useEffect, useState } from "react";
import Review from "../shared/Review";
import { fetchReviewsRelatedToUserById } from "../../functions/fetch";

function JournalPage() {
	const [data, setData] = useState(null);
	const [fetch, setFetch] = useState(0);
	const userId = localStorage.getItem("userId");
	const jwtToken = localStorage.getItem("JWT");
	const username = localStorage.getItem("username");

	useEffect(() => {
		const abortController = new AbortController();
		if (userId) {
			fetchReviewsRelatedToUserById(userId, jwtToken, abortController.signal)
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
	}, [fetch]);

	function renderData() {
		if (!data) {
			return <p>Loading...</p>;
		} else if (data.length === 0) {
			return <p>Sorry. You don't have any review in your journal.</p>;
		} else {
			return data.map((review, index) => {
				return <Review key={index} review={review} curUser={username} setFetch={setFetch} />;
			});
		}
	}

	return <div className="reviewItemList">{renderData()}</div>;
}

export default JournalPage;
