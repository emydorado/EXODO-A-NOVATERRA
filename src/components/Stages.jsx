import SavedHumans from './SavedHumans';
import Rounds from './Rounds';
import './stages.css';
import { useNavigate } from 'react-router-dom';

const Stages = ({ title, image, btnText, page, description }) => {
	const navigate = useNavigate();

	const goToNextStage = () => {
		navigate(page);
	};

	return (
		<div id='stages'>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<h2>{title}</h2>
			<p>{description}</p>
			<img src={image} />
			<button onClick={goToNextStage}>{btnText}</button>
		</div>
	);
};

export default Stages;
