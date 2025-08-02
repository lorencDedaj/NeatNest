import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PostJobs from './pages/PostJobs';
import FindJobs from './pages/FindJobs';
import { useJob } from './context/JobProvider';
function App() {
  const {user, setUser} = useJob();

  const logout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login setUser={setUser} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/post-jobs" 
            element={user ? <PostJobs user={user} logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/find-jobs" 
            element={user ? <FindJobs user={user} logout={logout} /> : <Navigate to="/login" />} 
          />
          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;