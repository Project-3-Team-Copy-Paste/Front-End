import React, { useState } from "react";
import ReviewEditForm from "./ReviewEditForm";

function Review({ review, movieTitle }) {
	const [openModal, setOpenModal] = useState(false);
	return (
		<div className="reviewItem">
			<h3>{review.title}</h3>
			<p>{review.rating}</p>
			<button onClick={() => setOpenModal(true)}>Edit Review</button>
			{openModal ? <ReviewEditForm setModal={setOpenModal} review={review} movieTitle={movieTitle} /> : null}
		</div>
	);
}

export default Review;
