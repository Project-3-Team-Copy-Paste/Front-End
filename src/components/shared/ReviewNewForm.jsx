import React, { useState } from "react";
import { postReview } from "../../functions/fetch";

const initialValues = {
	title: "",
	body: "",
	rating: 5,
};

function ReviewForm({ setModal, setFetch, movieTitle, movieID, curUser }) {
	const [formValues, setFormValues] = useState(initialValues);
	console.log(formValues);

	function handleChange(e) {
		if (e.target.name === "rating") {
			setFormValues({
				...formValues,
				rating: Math.max(Math.min(Number(e.target.value ?? 0), 10), 0),
			});
		} else {
			setFormValues({
				...formValues,
				[e.target.name]: e.target.value,
			});
		}
	}

	function handleSubmit(e) {
		e.preventDefault();
		const jwtToken = localStorage.getItem("JWT");
		postReview({ movie: `${movieID}`, ...formValues, author: curUser, movie_title: movieTitle }, jwtToken)
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
			<div className="modal newReviewModal">
				<button onClick={() => setModal(false)} className="closeFormBtn">
					X
				</button>
				<form className="newReviewForm" action="" onSubmit={handleSubmit}>
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
						onChange={handleChange}></textarea>
					<label htmlFor="rating">Rating</label>
					<input
						type="number"
						name="rating"
						id="rating"
						min={0}
						max={10}
						value={formValues.rating}
						onChange={handleChange}
					/>
					<p>{`Author: ${curUser}`}</p>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default ReviewForm;
