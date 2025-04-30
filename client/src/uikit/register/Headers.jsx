import React, { useEffect, useState } from "react";
import axios from "axios";
import ContactForm from "./Contact";
import { IoClose } from "react-icons/io5";
const Headers = () => {
  const [userdata, setUserdata] = useState({});
  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm((prev) => !prev);
  };

  // console.log("response", userdata);
  const getUser = async () => {
    try {
      const response = await axios.get("https://resume-builder-server-teal.vercel.app/login/success", {
        withCredentials: true,
      });
      setUserdata(response.data.user);
    } catch (error) {
      console.log("error", error);
    }
  };

  const logout = () => {
    // window.open("http://localhost:3001/logout", "_self");
    window.open("https://resume-builder-server-teal.vercel.app/logout", "_self");
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>    <header>
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        {Object.keys(userdata).length > 0 && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "30px",
              color: "#fff",
              padding: "8px 16px",
              borderRadius: "8px",
              boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
            }}
          >
            <span style={{ fontWeight: "600", fontSize: "16px" }}>
              {userdata.displayName}
            </span>
            <img
              src={userdata.image}
              alt="name"
              style={{
                width: "45px",
                height: "45px",
                borderRadius: "50%",
                objectFit: "cover",
                border: "2px solid #fff",
              }}
            />
            <div style={{ display: "flex", gap: "10px" }}>
              <button onClick={toggleForm} style={btnStyle}>
                Contact Us
              </button>
              <button onClick={logout} style={btnStyle}>
                Logout
              </button>
            </div>
          </div>
        )}
      </nav>
    </header>
    {showForm && (
      <div style={modalOverlay} onClick={toggleForm}>
        <div style={modalBox} onClick={e => e.stopPropagation()}>
          <button
            onClick={toggleForm}
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              background: "transparent",
              border: "none",
              fontSize: "20px",
              fontWeight: 700,
              cursor: "pointer",
              color: "#333"
            }}
          >
            <IoClose />
          </button>

          <ContactForm />
        </div>
      </div>
    )}
    </>

  );
};

export default Headers;
// Styles
const btnStyle = {
  padding: "8px 14px",
  backgroundColor: "limegreen",
  color: "white",
  border: "none",
  borderRadius: "5px",
  fontWeight: "600",
  cursor: "pointer"
};

const modalOverlay = {
  position: 'fixed',
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalBox = {
  position: 'relative', // Important for positioning the "X"
  background: 'white',
  padding: '25px',
  borderRadius: '10px',
  width: '90%',
  maxWidth: '350px'
};
