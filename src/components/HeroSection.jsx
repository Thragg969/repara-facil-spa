import React from "react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  const handleVerServicios = () => {
    navigate("/servicios"); // redirige a la ruta de servicios
  };

  return (
    <section className="text-center py-5 bg-light">
      <div className="container">
        <h1 className="fw-bold text-primary mb-3">
          Tu reparación fácil, rápida y segura 🔧
        </h1>
        <p className="text-muted mb-4">
          Agenda técnicos de confianza en minutos y extiende la vida útil de tus
          electrodomésticos.
        </p>
        <button
          onClick={handleVerServicios}
          className="btn btn-primary px-4 py-2"
        >
          Ver servicios
        </button>
      </div>
    </section>
  );
}
