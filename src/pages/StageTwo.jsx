import Stages from '../components/Stages';
import building from '../assets/building.png';

const StageTwo = () => {
	return (
		<>
			<Stages
				title='CONSTRUYAN SU EDIFICIO'
				description='Elijan una construcción para aumentar su capacidad'
				image={building}
				btnText='VER OPCIONES'
				page='/buildingShop'
			/>
		</>
	);
};

export default StageTwo;
