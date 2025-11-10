import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  createCliente,
  getClienteById,
  updateCliente,
} from "../services/clientesService.js";

export default function ClienteForm() {
  const [cliente, setCliente] = useState({
    nombre: "",
    correo: "",
    telefono: "",
  });
  const [errores, setErrores] = useState({});
  const { id } = useParams();
  const navigate = useNavigate();

  // Cargar datos del cliente si se está editando
  useEffect(() => {
    if (id) {
      getClienteById(id).then((res) => {
        setCliente(res.data);
      });
    }
  }, [id]);

  // Validaciones del formulario
  const validar = () => {
    const nuevosErrores = {};

    if (!cliente.nombre.trim()) {
      nuevosErrores.nombre = "El nombre es obligatorio.";
    }

    if (!cliente.correo.trim()) {
      nuevosErrores.correo = "El correo es obligatorio.";
    } else if (!/\S+@\S+\.\S+/.test(cliente.correo)) {
      nuevosErrores.correo = "Formato de correo inválido.";
    }

    if (cliente.telefono && !/^[0-9]+$/.test(cliente.telefono)) {
      nuevosErrores.telefono = "El teléfono solo debe contener números.";
    }

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

  // Manejo de cambios
  const handleChange = (e) => {
    setCliente({ ...cliente, [e.target.name]: e.target.value });
  };

  // Envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    if (id) {
      updateCliente(id, cliente).then(() => navigate("/clientes"));
    } else {
      createCliente(cliente).then(() => navigate("/clientes"));
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-sm p-4 border-0">
            <h2 className="text-center text-primary mb-4">
              {id ? "Editar Cliente" : "Registrar Cliente"}
            </h2>

            <form onSubmit={handleSubmit} noValidate>
              <div className="mb-3">
                <label className="form-label fw-semibold">Nombre</label>
                <input
                  name="nombre"
                  value={cliente.nombre}
                  onChange={handleChange}
                  className={`form-control ${
                    errores.nombre ? "is-invalid" : ""
                  }`}
                  placeholder="Ej: Juan Pérez"
                />
                {errores.nombre && (
                  <div className="invalid-feedback">{errores.nombre}</div>
                )}
              </div>

              <div className="mb-3">
                <label className="form-label fw-semibold">Correo</label>
                <input
                  type="email"
                  name="correo"
                  value={cliente.correo}
                  onChange={handleChange}
                  className={`form-control ${
                    errores.correo ? "is-invalid" : ""
                  }`}
                  placeholder="Ej: juanperez@mail.com"
                />
                {errores.correo && (
                  <div className="invalid-feedback">{errores.correo}</div>
                )}
              </div>

              <div className="mb-4">
                <label className="form-label fw-semibold">Teléfono</label>
                <input
                  name="telefono"
                  value={cliente.telefono}
                  onChange={handleChange}
                  className={`form-control ${
                    errores.telefono ? "is-invalid" : ""
                  }`}
                  placeholder="Ej: 987654321"
                />
                {errores.telefono && (
                  <div className="invalid-feedback">{errores.telefono}</div>
                )}
              </div>

              <div className="d-grid">
                <button type="submit" className="btn btn-primary btn-lg">
                  {id ? (
                    <>
                      <i className="bi bi-pencil-square me-2"></i>Actualizar
                    </>
                  ) : (
                    <>
                      <i className="bi bi-save me-2"></i>Guardar
                    </>
                  )}
                </button>
              </div>
            </form>

            <button
              onClick={() => navigate("/clientes")}
              className="btn btn-outline-secondary w-100 mt-3"
            >
              <i className="bi bi-arrow-left-circle me-2"></i>Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
