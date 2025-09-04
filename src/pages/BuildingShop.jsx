import { useState, useEffect } from 'react';
import SavedHumans from '../components/SavedHumans';
import Rounds from '../components/Rounds';
import BuildignCard from '../components/BuildignCard';
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

	const handleSkip = () => {
		navigate('/stageThree');
	};

	// si está vacío, solo permitir edificio id 1
	const filteredBuildings =
		selectedBuildings.length === 0
			? availableBuildings.filter((b) => b.id === 1).length > 0
				? availableBuildings.filter((b) => b.id === 1)
				: buildings.filter((b) => b.id === 1)
			: availableBuildings;

	// cambiar texto si ya están los 8
	const skipText = selectedBuildings.length >= 8 ? 'Continuar' : 'No comprar';

	return (
		<>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<div id='buildingShop'>
				<h2>SELECCIONEN EL EDIFICIO</h2>
				<button className='skip' onClick={handleSkip}>
					{skipText}
				</button>
				<div className='buildings-grid'>
					{filteredBuildings.map((b) => (
						<BuildignCard
							key={b.id}
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
