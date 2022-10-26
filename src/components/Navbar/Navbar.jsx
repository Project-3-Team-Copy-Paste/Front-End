import React, { useMemo, useState } from "react";
import { NavLink } from "react-router-dom";
import LoginForm from "../shared/LoginForm";
import RegisterForm from "../shared/RegisterForm";
import SearchBar from "./SearchBar";

function Navbar({ token, setToken }) {
	const [openLogin, setOpenLogin] = useState(false);
	const [openRegister, setOpenRegister] = useState(false);

	const username = useMemo(() => {
		if (token) {
			return localStorage.getItem("username");
		}
	}, [token]);

	return (
		<div className="navBar">
			<div className="linkFormBrick">
				<div className="navLinks">
					<NavLink to="/" className={"reelsLink"}>
						Reels
					</NavLink>
					{username ? (
						<>
							<NavLink to="/watchlist" className={"watchlistLink"}>
								Watchlist
							</NavLink>
							<NavLink to="/journal" className={"journalLink"}>
								Journal
							</NavLink>
						</>
					) : null}
				</div>
				<SearchBar />
			</div>
			
			{token ? (
				<div className='userBrick'>
					<div className='username'>{username}</div>
					<button className='logBtn logout'
						onClick={() => {
							localStorage.removeItem("JWT");
							localStorage.removeItem("username");
							localStorage.removeItem("userId");
							setToken("");
						}}>
						Logout
					</button>
				</div>
			) : (
				<div className='userBrick'>

					<button onClick={() => setOpenLogin(true)}>login</button>
					<button onClick={() => setOpenRegister(true)}>register</button>
					{openLogin ? <LoginForm setModal={setOpenLogin} setToken={setToken} /> : null}
					{openRegister ? <RegisterForm setModal={setOpenRegister} /> : null}

				</div>
			)}
		</div>
	);
}

export default Navbar;
