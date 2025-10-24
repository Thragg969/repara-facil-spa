import React, { useMemo, useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

export default function Servicios() {
  const { servicios } = useApp();
  const [q, setQ] = useState("");
  const [categoria, setCategoria] = useState("todas");

  // categorías únicas
  const categorias = useMemo(() => ["todas", ...new Set(servicios.map(s => s.categoria))], [servicios]);

  const filtrados = useMemo(() => {
    const texto = q.trim().toLowerCase();
    return servicios.filter(s => {
      const byCat = categoria === "todas" || s.categoria === categoria;
      const byText =
        !texto ||
        s.nombre.toLowerCase().includes(texto) ||
        s.descripcion.toLowerCase().includes(texto);
      return byCat && byText;
    });
  }, [servicios, q, categoria]);

  return (
    <>
      <h2 className="mb-3">Servicios</h2>

      {/* Filtros */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Buscar por nombre o descripción…"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select className="form-select" value={categoria} onChange={e => setCategoria(e.target.value)}>
            {categorias.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="row g-3">
        {filtrados.length === 0 ? (
          <div className="col-12">
            <div className="alert alert-warning mb-0">
              No encontramos servicios con esos filtros.
            </div>
          </div>
        ) : (
          filtrados.map(s => (
            <div key={s.id} className="col-md-6 col-lg-4">
              <ServiceCard service={s} />
            </div>
          ))
        )}
      </div>
    </>
  );
}
