import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import OfferCard from '../components/OfferCard';
import offers from '../data/offers';
import Capacity from '../components/Capacity';
import { useState, useEffect, useMemo } from 'react';
import './offers.css';
import { useNavigate } from 'react-router-dom';

const Offers = () => {
	const [totalCapacity, setTotalCapacity] = useState(0);
	const [selectedOffers, setSelectedOffers] = useState([]);
	const [timeLeft, setTimeLeft] = useState(20);
	const [errorMsg, setErrorMsg] = useState('');

	const navigate = useNavigate();

	useEffect(() => {
		const stored = localStorage.getItem('selectedBuildings');

		if (stored) {
			const parsed = JSON.parse(stored);
			const sum = parsed.reduce((acc, building) => acc + (building.capacity || 0), 0);
			setTotalCapacity(sum);
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

	//timer
	useEffect(() => {
		if (timeLeft <= 0) {
			navigate('/stageFour');
			return;
		}

		const interval = setInterval(() => {
			setTimeLeft((prev) => prev - 1);
		}, 1000);

		return () => clearInterval(interval);
	}, [timeLeft, navigate]);

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
			{offers.map((offer, idx) => {
				const isSelected = !!selectedOffers.find((o) => o.id === offer.id);
				const wouldExceed = !isSelected && offer.capacity > remainingCapacity;

				return (
					<OfferCard
						key={`${offer.id}-${idx}`}
						carriage={offer.carriage}
						capacity={offer.capacity}
						cost={offer.cost}
						onClick={() => handleToggleOffer(offer)}
						isSelected={isSelected}
						disabled={wouldExceed}
					/>
				);
			})}

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
