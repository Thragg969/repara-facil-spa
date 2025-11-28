import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

import {
  getAgenda,
  cancelarAgenda,
} from "../api/agendaService";

export default function Agenda() {
  const { agenda, setAgenda } = useApp();
  const [params] = useSearchParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const techId = params.get("tech") || "";
  const techName = params.get("name") || "";

  // Cargar agenda desde el backend al iniciar
  useEffect(() => {
    async function loadAgenda() {
      try {
        setLoading(true);
        const data = await getAgenda();
        setAgenda(data); // Guardamos en contexto global
      } catch (err) {
        console.error(err);
        setError("No se pudo cargar la agenda.");
      } finally {
        setLoading(false);
      }
    }

    loadAgenda();
  }, [setAgenda]);

  // Ordenar citas por fecha + FILTRO por técnico si viene desde Servicios.jsx
  const citasOrdenadas = useMemo(() => {
    if (!agenda) return [];

    // 👉 Si viene un técnico por query param, filtramos SOLO esas citas
    const filtradas = techId
      ? agenda.filter((c) => String(c.tecnico_id) === String(techId))
      : agenda;

    return [...filtradas].sort((a, b) =>
      (a.fecha || "").localeCompare(b.fecha || "")
    );
  }, [agenda, techId]);

  // Cancelar una cita
  const handleCancelar = async (id) => {
    if (!id) return;

    if (!confirm("¿Deseas cancelar esta cita?")) return;

    try {
      await cancelarAgenda(id);
      setAgenda((prev) => prev.filter((c) => c.id !== id));
      alert("Cita cancelada correctamente.");
    } catch (err) {
      console.error(err);
      alert("Error al cancelar la cita.");
    }
  };

  return (
    <>
      <h2 className="mb-3">Agenda</h2>

      {techName ? (
        <div className="alert alert-info d-flex justify-content-between align-items-center">
          <div>
            <strong>Técnico preseleccionado:</strong> {techName}
            {techId ? (
              <span className="text-muted"> (ID: {techId})</span>
            ) : null}
          </div>
          <span className="small text-muted">
            El servicio que agendes quedará asociado a este técnico.
          </span>
        </div>
      ) : null}

      {loading ? (
        <p className="text-muted">Cargando agenda...</p>
      ) : error ? (
        <p className="text-danger">{error}</p>
      ) : !agenda || agenda.length === 0 ? (
        <p className="text-muted">
          <strong>No tienes citas aún.</strong> Ve a{" "}
          <strong>Servicios</strong> para agendar una.
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
                <tr key={c.id}>
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
                      onClick={() => handleCancelar(c.id)}
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
