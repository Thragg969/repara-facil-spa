import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext.jsx";

export default function Login() {
  const { login } = useApp();
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const ok = login(form.email, form.password);
    if (ok) {
      setError("");
      navigate("/"); // o /clientes si quieres
    } else {
      setError("Credenciales incorrectas. Prueba con admin@reparafacil.cl / 123456");
    }
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card p-4 shadow-sm border-0">
            <h3 className="text-center text-primary mb-3">Iniciar sesión</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Correo</label>
                <input
                    type="email"
                    name="email"
                    className="form-control"
                    value={form.email}
                    onChange={handleChange}
                    required
                    placeholder="admin@reparafacil.cl"
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                    type="password"
                    name="password"
                    className="form-control"
                    value={form.password}
                    onChange={handleChange}
                    required
                    placeholder="123456"
                />
              </div>
              {error && <div className="alert alert-danger py-2">{error}</div>}
              <button type="submit" className="btn btn-primary w-100">
                Entrar
              </button>
            </form>
            <p className="text-muted small mt-3 mb-0">
              Usuario demo: <strong>admin@reparafacil.cl</strong> / <strong>123456</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
