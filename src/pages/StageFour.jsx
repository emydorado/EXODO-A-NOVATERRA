import Stages from '../components/Stages';
import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import OfferCard from '../components/OfferCard';
import './stageFour.css';

const StageFour = () => {
	const [purchasedOffers, setPurchasedOffers] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const raw = localStorage.getItem('lastRoundOffers');
		setPurchasedOffers(raw ? JSON.parse(raw) : []);
	}, []);

	return (
		<div id='stage-four'>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<h2>HAGAN SUS TRANSACCIONES</h2>
			<p className='stage-four-descript'>Entreguen el valor de sus ofertas al banco</p>
			<h3>Ofertas compradas:</h3>

			<div className='offer-cards'>
				{purchasedOffers.length > 0 ? (
					purchasedOffers.map((offer) => (
						<OfferCard
							key={offer.id}
							carriage={offer.carriage}
							capacity={offer.capacity}
							cost={offer.cost}
							onClick={undefined} // sin interacción
							isSelected={false}
							disabled={true} // render deshabilitado
						/>
					))
				) : (
					<p>No se compraron ofertas en esta ronda.</p>
				)}
			</div>

			<p className='stage-four-tip'>Si varios quieren la misma oferta, ¡lancen el dado!</p>
			<button onClick={() => navigate('/stageFive')}>CONTINUAR</button>
		</div>
	);
};

export default StageFour;
