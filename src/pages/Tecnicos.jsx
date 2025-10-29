import React from "react";
import TechnicianCard from "../components/TechnicianCard.jsx";
import { TECHS } from "../data/mock.js";

export default function Tecnicos() {
  return (
    <div>
      <h2 className="mb-3 text-primary">Nuestros técnicos certificados</h2>
      <p className="text-muted">Elige al profesional que necesitas para tu servicio.</p>
      <div className="row g-3">
        {TECHS.map((t) => (
          <TechnicianCard key={t.id} tech={t} />
        ))}
      </div>
    </div>
  );
}
