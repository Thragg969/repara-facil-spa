import React from "react";

export default function TechnicianCard({ tech }) {
  if (!tech) return null;

  return (
    <div className="col-md-4 mb-4" title={`Técnico: ${tech.nombre}`}>
      <div className="card shadow-sm h-100 border-0">
        <img
          src={tech.foto}
          className="card-img-top"
          alt={tech.nombre}
          style={{ height: 220, objectFit: "cover" }}
        />
        <div className="card-body text-center">
          <h5 className="card-title mb-1">{tech.nombre}</h5>
          <p className="text-muted mb-2 small">{tech.especialidad}</p>
          <p className="text-warning mb-0">⭐ {tech.rating}/5</p>
        </div>
      </div>
    </div>
  );
}
