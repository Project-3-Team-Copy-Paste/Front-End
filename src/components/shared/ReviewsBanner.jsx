import React, { useMemo, useState } from "react";
import Review from "./Review";
import ReviewNewForm from "./ReviewNewForm";

function ReviewsBanner({ reviews, movieTitle, movieID, setFetch }) {
	const [openModal, setOpenModal] = useState(false);

	const curUser = useMemo(() => localStorage.getItem("username"), []);

	function renderReviews(reviews, curUser) {
		if (reviews === null) {
			return <p>Loading...</p>;
		} else if (reviews.length === 0) {
			return <p>We don't have any reviews on this movie yet. Do you wanna be first?</p>;
		} else {
			return reviews.map((review, index) => (
				<Review key={index} review={review} movieTitle={movieTitle} setFetch={setFetch} curUser={curUser} />
			));
		}
	}

	function addForm(movieTitle, movieID, curUser) {
		if (movieTitle && movieID && curUser) {
			return (
				<>
					<button onClick={() => setOpenModal(true)}>Add review</button>
					{openModal ? (
						<ReviewNewForm
							setModal={setOpenModal}
							setFetch={setFetch}
							movieID={movieID}
							movieTitle={movieTitle}
							curUser={curUser}
						/>
					) : null}
				</>
			);
		}
		return null;
	}

	return (
		<div className="bannerContainer reviewBannerContainer">
			<h2>Reviews</h2>
			{addForm(movieTitle, movieID, curUser)}
			<div className="banner reviewBanner">{renderReviews(reviews, curUser)}</div>
		</div>
	);
}

export default ReviewsBanner;
