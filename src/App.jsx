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
				<Route path='/StageOne' element={<StageOne />} />
				<Route path='/StageTwo' element={<StageTwo />} />
				<Route path='/StageThree' element={<StageThree />} />
				<Route path='/StageFour' element={<StageFour />} />
				<Route path='/Challenge' element={<Challenge />} />
				<Route path='/Offers' element={<Offers />} />
				<Route path='/BuildingShop' element={<BuildingShop />} />
				<Route path='/Events' element={<Events />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
