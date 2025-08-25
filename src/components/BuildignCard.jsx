import './buildingCard.css';

const BuildingCard = ({ image, title, description, capacity }) => {
	return (
		<div id='building-card'>
			<img src={image} />
			<div className='building-properties'>
				<h3>{title}</h3>
				<p>{description}</p>
				<p>
					<b>Capacidad: +{capacity}</b>
				</p>
			</div>
		</div>
	);
};

export default BuildingCard;
