import './OfferCard.css';

const OfferCard = ({ capacity, cost, onSelect }) => {
	return (
		<div id='offer-card' onClick={onSelect}>
			<div className='offer-card-text'>
				<h3>{capacity}</h3>
				<p>A TRASLADAR</p>
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
