import React from "react";
import TechnicianCard from "../components/TechnicianCard.jsx";
import { TECHS } from "../data/mock.js";

export default function Tecnicos() {
  return (
    <section className="py-5 bg-white">
      <div className="container">
        <div className="mb-4">
          <h2 className="fw-bold text-primary mb-1">
            Nuestros técnicos certificados
          </h2>
          <p className="text-muted mb-0">
            Elige al profesional que necesitas para tu servicio.
          </p>
        </div>

        <div className="row g-4">
          {TECHS.map((t) => (
            <TechnicianCard key={t.id} tech={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
