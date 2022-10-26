import React, { useState } from "react";
import { signUp } from "../../functions/fetch";

const inputStyle = {
	color: "black",
	borderRadius: "3px",
};

const initialState = {
	username: "",
	password: "",
	email: "",
};

function RegisterForm({ setModal }) {
	const [formValues, setFormValues] = useState(initialState);

	function handleChange(e) {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		signUp(formValues)
			.then((res) => {
				console.log(res);
				setModal(false);
			})
			.catch((err) => console.error(err.response.data));
	}

	return (
		<div className="screenDimmer">
			<div className="modal registerModal">
				<button className="closeFormBtn" onClick={() => setModal(false)}>X</button>
				<form className="registerForm"
					action=""
					onSubmit={handleSubmit}>
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						required={true}
						value={formValues.username}
						onChange={handleChange}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						required={true}
						value={formValues.password}
						onChange={handleChange}
					/>
					<label htmlFor="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						required={true}
						value={formValues.email}
						onChange={handleChange}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default RegisterForm;
