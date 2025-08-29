import { useState } from 'react';
import './savedHumans.css';
import { useEffect } from 'react';

const Rounds = () => {
	const [round, setRound] = useState(1);

	useEffect(() => {
		const stored = localStorage.getItem('round');
		if (stored) setRound(parseInt(stored, 10));
	}, []);

	return (
		<div id='rounds'>
			<h3>Ronda {round}</h3>
		</div>
	);
};

export default Rounds;
