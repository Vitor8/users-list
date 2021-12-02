import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';

export default function App() {
  return (
    <Routes>
      <Route exact path="/users-list" element={ <Home /> } />
    </Routes>
  );
}

