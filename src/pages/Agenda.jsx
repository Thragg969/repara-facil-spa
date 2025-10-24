import React, { useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import { SERVICES } from "../data/mock.js";

export default function Agenda() {
  const { agenda, removeCita } = useApp();

  const citasOrdenadas = useMemo(() => {
    return [...agenda].sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
  }, [agenda]);

  if (!agenda || agenda.length === 0) {
    return (
      <>
        <h2 className="mb-3">Agenda</h2>
        <p className="text-muted">
          No tienes citas aún. Agenda desde la sección <b>Servicios</b>.
        </p>
      </>
    );
  }

  const servicioPorId = (id) => SERVICES.find(s => s.id === id)?.nombre || "Servicio";

  return (
    <>
      <h2 className="mb-3">Agenda</h2>
      <p className="text-muted">Tienes {citasOrdenadas.length} cita(s) agendada(s).</p>

      <div className="table-responsive">
        <table className="table table-striped align-middle">
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Servicio</th>
              <th>Cliente</th>
              <th>Dirección</th>
              <th>Notas</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {citasOrdenadas.map(c => (
              <tr key={c.id}>
                <td>{c.fecha?.replace('T', ' ')}</td>
                <td>{servicioPorId(c.servicioId)}</td>
                <td>{c.cliente}</td>
                <td>{c.direccion}</td>
                <td>{c.notas || "-"}</td>
                <td className="text-end">
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => removeCita(c.id)}
                  >
                    Cancelar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
