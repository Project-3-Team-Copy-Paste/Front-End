import React from "react";
import Review from "./Review";

function ReviewsBanner({ reviews }) {
	return (
		<div className="bannerContainer reviewBannerContainer">
			<h2>Reviews</h2>
			<div className="banner reviewBanner">
				{reviews.map((review, index) => (
				<Review key={index} review={review} />
				))}
			</div>
		</div>
	);
}

export default ReviewsBanner;
