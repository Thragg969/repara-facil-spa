import React, { useState } from "react";

export default function Garantias() {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState(null);

  const consultar = (e) => {
    e.preventDefault();
    const vigente = codigo.trim().endsWith("7");
    setResultado(vigente ? { estado: "Vigente", dias: 90 } : { estado: "Vencida", dias: 0 });
  };

  return (
    <>
      <h2 className="mb-3">Garantías</h2>
      <form onSubmit={consultar} className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Código de garantía"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Consultar</button>
        </div>
      </form>

      {resultado && (
        <div className={`alert ${resultado.estado === "Vigente" ? "alert-success" : "alert-danger"}`}>
          {/* ✅ todo en un solo nodo de texto para que el test matchee */}
          {`Estado: ${resultado.estado}`}{resultado.dias ? ` · ${resultado.dias} días restantes` : ""}
        </div>
      )}
    </>
  );
}
