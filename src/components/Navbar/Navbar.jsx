import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../shared/LoginForm";
import SearchBar from "./SearchBar";

function Navbar() {
	const [openModal, setOpenModal] = useState(false);
	const [token, setToken] = useState(localStorage.getItem("JWT"));

	return (
		<div className="navBar">
			<div className="navLinks">
				<NavLink to="/" className={"reelsLink"}>
					Reels
				</NavLink>
				<NavLink to="/library" className={"libraryLink"}>
					Library
				</NavLink>
			</div>
			<SearchBar />
			{token ? (
				<button
					onClick={() => {
						localStorage.removeItem("JWT");
						setToken("");
					}}>
					Logout
				</button>
			) : (
				<>
					<button onClick={() => setOpenModal(true)}>Login</button>
					{openModal ? <LoginForm setModal={setOpenModal} setToken={setToken} /> : null}
				</>
			)}
		</div>
	);
}

export default Navbar;
