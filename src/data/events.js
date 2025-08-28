import check from '../assets/check.png';
import warning from '../assets/warning.png';

const events = [
	// negativos
	{
		id: 1,
		image: warning,
		alert: 'ALERTA EXODITAS',
		title: '¡Ha llegado una mortal enfermedad!',
		description: 'Si no tienen el edificio SALUD cada jugador pierde 5 personas.',
	},
	{
		id: 2,
		image: warning,
		alert: 'ALERTA EXODITAS',
		title: '¡Un meteorito ha caído!',
		description: 'Devuelvan el último edificio construido. Si tienen el edificio NASA-NOVA, se cancela.',
	},
	{
		id: 3,
		image: warning,
		alert: 'ALERTA EXODITAS',
		title: '¡Motín en las filas!',
		description: 'Se restan 10 personas en el contador global. Deben decidir como se distribuyen esta devolución',
	},
	{
		id: 4,
		image: warning,
		alert: 'ALERTA EXODITAS',
		title: '¡Fuga de recursos!',
		description: 'Cada jugador pierde $10.',
	},
	{
		id: 5,
		image: warning,
		alert: 'ALERTA EXODITAS',
		title: '¡Estafa de suministros!',
		description: 'Cada jugador pierde $20.',
	},

	// postivos

	{
		id: 6,
		image: check,
		alert: 'INCREÍBLE EXODITAS',
		title: '¡Bonificación universal!',
		description: 'Todos reciben +$15.',
	},
	{
		id: 7,
		image: check,
		alert: 'INCREÍBLE EXODITAS',
		title: '¡Apoyen a los rezagados!',
		description: 'Los 2 jugadores con menos personas salvadas reciben +5 cada uno',
	},
	{
		id: 8,
		image: check,
		alert: 'INCREÍBLE EXODITAS',
		title: '¡Nuevos avances tecnológicos!',
		description: 'Cada jugador recibe +5 de capacidad extra en la próxima ronda.',
	},
	{
		id: 9,
		image: check,
		alert: 'INCREÍBLE EXODITAS',
		title: '¡Subsidio general!',
		description: 'Todos reciben +$10.',
	},
	{
		id: 10,
		image: check,
		alert: 'INCREÍBLE EXODITAS',
		title: '¡Motivación de la humanidad!',
		description: 'Cada jugador recibe +$25 al inicio de la siguiente ronda.',
	},
];

export default events;
