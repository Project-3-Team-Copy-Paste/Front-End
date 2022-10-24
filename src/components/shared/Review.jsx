import React, { useState } from "react";
import ReviewEditForm from "./ReviewEditForm";

function Review({ review, movieTitle, setFetch, curUser }) {
	const [openModal, setOpenModal] = useState(false);

	function renderForm(author, curUser) {
		if (author === curUser) {
			return (
				<>
					<button onClick={() => setOpenModal(true)}>Edit Review</button>
					{openModal ? (
						<ReviewEditForm
							setModal={setOpenModal}
							review={review}
							movieTitle={movieTitle}
							setFetch={setFetch}
						/>
					) : null}
				</>
			);
		}
	}

	return (
		<div className="reviewItem">
			<h3>{review.title}</h3>
			<p>{review.rating}</p>
			{renderForm(review.author.username, curUser)}
		</div>
	);
}

export default Review;
