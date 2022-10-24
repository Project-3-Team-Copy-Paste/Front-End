import React, { useMemo, useState } from "react";
import { deleteReview, editReview } from "../../functions/fetch";

const inputStyle = {
	color: "black",
	borderRadius: "3px",
};

function ReviewEditForm({ setModal, movieTitle, review, setFetch }) {
	const [formValues, setFormValues] = useState({ title: review.title, body: review.body, rating: review.rating });

	const jwtToken = localStorage.getItem("JWT");

	function handleChange(e) {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
		console.log(formValues);
	}

	function handleSubmit(e) {
		e.preventDefault();
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
		deleteReview(review._id, jwtToken)
			.then((res) => {
				setModal(false);
				setFetch((c) => c + 1);
			})
			.catch((err) => {
				console.error(err);
			});
	}
	// console.log(users);

	return (
		<div
			style={{
				position: "absolute",
				top: "0%",
				left: "0%",
				width: "100vw",
				height: "100vh",
				backgroundColor: "hsla(0, 0%, 0%, 0.25)",
			}}>
			<div
				style={{
					position: "absolute",
					background: "white",
					top: "50%",
					left: "50%",
					translate: "-50% -50%",
					minWidth: "25rem",
					minHeight: "40rem",
					border: "5px solid black",
					zIndex: 1,
				}}>
				<button onClick={() => setModal(false)}>X</button>
				<button onClick={handleDelete}>Delete Review</button>
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
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default ReviewEditForm;
