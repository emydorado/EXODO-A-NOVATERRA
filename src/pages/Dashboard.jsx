import './Dashboard.css';
import { useState } from 'react';
import earth from '../assets/earth.png';
import novaterra from '../assets/novaterra.png';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const navigate = useNavigate();
	const [players, setPlayers] = useState(3); // valor inicial = mínimo

	const decrease = () => {
		if (players > 3) {
			setPlayers(players - 1);
		}
	};

	const increase = () => {
		if (players < 8) {
			setPlayers(players + 1);
		}
	};

	const goToChallenge = () => {
		navigate('/challenge', { state: { players } });
	};

	return (
		<div id='dashboard'>
			<img src={earth} alt='earth' className='planet planet-top' />
			<div className='players-content'>
				<h1>EXODITAS</h1>
				<h3>Ha llegado la hora de salvar a la humanidad</h3>
				<p>N° de jugadores</p>
				<div className='players-number'>
					<button className='minus' onClick={decrease}>
						-
					</button>
					<h1>{players}</h1>
					<button onClick={increase}>+</button>
				</div>
				<button className='play-btn' onClick={goToChallenge}>
					JUGAR
				</button>
			</div>
			<img src={novaterra} alt='earth' className='planet planet-bottom' />
		</div>
	);
};

export default Dashboard;
