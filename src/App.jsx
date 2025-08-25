import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import StageOne from './pages/StageOne';
import StageTwo from './pages/StageTwo';
import StageThree from './pages/StageThree';
import StageFour from './pages/StageFour';
import Challenge from './pages/Challenge';
import Offers from './pages/Offers';
import BuildingShop from './pages/BuildingShop';
import Events from './pages/Event';
import './App.css';

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path='/' element={<Dashboard />} />
				<Route path='/stageOne' element={<StageOne />} />
				<Route path='/stageTwo' element={<StageTwo />} />
				<Route path='/stageThree' element={<StageThree />} />
				<Route path='/stageFour' element={<StageFour />} />
				<Route path='/challenge' element={<Challenge />} />
				<Route path='/offers' element={<Offers />} />
				<Route path='/buildingShop' element={<BuildingShop />} />
				<Route path='/events' element={<Events />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
