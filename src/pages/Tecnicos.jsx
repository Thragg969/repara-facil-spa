import React from "react";
import { useApp } from "../context/AppContext.jsx";

export default function Tecnicos() {
  const { tecnicos } = useApp();

  // --- MOCK DE TÉCNICOS (solo si el contexto está vacío) ---
  const tecnicosMock = [
    { id: "t1", nombre: "Carlos Pérez", especialidad: "Lavadoras" },
    { id: "t2", nombre: "María Torres", especialidad: "Electricidad" },
    { id: "t3", nombre: "José Ramírez", especialidad: "Refrigeración" },
  ];

  // Si no hay técnicos en contexto, usamos el mock
  const listaTecnicos = tecnicos?.length ? tecnicos : tecnicosMock;

  return (
    <div className="container py-4">
      <h2 className="mb-3">Técnicos</h2>

      {/* Aquí va el bloque que tú pusiste */}
      <div className="row g-3">
        {listaTecnicos.map((t) => (
          <div key={t.id} className="col-md-4">
            <div className="card h-100 p-3 text-center">
              <h5>{t.nombre}</h5>
              <p className="text-muted small">{t.especialidad}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

