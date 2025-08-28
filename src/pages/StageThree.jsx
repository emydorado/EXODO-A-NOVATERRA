import Stages from '../components/Stages';
import coins from '../assets/coins.png';

const StageThree = () => {
	return (
		<>
			<Stages
				title='¡MOMENTO DE COMPRAR!'
				description='Asegura tu capacidad en transporte  siendo el más velóz.'
				image={coins}
				btnText='SIGUIENTE'
				page='/offers'
			/>
		</>
	);
};

export default StageThree;
