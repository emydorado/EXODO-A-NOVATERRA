import './Dashboard.css';
import earth from '../assets/earth.png';
import novaterra from '../assets/novaterra.png';

const Dashboard = () => {
	return (
		<>
			<img src={earth} alt='earth' className='planet planet-top' />
			<h1>EXODITAS</h1>
			<h3>Ha llegado la hora de salvar a la humanidad</h3>
			<p>N° de jugadores</p>
			<button>-</button>
			<h1>3</h1>
			<button>+</button>
			<button className='play-btn'>JUGAR</button>
			<img src={novaterra} alt='earth' className='planet planet-bottom' />
		</>
	);
};

export default Dashboard;
