import React from "react";
import { useApp } from "../context/AppContext.jsx";

export default function Tecnicos() {
  const { tecnicos } = useApp();
  return (
    <>
      <h2 className="mb-3">Técnicos</h2>
      <div className="row g-3">
        {tecnicos.map(t => (
          <div key={t.id} className="col-md-6 col-lg-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title mb-1">{t.nombre}</h5>
                <p className="text-muted small mb-2">{t.especialidad} · {t.ciudad}</p>
                <p className="mb-2">⭐ {t.rating} / 5</p>
                <p className="small">{t.bio}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
