import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Layouts
import MainLayout from './layouts/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import SafeRoute from './pages/SafeRoute';
import Emergency from './pages/Emergency';
import Resources from './pages/Resources';
import Helpline from './pages/Helpline';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="/safe-route" element={<SafeRoute />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/helpline" element={<Helpline />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;