import events from '../data/events';
import { useMemo } from 'react';
import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import './event.css';
import { useNavigate } from 'react-router-dom';

const Event = () => {
	const navigate = useNavigate();

	const randomEvent = useMemo(() => {
		if (events.length === 0) return null;
		const idx = Math.floor(Math.random() * events.length);
		return events[idx];
	}, []);

	if (!randomEvent) return null;

	const handleNext = () => {
		// guardar el id del evento
		localStorage.setItem('lastEventId', randomEvent.id);

		// aplicar evento 1
		if (randomEvent.id === 1) {
			const storedBuildings = localStorage.getItem('selectedBuildings');
			if (storedBuildings) {
				try {
					const parsed = JSON.parse(storedBuildings);
					const hasBuilding3 = parsed.some((b) => b.id === 3);

					if (!hasBuilding3) {
						const players = parseInt(localStorage.getItem('players') || '3', 10);
						const penalty = players * 5;
						const saved = parseInt(localStorage.getItem('totalSavedHumans') || '0', 10);

						const newTotal = Math.max(0, saved - penalty);
						localStorage.setItem('totalSavedHumans', newTotal);
					}
				} catch (err) {
					console.error('Error leyendo selectedBuildings:', err);
				}
			}
		}

		// aplicar evento 2

		if (randomEvent.id === 2) {
			const storedBuildings = localStorage.getItem('selectedBuildings');
			if (storedBuildings) {
				try {
					const parsed = JSON.parse(storedBuildings);
					const hasBuilding6 = parsed.some((b) => b.id === 6);

					if (!hasBuilding6) {
						const updated = parsed.slice(0, -1);
						localStorage.setItem('selectedBuildings', JSON.stringify(updated));
					}
				} catch (err) {
					console.error('Error leyendo selectedBuildings:', err);
				}
			}
		}

		// aplicar evento 3
		if (randomEvent.id === 3) {
			const penalty = 10;
			const saved = parseInt(localStorage.getItem('totalSavedHumans') || '0', 10);

			const newTotal = Math.max(0, saved - penalty);
			localStorage.setItem('totalSavedHumans', newTotal);
		}

		// aplicar evento 7

		if (randomEvent.id === 7) {
			const penalty = 10;
			const saved = parseInt(localStorage.getItem('totalSavedHumans') || '0', 10);

			const newTotal = Math.max(0, saved + penalty);
			localStorage.setItem('totalSavedHumans', newTotal);
		}

		// aplicar evento 8

		if (randomEvent.id === 8) {
			localStorage.setItem('capacityBonus', '10');
		}

		// actualizar ronda
		const currentRound = parseInt(localStorage.getItem('round') || '1', 10);
		localStorage.setItem('round', currentRound + 1);

		// navegar a la siguiente fase
		navigate('/stageOne');
	};

	return (
		<div id='event'>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<h2>{randomEvent.alert}</h2>
			<h3>{randomEvent.title}</h3>
			<img src={randomEvent.image} />
			<p>{randomEvent.description}</p>
			<button onClick={handleNext}>SIGUIENTE RONDA</button>
		</div>
	);
};

export default Event;
