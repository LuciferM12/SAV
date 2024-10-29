import { useNavigate } from 'react-router-dom';
import { useSession } from '../../context/SessionContext';
import { useState, useEffect } from 'react';
import axios from 'axios';

const URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000";

const ProtectedComponent = () => {
  const navigate = useNavigate();
  const { user, loading, logout } = useSession(); // Asegurarse de que el token está dentro de user
  const [people, setPeople] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${URL}/protected`, { 
        headers: { Authorization: `Bearer ${user.token}` } // Suponiendo que user incluye el token
      });
      setPeople(response.data);
    } catch (error) {
      console.log(error);
      // Manejo adicional de errores
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  useEffect(() => {
    if (!loading && user) {
      fetchData();
    } else if (!loading && !user) {
      navigate('/'); // Redirigir si no está autenticado
    }
  }, [loading, user, navigate]);

  if (loading) return <p>Cargando...</p>;

  return (
    <div>
      {people.length > 0 ? (
        people.map((person, index) => (
          <div key={index}>
            <h1>{person.name}</h1>
            <p>{person.age}</p>
          </div>
        ))
      ) : (
        <p>No hay personas disponibles</p>
      )}
      <button onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
};

export default ProtectedComponent;
