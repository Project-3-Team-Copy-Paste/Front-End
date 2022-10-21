import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchMovieByName } from "../../functions/fetch";

function useSearch(query, setResults, setLoading) {}

function SearchBar() {
	const [query, setQuery] = useState("");
	const [results, setResults] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		if (query) {
			console.log(query);
			const abortController = new AbortController();
			fetchMovieByName(query, abortController.signal).then((movies) => {
				console.log(movies);
				if (movies) {
					setResults(movies.results);
				}
			});
			return () => {
				abortController.abort();
			};
		}
	}, [query]);

	const handleSubmit = useCallback(
		async (name) => {
			const movie = await fetchMovieByName(name);
			navigate(`/library/${movie.results[0].id}`);
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
				onChange={(e) => {
					setQuery(e.currentTarget.value);
				}}
			/>
			<datalist id="result-movies">
				{results.map((movie, index) => (
					<option value={movie.title} key={index} />
				))}
			</datalist>
			<button type="submit">Search</button>
		</form>
	);
}

export default SearchBar;
