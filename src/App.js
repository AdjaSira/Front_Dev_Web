import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  BrowserRouter,
} from "react-router-dom";
import Inscrire from "./components/Inscrire";
import Connecter from "./components/Connecter";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/inscription" element={<Inscrire />} />
        <Route path="/connexion" element={<Connecter />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
