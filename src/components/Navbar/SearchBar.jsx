import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieByName } from "../../functions/fetch";

function SearchBar() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		async function filterMovies(filter) {
			try {
				const movies = await fetchMovieByName();
				const filteredResults = movies.filter((movie) =>
					movie["1"].jsonnnob.name.toLowerCase().includes(filter)
				);
				setResults(filteredResults);
			} catch (err) {
				console.error(err);
			}
		}
		if (query) {
			filterMovies(query.toLowerCase());
		}
	}, [query]);

	const handleSubmit = useCallback(
		async (name) => {
			// const movie = await fetchMovieByName(name);
			// const idStart = movie["1"].tt_url.lastIndexOf("/");
			// const id = movie["1"].tt_url.slice(idStart + 1);
			// navigate(`/library/${id}`);
		},
		[navigate]
	);

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				handleSubmit(query);
			}}>
			<input
				type="search"
				name=""
				id="search-movies"
				list="result-movies"
				placeholder="Search movie"
				autoComplete="off"
				value={query}
				onChange={(e) => setQuery(e.currentTarget.value)}
			/>
			<datalist id="result-movies">
				{results.map((result, index) => (
					<option value={result["1"].jsonnnob.name} key={index} />
				))}
			</datalist>
			<button type="submit">Search</button>
		</form>
	);
}

export default SearchBar;
