import React, { useState } from "react";
import { useApp } from "../context/AppContext.jsx";
import ScheduleModal from "./ScheduleModal.jsx";

export default function ServiceCard({ service }) {
  const { addCita } = useApp();
  const [cliente, setCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [showModal, setShowModal] = useState(false);

  if (!service) return null;

  const agendarRapido = (e) => {
    e.preventDefault();
    if (!cliente || !direccion || !fecha) return;
    addCita({
      id: crypto.randomUUID(),
      servicioId: service.id,
      cliente,
      direccion,
      fecha,
    });
    setCliente("");
    setDireccion("");
    setFecha("");
    alert("✅ Cita agendada");
  };

  const agendarConDetalles = (payload) => {
    addCita({
      id: crypto.randomUUID(),
      ...payload,
    });
    alert("✅ Cita agendada");
  };

  return (
    <div className="card h-100" data-testid="service-card">
      <div className="card-body">
        <h5 className="card-title">{service?.nombre}</h5>
        <p className="card-text small text-muted mb-2">
          {service?.categoria} · {service?.duracion} · {service?.nivel}
        </p>
        {service?.precio && (
          <p className="fw-semibold mb-2">
            $ {service.precio.toLocaleString("es-CL")}
          </p>
        )}
        <p className="card-text">{service?.descripcion}</p>

        {/* Form RÁPIDO (para los tests) */}
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
              value={fecha}
              onChange={(e) => setFecha(e.target.value)}
            />
          </div>
          <div className="col-12 d-flex gap-2">
            <button type="submit" className="btn btn-primary flex-fill">
              Agendar
            </button>
            <button
              type="button"
              className="btn btn-outline-secondary flex-fill"
              aria-label="ver detalles"
              onClick={() => setShowModal(true)}
            >
              Ver detalles
            </button>
          </div>
        </form>
      </div>

      {/* Modal */}
      <ScheduleModal
        show={showModal}
        onClose={() => setShowModal(false)}
        service={service}
        onSubmit={agendarConDetalles}
      />
    </div>
  );
}
