import { useState, useEffect } from 'react';
import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import BuildingCard from '../components/buildignCard';
import buildings from '../data/buildings';
import './buildingShop.css';
import { useNavigate } from 'react-router-dom';

const BuildingShop = () => {
	const navigate = useNavigate();
	const STORAGE_KEY = 'availableBuildings';
	const STORAGE_SELECTED = 'selectedBuildings';

	const [availableBuildings, setAvailableBuildings] = useState(() => {
		const saved = localStorage.getItem(STORAGE_KEY);
		return saved ? JSON.parse(saved) : buildings;
	});

	const [selectedBuildings, setSelectedBuildings] = useState(() => {
		const saved = localStorage.getItem(STORAGE_SELECTED);
		return saved ? JSON.parse(saved) : [];
	});

	useEffect(() => {
		localStorage.setItem(STORAGE_KEY, JSON.stringify(availableBuildings));
	}, [availableBuildings]);

	useEffect(() => {
		localStorage.setItem(STORAGE_SELECTED, JSON.stringify(selectedBuildings));
	}, [selectedBuildings]);

	const handleSelectBuilding = (building) => {
		setAvailableBuildings((prev) => prev.filter((b) => b.name !== building.name));
		setSelectedBuildings((prev) => [...prev, building]);
		navigate('/stageThree', { state: { building } });
	};

	return (
		<>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<div id='buildingShop'>
				<h2>SELECCIONEN EL EDIFICIO</h2>
				<div className='buildings-grid'>
					{availableBuildings.map((b) => (
						<BuildingCard
							key={b.name}
							title={b.name}
							image={b.image}
							capacity={b.capacity}
							description={b.description}
							onSelect={() => handleSelectBuilding(b)}
						/>
					))}
				</div>
			</div>
		</>
	);
};

export default BuildingShop;
