import './OfferCard.css';

const OfferCard = ({
	capacity,
	cost,
	carriage,
	onClick,
	isSelected,
	canFreeze = false,
	isFrozen = false,
	onFreezeToggle,
}) => {
	return (
		<div
			className={`offer-card ${isSelected ? 'offer-card--selected' : ''}`}
			onClick={onClick}
			role='button'
			tabIndex={0}
			onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && onClick?.()}
		>
			<div className='offer-card-text'>
				<p>{carriage}</p>
				<h3>{capacity} HUMANOS</h3>
				{canFreeze && (
					<button
						type='button'
						className={`freeze-btn ${isFrozen ? 'active' : ''}`}
						onClick={(e) => {
							e.stopPropagation();
							onFreezeToggle?.();
						}}
					>
						{isFrozen ? 'DESCONGELAR' : 'CONGELAR'}
					</button>
				)}
			</div>
			<div className='cost-container'>
				<h3>
					<b>${cost}</b>
				</h3>
			</div>
		</div>
	);
};

export default OfferCard;
