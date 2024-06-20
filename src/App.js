import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import './App.css';
import {
  Routes,
  Navigate,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Inscrire from "./components/Inscrire";
import Connecter from "./components/Connecter";
import Home from './pages/Home';
import Inbox from './pages/Inbox';
import CalendarPage from './pages/CalendarPage';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<Inscrire />} />
        <Route path="/connexion" element={<Connecter />} />
        <Route path="/home" element={<Home/>} />
        <Route path="/inbox" element={<Inbox/>} />
        <Route path="/calendar" element={<CalendarPage/>} />
        <Route path="*" element={<Navigate to="/home" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
