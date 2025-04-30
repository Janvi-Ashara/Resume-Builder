import React, { useState } from "react";
import google from "./../../components/images/Google.png";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import "./../../App.css";
import { FaEye, FaEyeSlash } from "react-icons/fa";


const Signup = () => {

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate()

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

//   const loginwithgoogle = ()=>{
//     window.open("http://localhost:3001/auth/google/callback","_self")
// }

  const handleSubmit = (e) => {
    e.preventDefault()
    // axios.post('http://localhost:3001/register', { firstname, lastname, email, password })
    
    axios.post('https://resume-builder-server-teal.vercel.app/register', { firstname, lastname, email, password },{ withCredentials: true } )
      .then(result => {
        console.log(result)
        navigate('/login')

      })
      .catch(err => console.log(err))
    // console.log("Form submitted");
  };

  const handleGoogleSignup = () => {
    // handle Google OAuth logic here
    window.open("https://resume-builder-server-teal.vercel.app/auth/google/callback","_self")
    console.log("Continue with Google clicked");
  };

  return (
    <div className="bg-img d-flex justify-content-center align-items-center">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm mt-5">
              <div className="card-body">
                <h3 className="card-title mb-4 text-center">Sign Up</h3>

                <form onSubmit={handleSubmit}>
                  <div className="mb-3 ">
                    <label htmlFor="firstname" className="form-label">
                      First Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="firstname"
                      placeholder="Enter your first name"
                      required
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="lastname" className="form-label">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Enter your last name"
                      required
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address*
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password*
                    </label>
                    <div className="position-relative d-flex align-content-center">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control "
                        id="password"
                        placeholder="Enter your password"
                        required
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <span
                        onClick={togglePassword}
                        style={{
                          position: "absolute",
                          right: "10px",
                          cursor: "pointer",
                          color: "#555",
                          fontSize: "1.5rem"
                        }}
                      >
                        {showPassword ? <FaEye /> : <FaEyeSlash />}
                      </span>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100 rounded-pill p-2">
                    Register
                  </button>
                </form>

                <div className="text-center mt-3">
                  <p>
                    Already have an account?
                    <a href="/login" className="btn btn-link">
                      Login
                    </a>
                  </p>
                </div>
                {/* Continue with Google */}
                <div className="d-grid">
                  <button
                    type="button"
                    className="rounded-pill btn-hover-dark p-2 rounded border d-flex align-items-center justify-content-center"
                    onClick={handleGoogleSignup}
                  >
                    <img
                      src={google}
                      alt="google"
                      height="30px"
                      width="30px"
                      className="me-2"
                    />
                    Continue with Google
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;





