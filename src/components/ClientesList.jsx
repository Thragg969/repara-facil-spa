import React, { useEffect, useState } from "react";
import { getClientes, deleteCliente } from "../services/clientesService.js";

export default function ClientesList() {
  const [clientes, setClientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [busqueda, setBusqueda] = useState("");

  const cargar = () => {
    setLoading(true);
    getClientes()
      .then((res) => setClientes(res.data))
      .catch((err) => console.error("Error cargando clientes", err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    cargar();
  }, []);

  const filtrarClientes = clientes.filter((c) =>
    `${c.nombre} ${c.correo}`.toLowerCase().includes(busqueda.toLowerCase())
  );

  if (loading)
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status"></div>
        <p className="mt-2">Cargando clientes...</p>
      </div>
    );

  return (
    <div className="container">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fw-bold text-primary">Gestión de Clientes</h2>
        <input
          type="text"
          placeholder="Buscar..."
          className="form-control w-50"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {filtrarClientes.length === 0 ? (
        <div className="alert alert-warning">No hay resultados</div>
      ) : (
        <table className="table table-hover shadow-sm rounded">
          <thead className="table-primary">
            <tr>
              <th>Nombre</th>
              <th>Correo</th>
              <th>Teléfono</th>
              <th className="text-center">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {filtrarClientes.map((c) => (
              <tr key={c.id}>
                <td>{c.nombre}</td>
                <td>{c.correo}</td>
                <td>{c.telefono}</td>
                <td className="text-center">
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => {
                      if (window.confirm("¿Eliminar cliente?")) {
                        deleteCliente(c.id).then(() => cargar());
                      }
                    }}
                  >
                    <i className="bi bi-trash"></i> Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
