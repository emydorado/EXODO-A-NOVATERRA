import './savedHumans.css';

const SavedHumans = () => {
	return (
		<div id='saved-humans'>
			<svg
				className='w-6 h-6 text-gray-800 dark:text-white'
				aria-hidden='true'
				xmlns='http://www.w3.org/2000/svg'
				width='30'
				height='30'
				fill='white'
				viewBox='0 0 24 24'
			>
				<path
					fillRule='evenodd'
					d='M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z'
					clipRule='evenodd'
				/>
			</svg>
			<h3>0</h3>
		</div>
	);
};

export default SavedHumans;
