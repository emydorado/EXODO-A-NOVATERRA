import events from '../data/events';
import { useMemo } from 'react';
import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import './event.css';

const Event = () => {
	const randomEvent = useMemo(() => {
		if (events.length === 0) return null;
		const idx = Math.floor(Math.random() * events.length);
		return events[idx];
	}, []);

	if (!randomEvent) return null;

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
			<button>SIGUIENTE RONDA</button>
		</div>
	);
};

export default Event;
