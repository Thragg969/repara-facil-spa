import React, { useMemo, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";
import { SERVICES } from "../data/mock.js";

export default function AppNavbar() {
  const { counter, usuario, logout } = useApp();
  const [open, setOpen] = useState(false);
  const [openServicios, setOpenServicios] = useState(false);
  const navigate = useNavigate();

  const serviciosMenu = useMemo(() => SERVICES.slice(0, 6), []);

  const goServicio = (id) => {
    navigate("/servicios");
    setOpen(false);
    setOpenServicios(false);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          🔧 ReparaFácil SPA
        </Link>

        {/* Hamburguesa móvil */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Abrir menú"
          aria-controls="mainNavbar"
          aria-expanded={open ? "true" : "false"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div
          id="mainNavbar"
          className={`collapse navbar-collapse ${open ? "show" : ""}`}
        >
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink
                end
                to="/"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                Inicio
              </NavLink>
            </li>

            {/* Dropdown Servicios */}
            <li className="nav-item dropdown">
              <button
                className="nav-link dropdown-toggle btn btn-link align-baseline px-0 py-2 text-white text-decoration-none"
                id="serviciosDropdown"
                aria-expanded={openServicios ? "true" : "false"}
                onClick={() => setOpenServicios((v) => !v)}
                style={{ verticalAlign: "middle" }}
              >
                Servicios
              </button>

              <ul
                className={`dropdown-menu ${openServicios ? "show" : ""}`}
                aria-labelledby="serviciosDropdown"
              >
                {serviciosMenu.map((s) => (
                  <li key={s.id}>
                    <button
                      className="dropdown-item"
                      onClick={() => goServicio(s.id)}
                    >
                      {s.nombre}
                    </button>
                  </li>
                ))}
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink
                    to="/servicios"
                    className="dropdown-item"
                    onClick={() => setOpen(false)}
                  >
                    Ver todos los servicios
                  </NavLink>
                </li>
              </ul>
            </li>

            <li className="nav-item">
              <NavLink
                to="/agenda"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                Agenda
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/garantias"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                Garantías
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/tecnicos"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                Técnicos
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contacto"
                className="nav-link"
                onClick={() => setOpen(false)}
              >
                Contacto
              </NavLink>
            </li>
          </ul>

          {/* 🔐 Usuario logueado o botón de login */}
          <div className="d-flex align-items-center gap-3 text-white">
            {usuario ? (
              <>
                <span className="fw-semibold">
                  <i className="bi bi-person-circle me-1"></i>
                  {usuario.nombre}
                </span>
                <button
                  onClick={handleLogout}
                  className="btn btn-sm btn-outline-light"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <button
                className="btn btn-sm btn-light"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </button>
            )}
          </div>

          {/* Contador global (se mantiene igual) */}
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
