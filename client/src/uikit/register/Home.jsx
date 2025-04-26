
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../../components/Landing Page/landingPage';

function Home() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);

  axios.defaults.withCredentials = true;

  useEffect(() => {
    axios.get("http://localhost:3001/login/success", { withCredentials: true })
      .then(res => {
        if (res.status === 200 && res.data.user) {
          setIsAuth(true);
        } else {
          navigate("/error");
        }
      })
      .catch(err => {
        navigate("/error");
      });
  }, [navigate]);

  return (
    <div>
      {isAuth && (
        <>

          <LandingPage />

        </>
      )}
    </div>
  );
}

export default Home;
