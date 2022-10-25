import React, { useMemo, useState } from "react";
import LoginNotification from "./LoginNotification";
import Review from "./Review";
import ReviewNewForm from "./ReviewNewForm";

function ReviewsBanner({ reviews, movieTitle, movieID, setFetch }) {
	const [openModal, setOpenModal] = useState(false);

	const curUser = localStorage.getItem("username") || "";
	const index = reviews.findIndex((review) => review.author.username === curUser);

	function renderReviews(reviews, curUser) {
		if (reviews === null) {
			return <p>Loading...</p>;
		} else if (reviews.length === 0) {
			return <p>We don't have any reviews on this movie yet. Do you wanna be first?</p>;
		} else {
			const output =
				index !== -1
					? [reviews[index], ...reviews.filter((review) => review.author.username !== curUser)]
					: reviews;
			return output.map((review) => (
				<Review
					key={review._id}
					review={review}
					movieTitle={movieTitle}
					setFetch={setFetch}
					curUser={curUser}
				/>
			));
		}
	}

	function addForm(movieTitle, movieID, curUser) {
		if (movieTitle && movieID) {
			return (
				<>
					{index === -1 ? <button onClick={() => setOpenModal(true)}>Add review</button> : null}
					{openModal ? (
						curUser ? (
							<ReviewNewForm
								setModal={setOpenModal}
								setFetch={setFetch}
								movieID={movieID}
								movieTitle={movieTitle}
								curUser={curUser}
							/>
						) : (
							<LoginNotification setModal={setOpenModal} />
						)
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
