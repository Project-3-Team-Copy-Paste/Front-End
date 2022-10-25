import React, { useMemo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import LoginForm from '../shared/LoginForm';
import SearchBar from './SearchBar';

function Navbar({ token, setToken }) {
	const [openModal, setOpenModal] = useState(false);

	const username = useMemo(() => {
		if (token) {
			return localStorage.getItem('username');
		}
	}, [token]);

	return (
		<div className='navBar'>
			<div className='navLinks'>
				<NavLink to='/' className={'reelsLink'}>
					Reels
				</NavLink>
				{localStorage.getItem('username') ? (
					<>
						<NavLink to='/watchlist' className={'watchlistLink'}>
							Watchlist
						</NavLink>
						<NavLink to='/journal' className={'journalLink'}>
							Journal
						</NavLink>
					</>
				) : null}
			</div>
			<SearchBar />
			{token ? (
				<>
					<span>{username}</span>
					<button
						onClick={() => {
							localStorage.removeItem('JWT');
							localStorage.removeItem('username');
							localStorage.removeItem('userId');
							setToken('');
						}}>
						Logout
					</button>
				</>
			) : (
				<>
					<button onClick={() => setOpenModal(true)}>Login</button>
					{openModal ? (
						<LoginForm setModal={setOpenModal} setToken={setToken} />
					) : null}
				</>
			)}
		</div>
	);
}

export default Navbar;
