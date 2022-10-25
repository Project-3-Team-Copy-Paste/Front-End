import React, { useState } from "react";
import { deleteReview, editReview } from "../../functions/fetch";

function ReviewEditForm({ setModal, movieTitle, review, setFetch }) {
	const [formValues, setFormValues] = useState({ title: review.title, body: review.body, rating: review.rating });

	function handleChange(e) {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		const jwtToken = localStorage.getItem("JWT");
		editReview({ id: review._id, movie: review.movie, ...formValues, author: review.author }, review._id, jwtToken)
			.then((res) => {
				setModal(false);
				setFetch((c) => c + 1);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	function handleDelete(e) {
		e.preventDefault();
		const jwtToken = localStorage.getItem("JWT");
		deleteReview(review._id, jwtToken)
			.then((res) => {
				setModal(false);
				setFetch((c) => c + 1);
			})
			.catch((err) => {
				console.error(err);
			});
	}

	return (
		<div className="screenDimmer">
			<div className="modal editReviewModal">
				<div className="modalNav">
					<button onClick={handleDelete}
					className="deleteReviewBtn">Delete Review</button>
					<button onClick={() => setModal(false)} 	className="closeFormBtn">X</button>
				</div>
				<form className="editReviewForm"
					action=""
					onSubmit={handleSubmit}>
					<h3>{movieTitle}</h3>
					<label htmlFor="title">Title</label>
					<input
						type="text"
						name="title"
						id="title"
						required={true}
						value={formValues.title}
						onChange={handleChange}
					/>
					<label htmlFor="body">Body</label>
					<textarea
						name="body"
						id="body"
						cols="30"
						rows="10"
						value={formValues.body}
						onChange={handleChange}
						>
					</textarea>
					<label htmlFor="rating">Rating</label>
					<input
						type="number"
						name="rating"
						id="rating"
						value={formValues.rating}
						onChange={handleChange}
					/>
					<div>{`Author: ${review.author}`}</div>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default ReviewEditForm;
