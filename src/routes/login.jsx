import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { Button } from "../components/button.jsx";
import { Input } from "../components/input.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "../components/card.jsx";


const stylesheet = `
  .loginPage {
    background: url('/Images/loginimage.jpg') no-repeat center center fixed;
    background-size: cover;
    height: 100vh; /* Ensure the page covers the full height */
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loginForm {
    background-color: rgba(1, 32, 93, 0.7); /* Darker background to make text readable */
    color: white;
    padding: 2rem;
    border-radius: 10px;
    width: 100%;
    max-width: 400px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  }

  .loginForm h2 {
    text-align: center;
    margin-bottom: 1.5rem;
  }

  .text-warning {
    color: yellow;
    text-align: center;
    margin-bottom: 1rem;
  }

  .loginForm input {
    width: 100%;
    padding: 0.8rem;
    margin-bottom: 1rem;
    border-radius: 5px;
    border: none;
    background-color: #ffffff;
    color: #333; /* Set text color to black so it's visible */
  }

  .loginForm button {
    width: 100%;
    padding: 0.8rem;
    background-color: #28a745;
    border: none;
    color: white;
    border-radius: 5px;
    cursor: pointer;
  }

  .loginForm button:hover {
    background-color: #218838;
  }

  .loginForm input[type="checkbox"] {
    margin-right: 0.5rem;
  }
    .loginForm .mb-1 {
  display: flex;
  align-items: center;
}

  
`;

const Login = () => {
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // Make sure useNavigate is used here

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      });
  
      const data = await response.json();
      if (data.success) {
        navigate('/dashboard');
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError("Server error. Try again later.");
    }
  };
  

  return (
    <div className="loginPage">
      <style>{stylesheet}</style>
      <div className="loginForm">
        {error && <div className="text-warning">{error}</div>}
        <h2>Login</h2>
        <form onSubmit={handleLogin} className="space-y-4">
          <div className="mb-3">
            <Input
              type="text"
              placeholder="Username"
              onChange={e => setValues({ ...values, username: e.target.value })}
            />
          </div>
          <div className="mb-3">
            <Input
              type="password"
              placeholder="Password"
              onChange={e => setValues({ ...values, password: e.target.value })}
            />
          </div>
          <Button
            type="submit"
            className="btn btn-success w-100 mb-2 rounded-0"
          >
            Log in
          </Button>
          
        </form>
      </div>
    </div>
  );
};

export default Login;
