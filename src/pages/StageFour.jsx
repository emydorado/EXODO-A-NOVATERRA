import Stages from '../components/Stages';
import people from '../assets/people.png';
import onlyNovaterra from '../assets/onlyNovaterra.png';
const StageFour = () => {
	return (
		<>
			<Stages
				title='TRASLADEN LAS PERSONAS A'
				description='Muevan las fichas y tomen las tarjetas correspondientes.'
				logo={onlyNovaterra}
				image={people}
				btnText='SIGUIENTE'
				page='/event'
			/>
		</>
	);
};

export default StageFour;
