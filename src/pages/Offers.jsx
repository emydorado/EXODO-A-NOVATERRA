import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import OfferCard from '../components/OfferCard';
import offers from '../data/offers';
import './offers.css';

const Offers = () => {
	return (
		<div id='offers'>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<h2>OFFERS</h2>
			{offers.map((offer) => (
				<OfferCard key={offer.id} carriage={offer.carriage} capacity={offer.capacity} cost={offer.cost} />
			))}
			<div className='timer'>
				<h3>
					<b>Tiempo Restante</b>
				</h3>
				<p>20 segundos</p>
			</div>
		</div>
	);
};

export default Offers;
