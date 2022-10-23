import React, { useEffect, useState } from "react";
import { fetchAllUsers, postReview } from "../../functions/fetch";

const inputStyle = {
	color: "black",
	borderRadius: "3px",
};

const initialValues = {
	title: "",
	body: "",
	rating: 5,
	author: "",
};

function ReviewForm({ setModal, movieTitle, movieID }) {
	const [users, setUsers] = useState(null);
	const [formValues, setFormValues] = useState(initialValues);

	useEffect(() => {
		const abortController = new AbortController();
		fetchAllUsers(abortController.signal)
			.then((res) => setUsers(res))
			.catch((err) => {
				if (!abortController.signal.aborted) {
					console.error(err);
				}
			});
		return () => {
			abortController.abort();
		};
	}, []);

	function handleChange(e) {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
		console.log(formValues);
	}

	function handleSubmit(e) {
		e.preventDefault();
		postReview({ movie: movieID, ...formValues })
			.then((res) => {
				setModal(false);
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
					<label htmlFor="author">Author</label>
					<select
						name="user"
						id="author"
						required={true}
						value={formValues.author}
						onChange={handleChange}
						style={inputStyle}>
						{users && users.length > 0 ? (
							users.map((user) => <option label={user.username} value={user._id} key={user._id} />)
						) : (
							<option disabled={true}>No users</option>
						)}
					</select>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default ReviewForm;
