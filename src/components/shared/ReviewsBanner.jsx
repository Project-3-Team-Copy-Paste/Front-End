import React from "react";
import Review from "./Review";

function ReviewsBanner({ reviews }) {
	return (
		<div style={{ display: "flex", gap: "2rem" }}>
			{reviews.map((review, index) => (
				<Review key={index} review={review} />
			))}
		</div>
	);
}

export default ReviewsBanner;
