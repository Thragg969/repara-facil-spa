import React from "react";
import { Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext.jsx";

import AppNavbar from "./components/AppNavbar.jsx";
import Footer from "./components/Footer.jsx";
import Home from "./pages/Home.jsx";
import Servicios from "./pages/Servicios.jsx";
import Agenda from "./pages/Agenda.jsx";
import Garantias from "./pages/Garantias.jsx";
import Tecnicos from "./pages/Tecnicos.jsx";
import Contact from "./pages/Contact.jsx";
import Clientes from "./pages/Clientes.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

export default function App() {
  return (
    <AppProvider>
      <AppNavbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<Home />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/agenda" element={<Agenda />} />
          <Route path="/garantias" element={<Garantias />} />
          <Route path="/tecnicos" element={<Tecnicos />} />
          <Route path="/contacto" element={<Contact />} />
          <Route path="/clientes" element={<Clientes />} />
        </Routes>
      </main>
      <Footer />
    </AppProvider>
  );
}

