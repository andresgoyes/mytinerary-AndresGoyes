// App.jsx
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { setUser } from './store/actions/authActions';
import StandarLayout from './Layouts/StandarLayout';
import Home from './pages/Home';
import Cities from './pages/Cities';
import CityDetail from './Components/CityDetail';
import Login from './pages/Login';
import Register from './pages/Register';
import NotFound from './pages/NotFound';
import SignRoute from './Components/SignRoute';
import './App.css';

const router = createBrowserRouter([
  {
    element: <StandarLayout></StandarLayout>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/register", element: <SignRoute><Register /></SignRoute> },
      { path: "/login", element: <SignRoute><Login /></SignRoute>  },
      { path: "/cities", element: <Cities /> },
      { path: "/city/:id", element: <CityDetail /> },      
      { path: "*", element: <NotFound /> },
    ],
  },
]);

const loginWithToken = async (token) => {
  try {
    const response = await axios.get("http://localhost:8080/api/users/validateToken", {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.response;
  } catch (error) {
    console.error("Error validating the token", error);
    return null;
  }
};

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      loginWithToken(token).then((user) => {
        if (user) {
          dispatch(setUser({ user, token }));
        }
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <RouterProvider router={router} />;
}

export default App;