import React, { useState } from 'react';
import ReviewEditForm from './ReviewEditForm';
import ReadMore from './ReadMore';
import ReviewForm from './ReviewForm';

function Review({ review, movieTitle, setFetch, curUser }) {
	const [openModal, setOpenModal] = useState(false);
	const [reviewFormModal, setReviewFormModal] = useState(false);

	function renderForm(author, curUser) {
		if (author === curUser) {
			return (
				<>
					<button className='reviewEdit' onClick={() => setOpenModal(true)}>
						Edit Review
					</button>
					{openModal ? (
						<ReviewEditForm
							setModal={setOpenModal}
							review={review}
							movieTitle={movieTitle}
							setFetch={setFetch}
						/>
					) : null}
				</>
			);
		}
	}

	return (
		<div className='reviewItem'>
			{reviewFormModal ? (
				<ReviewForm review={review} setModal={setReviewFormModal} />
			) : null}
			<h3 className='reviewTitle'>
				{
					<ReadMore
						text={review.title}
						type={'title'}
						setModal={setReviewFormModal}
					/>
				}
			</h3>
			<h4 className='movieTitle'>Movie: {review.movie_title}</h4>
			<p className='reviewBody'>
				{
					<ReadMore
						text={review.body}
						type={'body'}
						setModal={setReviewFormModal}
					/>
				}
			</p>
			<p className='reviewAuthor'>Review by {review.author.username}</p>
			<p className='reviewRating'>Rating: {review.rating}/10</p>
			{renderForm(review.author.username, curUser)}
		</div>
	);
}

export default Review;
