import React, { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Agenda() {
  const { agenda, removeCita } = useApp();
  const [params] = useSearchParams();

  const techId = params.get("tech") || "";
  const techName = params.get("name") || "";

  const citasOrdenadas = useMemo(() => {
    return [...agenda].sort((a, b) => (a.fecha || "").localeCompare(b.fecha || ""));
  }, [agenda]);

  return (
    <>
      <h2 className="mb-3">Agenda</h2>

      {techName ? (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>
            <strong>Técnico preseleccionado:</strong> {techName}
            {techId ? <span className="text-muted"> (ID: {techId})</span> : null}
          </div>
          <span className="small text-muted">El servicio que agendes quedará asociado a este técnico.</span>
        </div>
      ) : null}

      {(!agenda || agenda.length === 0) ? (
        <p className="text-muted">
          <strong>No tienes citas aún</strong>. Ve a <strong>Servicios</strong> para agendar una.
        </p>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>#</th>
                <th>Cliente</th>
                <th>Dirección</th>
                <th>Fecha</th>
                <th>Servicio</th>
                <th>Técnico</th>
                <th>Estado</th>
                <th style={{ width: 120 }}>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {citasOrdenadas.map((c, idx) => (
                <tr key={c.id || `${c.cliente}-${idx}`}>
                  <td>{idx + 1}</td>
                  <td>{c.cliente || "-"}</td>
                  <td>{c.direccion || "-"}</td>
                  <td>{c.fecha || "-"}</td>
                  <td>{c.servicio || "-"}</td>
                  <td>{c.tecnico_nombre || "-"}</td>
                  <td>{c.estado || "Pendiente"}</td>
                  <td>
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
      )}
    </>
  );
}
