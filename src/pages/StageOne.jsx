import Stages from '../components/Stages';
import money from '../assets/money.png';

const StageOne = () => {
	return (
		<>
			<Stages
				title='¡MOMENTO DE RECIBIR DINERO!'
				description='Cada jugador toma 100k'
				image={money}
				btnText='HECHO'
				page='/stageTwo'
			/>
		</>
	);
};

export default StageOne;
