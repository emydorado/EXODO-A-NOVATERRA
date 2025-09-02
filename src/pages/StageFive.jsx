import Stages from '../components/Stages';
import people from '../assets/people.png';
import onlyNovaterra from '../assets/onlyNovaterra.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
const StageFive = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const players = location.state?.players || 3;

	// reto según cantidad de jugadores
	const numberChallenge = useCallback(() => {
		if (players === 3) return 400;
		if (players === 4 || players === 5) return 550;
		return 700;
	}, [players]);

	const handleNext = () => {
		const round = parseInt(localStorage.getItem('round') || '1', 10);

		if (round < 10) {
			// rondas 1–9
			navigate('/events');
		} else {
			// ronda 10 → verificar humanos salvados
			const saved = getTotalSavedHumans();
			const target = numberChallenge();

			if (saved >= target) {
				navigate('/win');
			} else {
				navigate('/lose');
			}
		}
	};

	function getTotalSavedHumans() {
		return parseInt(localStorage.getItem('totalSavedHumans') || '0', 10);
	}

	return (
		<>
			<Stages
				title='TRASLADEN LAS PERSONAS A'
				description='Muevan las fichas y tomen las tarjetas correspondientes.'
				logo={onlyNovaterra}
				image={people}
				btnText='SIGUIENTE'
				onClick={handleNext}
			/>
		</>
	);
};

export default StageFive;
