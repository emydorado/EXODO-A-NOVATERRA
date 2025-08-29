import { useState, useEffect } from 'react';
import win from '../assets/win.png';
import './winLose.css';
import { useNavigate } from 'react-router-dom';

const Win = () => {
	const [savedHumans, setSavedHumans] = useState(0);
	const navigate = useNavigate();

	useEffect(() => {
		const stored = localStorage.getItem('totalSavedHumans');
		setSavedHumans(parseInt(stored || '0', 10));
	}, []);

	const handlePlayAgain = () => {
		localStorage.clear();
		navigate('/');
	};

	return (
		<div id='win-lose'>
			<h1>FELICIDADES</h1>
			<img src={win} className='win-img' />
			<div className='bottom-text'>
				<p>Salavaron a {savedHumans} humanos</p>
				<h3>La humanidad a sido salvada</h3>
				<button className='play-again' onClick={handlePlayAgain}>
					Volver a jugar
				</button>
			</div>
		</div>
	);
};

export default Win;
