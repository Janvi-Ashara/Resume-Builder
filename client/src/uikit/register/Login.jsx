import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./../../App.css";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const navigate = useNavigate();
  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  useEffect(() => {
    const savedEmail =
      localStorage.getItem("rememberMe") === "true"
        ? localStorage.getItem("email")
        : sessionStorage.getItem("email");

    const savedPassword =
      localStorage.getItem("rememberMe") === "true"
        ? localStorage.getItem("password")
        : sessionStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
      setRememberMe(localStorage.getItem("rememberMe") === "true");
    }
  }, []);

  axios.defaults.withCredentials = true;
  
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      // .post("http://localhost:3001/login", { email, password })
      .post("https://resume-builder-server-teal.vercel.app/login",  { email, password }, 
        { withCredentials: true })
      .then((result) => {
        console.log(result);

        if (result.data.status === "success") {
          const userName = result.data.user.displayName;

          alert(`Login successful!`);

          if (rememberMe) {
            localStorage.setItem("email", email);
            localStorage.setItem("password", password);
            localStorage.setItem("rememberMe", true);
          } else {
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("password", password);
            localStorage.setItem("rememberMe", false);
          }

          // Optional: store username for later use
          localStorage.setItem("userName", userName);

          navigate("/home");
        } else {
          alert(result.data.message || "Invalid credentials");
        }
      })
      .catch((err) => {
        console.log(err);
        alert("Something went wrong. Please try again.");
      });
  };


  return (
    <div>
      <div className="bg-img d-flex justify-content-center">
        <div className="container ">
          <div className="row justify-content-center">
            <div className="col-md-6">
              <div className="card shadow-sm mt-5">
                <div className="card-body mb-3">
                  <h3 className="card-title mb-4 text-center">Login</h3>

                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="email" className="form-label">
                        Email address
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
                        Password
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
                            fontSize: "1.5rem",
                          }}
                        >
                          {showPassword ? <FaEye /> : <FaEyeSlash />}
                        </span>
                      </div>
                    </div>
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <input
                          type="checkbox"
                          style={{ height: "17px", width: "20px" }}
                          className="form-check-input"
                          checked={rememberMe}
                          onChange={(e) => setRememberMe(e.target.checked)}
                          id="rememberMe"
                        />
                        &nbsp; &nbsp;
                        <span>Remember me</span>
                      </div>
                      <div>Forgot Password?</div>

                    </div>
                    <br/>
                    <button type="submit" className="btn btn-primary w-100 ">
                      Login
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
