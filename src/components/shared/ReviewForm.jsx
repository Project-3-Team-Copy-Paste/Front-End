import React from "react";

function ReviewForm() {
	return (
		<div
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				translate: "-50% -50%",
				minWidth: "25rem",
				minHeight: "40rem",
				border: "5px solid black",
			}}>
			<form action="" style={{ margin: "2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
				<label htmlFor="title">Title</label>
				<input type="text" id="title" />
				<label htmlFor="body">Body</label>
				<textarea name="" id="body" cols="30" rows="10"></textarea>
				<label htmlFor="rating">Rating</label>
				<input type="number" id="rating" />
				<label htmlFor="author">Author</label>
				<select name="" id="author">
					<option value="Jon">Jon</option>
					<option value="Vlad">Vlad</option>
					<option value="Edward">Edward</option>
				</select>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default ReviewForm;
