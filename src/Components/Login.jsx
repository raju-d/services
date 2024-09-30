/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {});

  const handleSubmit = async () => {
    if (email == "" || password == "") {
      alert("Fields are mandatory");
      return;
    }
    const response = await fetch(
      `http://localhost:3000/users?email=${email}&password=${password}`
    );
    const data = await response.json();

    if (data.length > 0) {
      let token = Math.random().toString(36).slice(2);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(data[0]));
      onLogin(token);
      navigate("/home");
      console.log("logged in successfully");
    } else {
      console.log("login failed");
    }
  };

  const navigateToSignup = ()=> {
    navigate('/signup')
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
          <form>
            <div className="mb-4">
            <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="email"
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your Email"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter your Password"
                className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="flex items-center justify-between">
              <button type="button" onClick={handleSubmit} className="w-full hover:bg-cyan-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-cyan-400 bg-cyan-500 shadow-lg shadow-cyan-500/50"> 
                Login
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <span className="mr-2">Don't have an Account </span>
            <a href="#" onClick={navigateToSignup} className="text-blue-500 hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
