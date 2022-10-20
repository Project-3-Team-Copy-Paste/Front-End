import React from "react";

function Review({ review }) {
	return (
		<div>
			<h3>{review.title}</h3>
			<p>{review.rating}</p>
		</div>
	);
}

export default Review;
