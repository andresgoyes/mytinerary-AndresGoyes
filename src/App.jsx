import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Hero from './components/Hero';
import Slider from './components/Slider';
import Cities from './pages/Cities';
import NotFound from './pages/NotFound';
import StandarLayout from './Layouts/StandarLayout';
import CityDetail from './Components/CityDetail';
import './App.css';

function App() {
  return (
    <Router> 
      <Routes>
        <Route element={<StandarLayout />}>
          <Route 
            path="/" 
            element={
              <>
                <Hero />
                <Slider />
              </>
            } 
          />          
          <Route path="/cities" element={<Cities />} />
          <Route path="/city/:id" element={<CityDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;