import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Register() {
  const { registerCliente } = useApp();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    confirmar: "",
  });
  const [error, setError] = useState("");
  const [exito, setExito] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setExito("");

    if (!form.nombre.trim()) {
      setError("El nombre es obligatorio.");
      return;
    }
    if (!form.email.trim()) {
      setError("El correo es obligatorio.");
      return;
    }
    if (form.password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres.");
      return;
    }
    if (form.password !== form.confirmar) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    const resp = registerCliente(form.nombre, form.email, form.password);
    if (!resp.ok) {
      setError(resp.error || "No se pudo registrar el cliente.");
      return;
    }

    setExito("Registro exitoso. Ahora puedes iniciar sesión.");
    setTimeout(() => {
      navigate("/login");
    }, 1200);
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow-sm border-0">
            <h3 className="text-center text-primary mb-3">Registro de cliente</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label" htmlFor="register-nombre">
                  Nombre completo
                </label>
                <input
                  id="register-nombre"
                  name="nombre"
                  className="form-control"
                  value={form.nombre}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="register-email">
                  Correo
                </label>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  className="form-control"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="register-password">
                  Contraseña
                </label>
                <input
                  id="register-password"
                  type="password"
                  name="password"
                  className="form-control"
                  value={form.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label" htmlFor="register-confirmar">
                  Confirmar contraseña
                </label>
                <input
                  id="register-confirmar"
                  type="password"
                  name="confirmar"
                  className="form-control"
                  value={form.confirmar}
                  onChange={handleChange}
                  required
                />
              </div>

              {error && <div className="alert alert-danger py-2">{error}</div>}
              {exito && <div className="alert alert-success py-2">{exito}</div>}

              <button type="submit" className="btn btn-success w-100">
                Registrarme
              </button>
            </form>

            <p className="text-center mt-3 mb-0 small">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
