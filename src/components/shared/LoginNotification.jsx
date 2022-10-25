import React from "react";

function LoginNotification({ setModal }) {
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
					minHeight: "10rem",
					border: "5px solid black",
					zIndex: 1,
					textAlign: "center",
					color: "black",
				}}>
				<p> You need to login first!</p>
				<button onClick={() => setModal(false)}>OK</button>
			</div>
		</div>
	);
}

export default LoginNotification;
