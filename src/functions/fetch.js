import { movies } from "./SeedMovies";

async function fetchData(params) {
	const responseData = {
		0: {},
		1: {
			tt_url: 'https://www.imdb.com/title/tt0111161',
			jsonnnob: {
				name: 'The Shawshank Redemption',
				image:
					'https://m.media-amazon.com/images/M/MV5BMDFkYTc0MGEtZmNhMC00ZDIzLWFmNTEtODM1ZmRlYWMwMWFmXkEyXkFqcGdeQXVyMTMxODk2OTU@._V1_.jpg',
				description:
					'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
				genre: ['Drama'],
				datePublished: '1994-10-14',
				trailer: {
					thumbnail: {
						contentUrl:
							'https://m.media-amazon.com/images/M/MV5BNjQ2NDA3MDcxMF5BMl5BanBnXkFtZTgwMjE5NTU0NzE@._V1_.jpg',
					},
					url: 'https://www.imdb.com/video/vi3877612057/',
				},
			},
		},
	};

	const data = Object.values(responseData);
	data.splice(0, 1);

	return data.map((element) => {
		return {
			...element,
			tt_id: element.tt_url.replace('https://www.imdb.com/title/', ''),
		};
	});
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

// async function fetchApi(params) {
// 	const searchObject = {
// 		api: 'https://i-m-d-b.herokuapp.com/',
// 		endpoint: '',
// 		searchParams: params, //tt: '', q: '',
// 	};

// 	const url = new URL(`${searchObject.endpoint}`, `${searchObject.api}`);
// 	url.search = new URLSearchParams(searchObject.searchParams).toString();

// 	try {
// 		const response = await fetch(url);
// 		const data = await response.json();
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 	}
// }

export default fetchData;
