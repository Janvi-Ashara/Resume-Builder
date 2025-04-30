
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LandingPage from '../../components/Landing Page/landingPage';

function Home() {
  const navigate = useNavigate();
  const [isAuth, setIsAuth] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  axios.defaults.withCredentials = true;

  // useEffect(() => {
  //   // axios.get("http://localhost:3001/login/success", { withCredentials: true })
  //   axios.post("https://resume-builder-server-teal.vercel.app/login", {
  //     email,
  //     password,
  //   }, { withCredentials: true });
    
  //   axios.get("https://resume-builder-server-teal.vercel.app/login/success", {
  //     withCredentials: true,
  //   })
   
  //     .then(res => {
  //       if (res.status === 200 && res.data.user) {
  //         setIsAuth(true);
  //       } else {
  //         navigate("/error");
  //       }
  //     })
  //     .catch(err => {
  //       navigate("/error");
  //     });
  // }, [navigate]);

  useEffect(() => {
    const checkLogin = async () => {
      try {
        // Step 1: Log in and wait for token cookie
        const loginResponse = await axios.post(
          "https://resume-builder-server-teal.vercel.app/login",
          { email, password },
          { withCredentials: true }
        );
  
        if (loginResponse.status === 200) {
          // Step 2: Now check login success using the token cookie
          const res = await axios.get(
            "https://resume-builder-server-teal.vercel.app/login/success",
            { withCredentials: true }
          );
  
          if (res.status === 200 && res.data.user) {
            setIsAuth(true);
          } else {
            navigate("/error");
          }
        }
      } catch (err) {
        console.error("Login or success check failed:", err.message);
        navigate("/error");
      }
    };
  
    checkLogin();
  }, [email, password, navigate]);
  

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
