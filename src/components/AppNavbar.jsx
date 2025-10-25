import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx"; // 👈 importa el contexto

export default function AppNavbar() {
  const { counter } = useApp(); // 👈 contador global del contexto

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🔧 ReparaFácil SPA
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navRF"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div id="navRF" className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Inicio
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/servicios">
                Servicios
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/agenda">
                Agenda
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/garantias">
                Garantías
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tecnicos">
                Técnicos
              </Link>
            </li>
            {/* 👇 nuevo enlace de contacto */}
            <li className="nav-item">
              <Link className="nav-link" to="/contacto">
                Contacto
              </Link>
            </li>
          </ul>

          {/* 👇 contador visible */}
          <div
            className="ms-3 d-flex align-items-center gap-2"
            data-testid="counter-badge"
          >
            <span className="text-white-50 small">Seleccionados</span>
            <span className="badge bg-light text-primary">{counter}</span>
          </div>
        </div>
      </div>
    </nav>
  );
}
