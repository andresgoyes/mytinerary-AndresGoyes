import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux'; // Importar useDispatch
import { setUser } from './store/actions/authActions'; // Importar la acción setUser
import Hero from './components/Hero';
import Slider from './components/Slider';
import Cities from './pages/Cities';
import NotFound from './pages/NotFound';
import StandarLayout from './Layouts/StandarLayout';
import CityDetail from './Components/CityDetail';
import Register from './pages/Register';
import Login from './pages/Login';
import './App.css';

function App() {
  const dispatch = useDispatch(); // Inicializar el dispatch

  // useEffect para cargar los datos del usuario al iniciar la aplicación
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = JSON.parse(localStorage.getItem('user'));  // Cargar los datos del usuario

    if (token && userData) {
      // Si hay token y datos de usuario en localStorage, dispatch con ambos valores
      dispatch(setUser({ user: userData, token: token }));  // Llamamos a setUser con ambos valores
    }
  }, [dispatch]);

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
          <Route path="/register" element={<Register />} />        
          <Route path="/login" element={<Login />} />  
          <Route path="/cities" element={<Cities />} />
          <Route path="/city/:id" element={<CityDetail />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;