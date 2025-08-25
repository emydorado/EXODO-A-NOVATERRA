import './buildingCard.css';

const BuildingCard = ({ image, title, description, capacity, onSelect }) => {
	return (
		<div id='building-card' onClick={onSelect}>
			<img src={image} />
			<div className='building-properties'>
				<h3>{title}</h3>
				<p>{description}</p>
				<p>
					<b>+{capacity} humanos</b>
				</p>
			</div>
		</div>
	);
};

export default BuildingCard;
