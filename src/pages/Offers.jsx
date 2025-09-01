import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import OfferCard from '../components/OfferCard';
import offers from '../data/offers';
import Capacity from '../components/Capacity';
import { useState, useEffect, useMemo } from 'react';
import './offers.css';
import { useNavigate } from 'react-router-dom';

function getRandomOffers(offers, minId, maxId, count = 5) {
	const filtered = offers.filter((o) => o.id >= minId && o.id <= maxId);
	const shuffled = [...filtered].sort(() => 0.5 - Math.random());
	return shuffled.slice(0, count);
}

const Offers = () => {
	const [currentOffers, setCurrentOffers] = useState([]);
	const [totalCapacity, setTotalCapacity] = useState(0);
	const [selectedOffers, setSelectedOffers] = useState([]);
	const [timeLeft, setTimeLeft] = useState(30);
	const [errorMsg, setErrorMsg] = useState('');
	const navigate = useNavigate();

	useEffect(() => {
		const storedRound = parseInt(localStorage.getItem('round') || '1', 10);

		if (storedRound === 1) {
			setCurrentOffers(getRandomOffers(offers, 1, 11));
		} else if (storedRound >= 2 && storedRound <= 5) {
			setCurrentOffers(getRandomOffers(offers, 12, 21));
		} else if (storedRound >= 6 && storedRound <= 7) {
			setCurrentOffers(getRandomOffers(offers, 22, 30));
		} else if (storedRound >= 8 && storedRound <= 10) {
			setCurrentOffers(getRandomOffers(offers, 31, 39));
		}
	}, []);

	// traer ofertas seleccionadas
	useEffect(() => {
		const stored = localStorage.getItem('selectedOffers');
		if (stored) {
			setSelectedOffers(JSON.parse(stored));
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
		if (selectedOffers.find((o) => o.id === offer.id)) {
			setSelectedOffers((prev) => prev.filter((o) => o.id !== offer.id));
			return;
		}

		if (selectedCapacity + (offer.capacity || 0) > totalCapacity) {
			setErrorMsg('');
			setTimeout(() => {
				setErrorMsg('No puedes exceder la capacidad disponible.');
			}, 0);
			return;
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

	return (
		<div id='offers'>
			{errorMsg && (
				<div className='custom-alert'>
					<span>{errorMsg}</span>
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
					return (
						<OfferCard
							key={offer.id}
							carriage={offer.carriage}
							capacity={offer.capacity}
							cost={offer.cost}
							onClick={() => handleToggleOffer(offer)}
							isSelected={isSelected}
							disabled={wouldExceed}
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
