import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
	return (
		<div className="navBar">
			<div className="navLinks">
				<NavLink to="/" className={"reelsLink"} >Reels</NavLink>
				<NavLink to="/library" className={"libraryLink"}>Library</NavLink>
			</div>
			<SearchBar />
		</div>
	);
}

export default Navbar;
