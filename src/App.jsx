import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import WatchListPage from './components/pages/WatchListPage';
import JournalPage from './components/pages/JournalPage';
import MainPage from './components/pages/MainPage';
import SpecificMoviePage from './components/pages/SpecificMoviePage';
import './styles/App.css';

function App() {
	const [token, setToken] = useState(localStorage.getItem('JWT') || '');

	return (
<<<<<<< HEAD
		<div className='app'>
			<Navbar token={token} setToken={setToken} />
			<Routes>
				<Route path='/' element={<MainPage />}></Route>
				<Route path='/watchlist' element={<WatchListPage />}></Route>
				<Route path='/journal' element={<JournalPage />}></Route>
				<Route path='/library/:movieID' element={<SpecificMoviePage />}></Route>
			</Routes>
=======
		<div className="app">
			<Navbar />	
				<Routes>
					<Route path="/" element={<MainPage />}></Route>
					<Route path="/library" element={<LibraryPage />}></Route>
					<Route path="/library/:movieID" element={<SpecificMoviePage />}></Route>
				</Routes>
>>>>>>> b88701c (Update CSS)
			<Footer />
		</div>
	);
}

export default App;
