import oxygen from '../assets/oxygen.png';
import nasaNova from '../assets/nasaNova.png';
import health from '../assets/health.png';
import harvest from '../assets/harvest.png';
import energy from '../assets/energy.png';
import cryoNova from '../assets/cryoNova.png';
import shelter from '../assets/shelter.png';
import technology from '../assets/technology.png';

const buildings = [
	{
		id: 1,
		image: oxygen,
		name: 'OXÍGENO',
		cost: 200,
		capacity: 35,
		description: 'Habilita el transporte. Sin oxígeno no se pueden mover personas.',
	},
	{
		id: 2,
		image: energy,
		name: 'ENERGÍA',
		cost: 150,
		capacity: 15,
		description: 'Aumenta la capacidad global de transporte.',
	},
	{
		id: 3,
		image: health,
		name: 'SALUD',
		cost: 200,
		capacity: 10,
		description: 'Recibe más heridos y evita un evento negativo en una ronda.',
	},
	{
		id: 4,
		image: harvest,
		name: 'COSECHA',
		cost: 150,
		capacity: 20,
		description: 'Aumenta la capacidad alimentando a más personas.',
	},
	{
		id: 5,
		image: shelter,
		name: 'REFUGIO',
		cost: 150,
		capacity: 20,
		description: 'Aumenta la capacidad hospedando a más',
	},
	{
		id: 6,
		image: nasaNova,
		name: 'NASA-NOVA',
		cost: 200,
		capacity: 10,
		description: 'Aumenta la capacidad y evita un evento negativo en una ronda.',
	},
	{
		id: 7,
		image: technology,
		name: 'TECNOLOGÍA',
		cost: 120,
		capacity: 15,
		description: 'Avances que potencian el transporte y la comunicación.',
	},
	{
		id: 8,
		image: cryoNova,
		name: 'CRYO-NOVA',
		cost: 200,
		capacity: 0,
		description: 'Congela una oferta que exceda la capacidad de la ronda.',
	},
];

export default buildings;
