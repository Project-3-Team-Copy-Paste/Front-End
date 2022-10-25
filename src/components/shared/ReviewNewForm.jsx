import React, { useState } from "react";
import { postReview } from "../../functions/fetch";

const inputStyle = {
	color: "black",
	borderRadius: "3px",
};

const initialValues = {
	title: "",
	body: "",
	rating: 5,
};

function ReviewForm({ setModal, setFetch, movieTitle, movieID, curUser }) {
	const [formValues, setFormValues] = useState(initialValues);

	function handleChange(e) {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
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
		<div className="screenDimmer"
			// style={{
			// 	position: "absolute",
			// 	top: "0%",
			// 	left: "0%",
			// 	width: "100vw",
			// 	height: "100vh",
			// 	backgroundColor: "hsla(0, 0%, 0%, 0.25)",
			// }}
			>
			<button onClick={() => setModal(false)}className="closeFormBtn">X</button> 
			<div className="modal newReviewForm"
				// style={{
				// 	position: "absolute",
				// 	background: "white",
				// 	top: "50%",
				// 	left: "50%",
				// 	translate: "-50% -50%",
				// 	minWidth: "25rem",
				// 	minHeight: "40rem",
				// 	border: "5px solid black",
				// 	zIndex: 1,
				// }}
				>

				<form
					action=""
					style={{
						margin: "2rem",
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						color: "black",
					}}
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
						style={inputStyle}
					/>
					<label htmlFor="body">Body</label>
					<textarea
						name="body"
						id="body"
						cols="30"
						rows="10"
						value={formValues.body}
						onChange={handleChange}
						style={inputStyle}></textarea>
					<label htmlFor="rating">Rating</label>
					<input
						type="number"
						name="rating"
						id="rating"
						value={formValues.rating}
						onChange={handleChange}
						style={inputStyle}
					/>
					<p>{`Author: ${curUser}`}</p>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default ReviewForm;
