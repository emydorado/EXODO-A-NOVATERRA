import './OfferCard.css';

const OfferCard = ({ capacity, cost, onSelect, carriage }) => {
	return (
		<div id='offer-card' onClick={onSelect}>
			<div className='offer-card-text'>
				<p>{carriage}</p>
				<h3>{capacity}</h3>
			</div>
			<div className='cost-container'>
				<h2>
					<b>${cost}</b>
				</h2>
			</div>
		</div>
	);
};

export default OfferCard;
