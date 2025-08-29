import { useEffect, useState } from 'react';
import lose from '../assets/lose.png';
import './winLose.css';
import { useNavigate } from 'react-router-dom';

const Lose = () => {
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
			<h1>DERROTA</h1>
			<img src={lose} className='lose-img' />
			<div className='bottom-text'>
				<p>Salavaron a {savedHumans} humanos</p>
				<h3>No hay suficientes personas para repoblar el mundo</h3>
				<button className='play-again' onClick={handlePlayAgain}>
					Volver a jugar
				</button>
			</div>
		</div>
	);
};

export default Lose;
