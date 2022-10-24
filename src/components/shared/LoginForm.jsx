import React, { useState } from "react";
import { signIn } from "../../functions/fetch";

const inputStyle = {
	color: "black",
	borderRadius: "3px",
};

const initialState = {
	username: "",
	password: "",
};

function LoginForm({ setModal, setToken }) {
	const [formValues, setFormValues] = useState(initialState);

	function handleChange(e) {
		setFormValues({
			...formValues,
			[e.target.name]: e.target.value,
		});
	}

	function handleSubmit(e) {
		e.preventDefault();
		signIn(formValues)
			.then((res) => {
				localStorage.setItem("JWT", res.token);
				localStorage.setItem("username", res.username);
				setToken(res.token);
				setModal(false);
			})
			.catch((err) => console.error(err.response.data));
	}

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
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						id="username"
						required={true}
						value={formValues.username}
						onChange={handleChange}
						style={inputStyle}
					/>
					<label htmlFor="password">Password</label>
					<input
						type="password"
						name="password"
						id="password"
						value={formValues.password}
						onChange={handleChange}
						style={inputStyle}
					/>
					<button type="submit">Submit</button>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
