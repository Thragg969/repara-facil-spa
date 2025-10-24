import React from "react";
import HeroSection from "../components/HeroSection.jsx";
import TechnicianCard from "../components/TechnicianCard.jsx";
import Testimonials from "../components/Testimonials.jsx";
import { TECHS } from "../data/mock.js";

export default function Home() {
  return (
    <>
      {/* Encabezado principal esperado por los tests */}
      <section className="text-center py-5 bg-light">
        <div className="container">
          <h1 className="fw-bold text-primary mb-3">
            Bienvenido a ReparaFácil
          </h1>
          <p className="text-muted mb-4">
            Tu reparación fácil, rápida y segura 🔧
          </p>
          <a
            role="button"
            href="/servicios"
            className="btn btn-primary px-4 py-2"
          >
            Ver servicios
          </a>
        </div>
      </section>

      <section className="container py-5">
        <h2 className="text-center mb-4 text-primary">
          Técnicos destacados 👨‍🔧
        </h2>
        <div className="row">
          {TECHS.map((tech) => (
            <TechnicianCard key={tech.id} tech={tech} />
          ))}
        </div>
      </section>

      <Testimonials />
    </>
  );
}
