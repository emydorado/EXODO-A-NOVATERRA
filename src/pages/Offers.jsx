import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import OfferCard from '../components/OfferCard';
import offers from '../data/offers';
import Capacity from '../components/Capacity';
import { useState, useEffect, useMemo } from 'react';
import './offers.css';
import { useNavigate } from 'react-router-dom';

function pickRange(round) {
	if (round >= 1 && round <= 2) return [1, 11];
	if (round >= 3 && round <= 4) return [12, 21];
	if (round >= 5 && round <= 6) return [22, 30];
	return [31, 39]; // 7-10 (ajusta a tus tramos exactos)
}

function getRandomOffers(offers, minId, maxId, count = 5, excludeIds = []) {
	const filtered = offers.filter((o) => o.id >= minId && o.id <= maxId && !excludeIds.includes(o.id));
	const shuffled = [...filtered].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

const Offers = () => {
	const [currentOffers, setCurrentOffers] = useState([]);
	const [totalCapacity, setTotalCapacity] = useState(null);
	const [selectedOffers, setSelectedOffers] = useState([]);
	const [timeLeft, setTimeLeft] = useState(30);
	const [errorMsg, setErrorMsg] = useState('');
	const [hasCryoNova, setHasCryoNova] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [frozenId, setFrozenId] = useState(() => {
		const raw = localStorage.getItem('frozenOffer');
		return raw ? JSON.parse(raw).id : null;
	});

	const [round, setRound] = useState(() => parseInt(localStorage.getItem('round') || '1', 10));

	const navigate = useNavigate();

	useEffect(() => {
		const read = () => {
			const r = parseInt(localStorage.getItem('round') || '1', 10);
			setRound((prev) => (prev !== r ? r : prev));
		};
		const onStorage = (e) => {
			if (e.key === 'round') read();
		};
		window.addEventListener('storage', onStorage);
		const id = setInterval(read, 400); // asegura cambios en el mismo tab
		return () => {
			window.removeEventListener('storage', onStorage);
			clearInterval(id);
		};
	}, []);

	useEffect(() => {
		const [minId, maxId] = pickRange(round);

		const frozenRaw = localStorage.getItem('frozenOffer');
		const frozenObj = frozenRaw ? JSON.parse(frozenRaw) : null;

		const N = 5; // o 3, según tu UI
		const exclude = frozenObj ? [frozenObj.id] : [];

		let base = getRandomOffers(offers, minId, maxId, N, exclude);

		// Si quieres exactamente N cartas y hay congelada, anteponla y recorta
		if (frozenObj) {
			base = [frozenObj, ...base].slice(0, N);
		}

		setCurrentOffers(base);
	}, [round, frozenId]); // <- clave

	// traer ofertas seleccionadas
	useEffect(() => {
		const stored = localStorage.getItem('selectedBuildings');
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				setHasCryoNova(parsed.some((b) => b.id === 8));
			} catch (e) {
				console.error('Error leyendo selectedBuildings:', e);
			}
		}
	}, []);

	// Guardar seleccionados
	useEffect(() => {
		localStorage.setItem('selectedOffers', JSON.stringify(selectedOffers));
	}, [selectedOffers]);

	// Capacidad ya tomada y restante (numérica)
	const selectedCapacity = useMemo(
		() => selectedOffers.reduce((acc, o) => acc + (o.capacity || 0), 0),
		[selectedOffers]
	);
	const remainingCapacity = Math.max(0, totalCapacity - selectedCapacity);

	const handleToggleOffer = (offer) => {
		const isSelected = selectedOffers.some((o) => o.id === offer.id);
		if (isSelected) {
			setSelectedOffers((prev) => prev.filter((o) => o.id !== offer.id));
			return;
		}
		if (selectedCapacity + (offer.capacity || 0) > totalCapacity) {
			setErrorMsg('');
			setTimeout(() => setErrorMsg('No puedes exceder la capacidad disponible.'), 0);
			return;
		}

		if (frozenId && offer.id === frozenId) {
			localStorage.removeItem('frozenOffer');
			setFrozenId(null); // <- rebuild por efecto

			setSuccessMsg('Oferta congelada comprada con éxito');
			setTimeout(() => setSuccessMsg(''), 2000); // opcional: ocultar a los 2s
		}

		setSelectedOffers((prev) => [...prev, offer]);
	};

	useEffect(() => {
		const stored = localStorage.getItem('selectedBuildings');
		const bonus = Number(localStorage.getItem('capacityBonus') || 0);

		let sum = 0;
		if (stored) {
			try {
				const parsed = JSON.parse(stored);
				sum = parsed.reduce((acc, b) => acc + (b.capacity || 0), 0);
			} catch (e) {
				console.error('Error leyendo selectedBuildings:', e);
			}
		}

		setTotalCapacity(sum + bonus);
	}, []);

	//timer
	useEffect(() => {
		if (timeLeft <= 0) {
			//guardar snapshot de compras de la ronda ---
			localStorage.setItem('lastRoundOffers', JSON.stringify(selectedOffers));
			const totalCost = selectedOffers.reduce((acc, o) => acc + (o.cost || 0), 0);
			localStorage.setItem('lastRoundTotalCost', String(totalCost));

			// 1) sumar humanos de esta ronda
			const savedThisRound = selectedOffers.reduce((acc, o) => acc + (o.capacity || 0), 0);
			const totalSaved = parseInt(localStorage.getItem('totalSavedHumans') || '0', 10);
			localStorage.setItem('totalSavedHumans', totalSaved + savedThisRound);

			// 2) limpiar ofertas de la ronda
			localStorage.removeItem('selectedOffers');

			// 3) limpiar bonus TEMPORAL (se consumió esta ronda)
			localStorage.removeItem('capacityBonus');

			// 4) navegar a stageFour
			navigate('/stageFour');
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft, navigate, selectedOffers]);

	const handleFreezeToggle = (offer) => {
		if (!hasCryoNova) return;

		const raw = localStorage.getItem('frozenOffer');
		const already = raw ? JSON.parse(raw) : null;

		if (already && already.id === offer.id) {
			localStorage.removeItem('frozenOffer');
			setFrozenId(null); // <- dispara el efecto de rebuild
			return;
		}

		localStorage.setItem('frozenOffer', JSON.stringify(offer));
		setFrozenId(offer.id); // <- dispara el efecto de rebuild
	};

	return (
		<div id='offers'>
			{errorMsg && (
				<div className='custom-alert'>
					<span>{errorMsg}</span>
				</div>
			)}

			{successMsg && (
				<div className='succes-alert'>
					<span>{successMsg}</span>
				</div>
			)}

			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<h2>OFERTAS</h2>
			<div className='capacity-container'>
				<div className='actual-capacity'>
					<p>Capacidad actual:</p>
					<Capacity number={totalCapacity} />
				</div>
				<div className='actual-capacity'>
					<p>Capacidad restante:</p>
					<Capacity number={remainingCapacity} />
				</div>
			</div>
			<div className='offer-cards'>
				{currentOffers.map((offer) => {
					const isSelected = !!selectedOffers.find((o) => o.id === offer.id);
					const wouldExceed = !isSelected && offer.capacity > remainingCapacity;
					const isFrozenThisCard = frozenId === offer.id;

					return (
						<OfferCard
							key={offer.id}
							carriage={offer.carriage}
							capacity={offer.capacity}
							cost={offer.cost}
							onClick={() => {
								if (wouldExceed) {
									setErrorMsg('');
									setTimeout(() => setErrorMsg('No puedes exceder la capacidad disponible.'), 0);
									return;
								}
								handleToggleOffer(offer);
							}}
							isSelected={isSelected}
							disabled={wouldExceed}
							canFreeze={hasCryoNova}
							isFrozen={isFrozenThisCard}
							onFreezeToggle={() => handleFreezeToggle(offer)}
						/>
					);
				})}
			</div>
			<div className='timer'>
				<h3>
					<b>Tiempo Restante</b>
				</h3>
				<p>{timeLeft} segundos</p>
			</div>
		</div>
	);
};

export default Offers;
