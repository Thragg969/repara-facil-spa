import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import ScheduleModal from "./ScheduleModal.jsx";

export default function ServiceCard({ service, preselectedTech }) {
  const { addCita, add } = useApp();

  const [cliente, setCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (!service) return null;

  const baseCita = {
    servicio: service?.nombre,
    cliente,
    direccion,
    fecha,
    estado: "Pendiente",
    tecnico_id: preselectedTech?.id || null,
    tecnico_nombre: preselectedTech?.name || null,
  };

  const agendarRapido = (e) => {
    e.preventDefault();
    if (!cliente || !direccion || !fecha) return;

    const nueva = {
      id: Date.now(),
      ...baseCita,
    };
    addCita(nueva);
    if (add) add();
    setCliente("");
    setDireccion("");
    setFecha("");
    alert("Cita agendada correctamente.");
  };

  const agendarConDetalles = ({ cliente: c, direccion: d, fecha: f }) => {
    const nueva = {
      id: Date.now(),
      ...baseCita,
      cliente: c,
      direccion: d,
      fecha: f,
    };
    addCita(nueva);
    if (add) add();
    setShowModal(false);
    alert("Cita agendada correctamente.");
  };

  const incrementarContador = () => {
    if (add) add();
  };

  return (
    <div className="card h-100 shadow-sm" data-testid="service-card">
      <div className="card-body">
        <h5 className="card-title mb-1">{service.nombre}</h5>
        <p className="text-muted small mb-2">
          {service.categoria} · {service.duracion} · {service.nivel}
        </p>
        {service.precio ? (
          <p className="fw-semibold mb-2">
            ${service.precio.toLocaleString("es-CL")}
          </p>
        ) : null}
        <p className="mb-3">{service.descripcion}</p>

        {/* Form RÁPIDO */}
        <form onSubmit={agendarRapido} className="row g-2">
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Nombre cliente"
              value={cliente}
              onChange={(e) => setCliente(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              className="form-control"
              placeholder="Dirección"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
            />
          </div>
          <div className="col-md-4">
            <input
              type="datetime-local"
              className="form-control"
              aria-label="Fecha y hora"
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
              step="900"
            />
          </div>

          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary">
              Agendar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => setShowModal(true)}
            >
              Ver detalles
            </button>
            <button
              type="button"
              className="btn btn-outline-primary"
              onClick={incrementarContador}
              aria-label="Agregar"
            >
              Agregar
            </button>
          </div>
        </form>
      </div>

      <ScheduleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        service={service}
        onSubmit={agendarConDetalles}
      />
    </div>
  );
}
