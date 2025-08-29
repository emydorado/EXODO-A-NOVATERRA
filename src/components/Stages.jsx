import SavedHumans from './SavedHumans';
import Rounds from './Rounds';
import './stages.css';
import { useNavigate } from 'react-router-dom';

const Stages = ({ title, image, btnText, page, description, logo, onClick }) => {
	const navigate = useNavigate();

	const handleClick = () => {
		if (onClick) {
			onClick(); // usa la lógica personalizada
		} else if (page) {
			navigate(page); // fallback a page directo
		}
	};

	return (
		<div id='stages'>
			<div className='counters'>
				<SavedHumans />
				<Rounds />
			</div>
			<h2>{title}</h2>
			<img src={logo} className='logo' />
			<p>{description}</p>
			<img src={image} />
			<button onClick={handleClick}>{btnText}</button>
		</div>
	);
};

export default Stages;
