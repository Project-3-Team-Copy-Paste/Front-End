import { movies } from "./SeedMovies";

export default function FetchData(params) {
	return [
		{
			name: "The Dark Knight",
			image: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg",
			description:
				"When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
			contentRating: "PG-13",
			genre: ["Action", "Crime", "Drama"],
			datePublished: "2008-07-18",
			trailer: {
				thumbnail: {
					contentUrl:
						"https://m.media-amazon.com/images/M/MV5BNWJkYWJlOWMtY2ZhZi00YWM0LTliZDktYmRiMGYwNzczMTZhXkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_.jpg",
				},
				url: "https://www.imdb.com/video/vi324468761/",
			},
		},
	];
}

export async function fetchAllMovies() {
	try {
		if (!movies) {
			throw new Error("No movies in collection");
		}
		return movies;
	} catch (err) {
		console.error(err);
	}
}

export async function fetchMovie(name) {
	try {
		const movie = movies.find((movie) => movie[1].jsonnnob.name === name);
		if (!movie) {
			throw new Error("Movie not found");
		}
		return movie;
	} catch (err) {
		console.error(err);
	}
}
