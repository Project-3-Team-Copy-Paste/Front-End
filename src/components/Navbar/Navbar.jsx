import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
	return (
		<div style={{ display: "flex", gap: "2rem" }}>
			<NavLink to="/">Reels</NavLink>
			<NavLink to="/library">Library</NavLink>
			<SearchBar />
		</div>
	);
}

export default Navbar;
