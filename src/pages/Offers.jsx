import OfferCard from '../components/OfferCard';
import offers from '../data/offers';

const Offers = () => {
	return (
		<>
			{offers.map((offer) => (
				<OfferCard key={offer.id} capacity={offer.capacity} cost={offer.cost} />
			))}
		</>
	);
};

export default Offers;
