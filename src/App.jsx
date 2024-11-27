import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cities from './pages/Cities';
import NotFound from './pages/NotFound';
import StandarLayout from './Layouts/StandarLayout';
import CityDetail from './Components/CityDetail';
import Register from './pages/Register';
import Login from './pages/Login';
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
                <Home />                
              </>
            } 
          />  
          <Route path="/register" element={<Register />} />        
          <Route path="/login" element={<Login />} />  
          <Route path="/home" element={<Home />} />
          <Route path="/cities" element={<Cities />} />
          <Route path="/city/:id" element={<CityDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;