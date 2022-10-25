import React from "react";

function LoginNotification({ setModal }) {
	return (
		<div className="screenDimmer">
			<div className="modal loginAlert">
				<p> You need to login first!</p>
				<button onClick={() => setModal(false)}>OK</button>
			</div>
		</div>
	);
}

export default LoginNotification;
