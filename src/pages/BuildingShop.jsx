import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import BuildingCard from '../components/buildignCard';
import resources from '../data/buildings';
import './buildingShop.css';

const BuildingShop = () => {
	return (
		<>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<div id='buildingShop'>
				<h2>SELECCIONEN EL EDIFICIO</h2>
				<div className='resources-grid'>
					{resources.map(({ image, name, capacity, description }) => (
						<BuildingCard key={name} title={name} image={image} capacity={capacity} description={description} />
					))}
				</div>
			</div>
		</>
	);
};

export default BuildingShop;
