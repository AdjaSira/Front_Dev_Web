import React, { useState } from "react";

const Connecter = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = (event) => {
    event.preventDefault();
    // Logique pour gérer la connexion de l'utilisateur
    console.log("Connexion en cours pour", email);
  };

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100 py-2">
      <h1 className="fs-3 fw-bold mb-4">Login</h1>
      <form
        action=""
        className="bg-light p-6 rounded shadow-sm w-100"
        style={{ maxWidth: "400px" }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-control mb-3 px-4 py-2 border border-info-subtle rounded-pill w-100"
        />
        <input
          type="password"
          placeholder="Mot de Passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-control mb-3 px-4 py-2 border border-info-subtle rounded-pill w-100"
        />
        <button
          type="submit"
          onClick={handleSignIn}
          className="btn btn-outline-primary border-info-subtle px-4 py-2 rounded-pill w-100"
        >
          Se connecter
        </button>
      </form>
    </div>
  );
};

export default Connecter;
