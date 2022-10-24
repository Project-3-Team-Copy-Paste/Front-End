import React, { useState } from "react";
import ReviewEditForm from "./ReviewEditForm";

function Review({ review, movieTitle, setFetch }) {
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className="reviewItem">
			<h3>{review.title}</h3>
			<p>{review.rating}</p>
			<button onClick={() => setOpenModal(true)}>Edit Review</button>
			{openModal ? (
				<ReviewEditForm setModal={setOpenModal} review={review} movieTitle={movieTitle} setFetch={setFetch} />
			) : null}
		</div>
	);
}

export default Review;
