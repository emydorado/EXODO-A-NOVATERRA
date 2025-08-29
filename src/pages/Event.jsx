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

		// actualizar ronda
		const currentRound = parseInt(localStorage.getItem('round') || '1', 10);
		localStorage.setItem('round', currentRound + 1);

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
