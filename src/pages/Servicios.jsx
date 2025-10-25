import React, { useState, useMemo } from "react";
import { useApp } from "../context/AppContext.jsx";
import ServiceCard from "../components/ServiceCard.jsx";

export default function Servicios() {
  const { servicios } = useApp();

  const serviciosMock = [
    {
      id: "s1",
      nombre: "Reparación de Lavadora",
      categoria: "Electrodomésticos",
      duracion: "2 horas",
      nivel: "Básico",
      precio: 25000,
      descripcion: "Servicio completo de diagnóstico y reparación de lavadoras.",
    },
    {
      id: "s2",
      nombre: "Instalación Eléctrica",
      categoria: "Electricidad",
      duracion: "1 hora",
      nivel: "Intermedio",
      precio: 18000,
      descripcion: "Instalación y revisión de puntos eléctricos domiciliarios.",
    },
  ];

  const listaServicios = servicios?.length ? servicios : serviciosMock;

  // 👇 Nuevo: estados para filtros
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todas");

  // 👇 Lógica del filtro
  const serviciosFiltrados = useMemo(() => {
    return listaServicios.filter((s) => {
      const matchSearch = s.nombre.toLowerCase().includes(search.toLowerCase());
      const matchCategoria =
        categoria === "todas" || s.categoria === categoria;
      return matchSearch && matchCategoria;
    });
  }, [listaServicios, search, categoria]);

  // 👇 categorías dinámicas
  const categorias = ["todas", ...new Set(listaServicios.map((s) => s.categoria))];

  return (
    <div className="container py-4">
      <h2 className="mb-3">Servicios</h2>

      {/* Filtros funcionales */}
      <div className="row g-2 mb-3">
        <div className="col-md-6">
          <input
            className="form-control"
            placeholder="Buscar por nombre o descripción…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="col-md-4">
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Lista de resultados filtrados */}
      <div className="row g-3">
        {serviciosFiltrados.length > 0 ? (
          serviciosFiltrados.map((s) => (
            <div className="col-md-6 col-lg-4" key={s.id}>
              <ServiceCard service={s} />
            </div>
          ))
        ) : (
          <div className="col-12">
            <div className="alert alert-warning mb-0">
              No encontramos servicios con esos filtros.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
