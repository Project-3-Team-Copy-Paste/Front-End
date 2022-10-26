import React from 'react';

function ReviewForm({ review, setModal }) {
	return (
		<div className='screenDimmer'>
			<div className='modal reviewItem reviewForm'>
				<h3 className='reviewTitle'>{review.title}</h3>
				<h4 className='movieTitle'>Movie: {review.movie_title}</h4>
				<p className='reviewBody'>{review.body}</p>
				<p className='reviewAuthor'>Review by {review.author.username}</p>
				<p className='reviewRating'>Rating: {review.rating}/10</p>
				<button onClick={() => setModal(false)}>Close</button>
			</div>
		</div>
	);
}

export default ReviewForm;
