import events from '../data/events';
import { useMemo } from 'react';
import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import './event.css';
import { useNavigate } from 'react-router-dom';
import buildings from '../data/buildings';

const Event = () => {
	const navigate = useNavigate();

	const randomEvent = useMemo(() => {
		if (events.length === 0) return null;

		// Cargar eventos ya usados del localStorage
		const usedEvents = JSON.parse(localStorage.getItem('usedEvents') || '[]');

		// Filtrar los no usados
		const availableEvents = events.filter((e) => !usedEvents.includes(e.id));

		if (availableEvents.length === 0) {
			// Si ya usamos todos, reiniciamos para empezar de nuevo
			localStorage.setItem('usedEvents', JSON.stringify([]));
			return null;
		}

		// Elegir uno aleatorio de los disponibles
		const idx = Math.floor(Math.random() * availableEvents.length);
		return availableEvents[idx];
	}, []);

	if (!randomEvent) return null;

	console.log(randomEvent);

	const handleNext = () => {
		// guardar el id del evento
		const usedEvents = JSON.parse(localStorage.getItem('usedEvents') || '[]');
		usedEvents.push(randomEvent.id);
		localStorage.setItem('usedEvents', JSON.stringify(usedEvents));

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

		// === evento 2: borra el último edificio si NO tienes el 6, pero lo regresa a la tienda ===
		if (randomEvent.id === 2) {
			const STORAGE_AVAILABLE = 'availableBuildings';
			const STORAGE_SELECTED = 'selectedBuildings';

			const safeJSON = (raw, fallback) => {
				try {
					return raw ? JSON.parse(raw) : fallback;
				} catch {
					return fallback;
				}
			};

			const dedupeById = (arr) => {
				const seen = new Set();
				const res = [];
				for (const it of arr) {
					if (!seen.has(it.id)) {
						seen.add(it.id);
						res.push(it);
					}
				}
				return res;
			};

			const storedBuildings = localStorage.getItem(STORAGE_SELECTED);
			if (storedBuildings) {
				try {
					const selected = safeJSON(storedBuildings, []);
					const hasBuilding6 = selected.some((b) => b.id === 6);

					if (!hasBuilding6 && selected.length > 0) {
						// 1) sacar el último edificio seleccionado
						const removedBuilding = selected[selected.length - 1];
						const updatedSelected = selected.slice(0, -1);
						localStorage.setItem(STORAGE_SELECTED, JSON.stringify(updatedSelected));

						// 2) devolverlo a la tienda (availableBuildings)
						const rawAvail = localStorage.getItem(STORAGE_AVAILABLE);
						// Fallback al catálogo base importado
						const available = safeJSON(rawAvail, buildings);
						const updatedAvailable = dedupeById([removedBuilding, ...available]); // al inicio

						localStorage.setItem(STORAGE_AVAILABLE, JSON.stringify(updatedAvailable));

						// 3) actualizar capacidad (elige A o B)
						// A) si llevas contador persistente:
						const capRaw = localStorage.getItem('currentCapacity');
						if (capRaw !== null) {
							const currentCap = parseInt(capRaw || '0', 10);
							const newCap = Math.max(0, currentCap - (removedBuilding.capacity || 0));
							localStorage.setItem('currentCapacity', String(newCap));
						}

						// B) si prefieres recalcularla desde selectedBuildings (+ bonus):
						/*
        const bonus = parseInt(localStorage.getItem('capacityBonus') || '0', 10);
        const recomputed = updatedSelected.reduce((acc, b) => acc + (b.capacity || 0), 0) + bonus;
        localStorage.setItem('currentCapacity', String(recomputed));
        */
					}
				} catch (err) {
					console.error('Error leyendo selectedBuildings / availableBuildings:', err);
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
