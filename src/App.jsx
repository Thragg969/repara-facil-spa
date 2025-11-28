// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

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

import { AppProvider } from "./context/AppContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { CartProvider } from "./context/CartContext.jsx";

import PrivateRoute from "./routes/PrivateRoute.jsx";

export default function App() {
  return (
    <AuthProvider>
      <AppProvider>
        <CartProvider>
          <BrowserRouter>
            <AppNavbar />

            <main className="main-content">
              <Routes>
                {/* Rutas públicas */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* Rutas privadas */}
                <Route
                  path="/"
                  element={
                    <PrivateRoute>
                      <Home />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/servicios"
                  element={
                    <PrivateRoute>
                      <Servicios />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/agenda"
                  element={
                    <PrivateRoute>
                      <Agenda />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/garantias"
                  element={
                    <PrivateRoute>
                      <Garantias />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/tecnicos"
                  element={
                    <PrivateRoute>
                      <Tecnicos />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/contacto"
                  element={
                    <PrivateRoute>
                      <Contact />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/clientes"
                  element={
                    <PrivateRoute>
                      <Clientes />
                    </PrivateRoute>
                  }
                />
              </Routes>
            </main>

            <Footer />
          </BrowserRouter>
        </CartProvider>
      </AppProvider>
    </AuthProvider>
  );
}
