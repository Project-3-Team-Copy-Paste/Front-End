import React from 'react';

function ReadMore({ text, type, setModal }) {
	function renderReadMore() {
		switch (type) {
			case 'title':
				return (
					<>
						{text.slice(0, 30)}
						<span
							className='readMore'
							onClick={() => {
								setModal(true);
							}}>
							...
						</span>
					</>
				);
			case 'body':
				return (
					<>
						{text.slice(0, 100) + '...'}
						<span
							className='readMore'
							onClick={() => {
								setModal(true);
							}}>
							Read more
						</span>
					</>
				);
		}
	}

	return <>{renderReadMore()}</>;
}

export default ReadMore;
