import React from "react";
import { NavLink } from "react-router-dom";
import SearchBar from "./SearchBar";

function Navbar() {
	return (
		<div className="navBar">
			<span className="reelsLink">
				<NavLink to="/">Reels</NavLink>
			</span>
			<span className="libraryLink">
				<NavLink to="/library">Library</NavLink>
			</span>
			<span className="searchBar">
				<SearchBar />
			</span>
		</div>
	);
}

export default Navbar;
