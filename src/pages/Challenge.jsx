import { useLocation } from 'react-router-dom';
import novaterra from '../assets/novaterra.png';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './challenge.css';

const Challenge = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const players = location.state?.players || 3;
	const [isLeaving, setIsLeaving] = useState(false);

	const numberChallenge = () => {
		if (players === 3) return 400;
		if (players === 4 || players === 5) return 550;
		return 700;
	};

	useEffect(() => {
		const fadeTimer = setTimeout(() => setIsLeaving(true), 2000);
		const navTimer = setTimeout(() => {
			navigate('/stageTwo', { state: { players } });
		}, 2500);

		return () => {
			clearTimeout(fadeTimer);
			clearTimeout(navTimer);
		};
	}, [navigate, players]);
	return (
		<div id='challenge' className={isLeaving ? 'fade-out' : ''}>
			<img src={novaterra} alt='earth' className='planet' />
			<div className='text-challenge'>
				<h3>Deben salvar a</h3>
				<div className='humans'>
					<h2>{numberChallenge()}</h2>
					<h2>HUMANOS</h2>
				</div>
			</div>
		</div>
	);
};

export default Challenge;
