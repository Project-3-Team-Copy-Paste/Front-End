import React from "react";

function Footer() {
	return (
		<div
			style={{
				position: "fixed",
				bottom: "0",
				height: "2rem",
				display: "flex",
				gap: "2rem",
				alignItems: "center",
			}}>
			<p>Copyright</p>
			<a href="https://github.com/vlados552">Vladislav</a>
			<a href="https://github.com/vlados552">Jon</a>
			<a href="https://github.com/vlados552">Edward</a>
		</div>
	);
}

export default Footer;
