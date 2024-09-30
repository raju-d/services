import { Navigate, Route, Routes } from "react-router-dom";
import Header from "./Components/Header";
import SignUp from "./Components/SignUp";
import Home from "./Components/Home";
import Login from "./Components/Login";
import './index.css';
import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import { useEffect } from "react";
import Profile from "./Components/Profile";

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  console.log(token);

  const handleLogin = (newToken) => {
    setToken(newToken);
  }

  useEffect(() => {
    console.log('Token changed:', token);
  }, [token]);

  return (
    <>
      <Header token={token}  onLogout={() => setToken(null)} />
      <Routes>
        <Route path="/login" element={!token ?  <Login onLogin={handleLogin} /> : <Navigate to='/' />} />
        <Route path="/signup" element={!token ?  <SignUp /> : <Navigate to='/' />} />
        <Route path="" element={token ? <Home/> : <Navigate to='/login'/>} />
        <Route path="/home" element={token ?  <Home /> : <Navigate to='/login' />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login"/>} />
        <Route path="/profile" element={token ? <Profile /> : <Navigate to="/login"/>} />
      </Routes>
    </>
  );
}

export default App;
