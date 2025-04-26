
import axios from 'axios';
import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const getUser = useCallback(async () => {
    try {
      const response = await axios.get("http://localhost:3001/login/sucess", { withCredentials: true });
      console.log("response", response);
    } catch (error) {
      navigate("*");
    }
  }, [navigate]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Dashboard</h1>
    </div>
  );
};

export default Dashboard;
