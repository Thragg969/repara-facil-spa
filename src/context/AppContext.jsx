import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ====== tus estados originales ======
  const [servicios, setServicios] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [agenda, setAgenda] = useState([]);

  // ====== funciones originales ======
  const addCita = (nuevaCita) => setAgenda((prev) => [...prev, nuevaCita]);
  const removeCita = (id) => setAgenda((prev) => prev.filter((c) => c.id !== id));

  // ====== contador global ======
  const [counter, setCounter] = useState(0);
  const add = () => setCounter((c) => c + 1);
  const reset = () => setCounter(0);

  // ====== autenticación básica ======
  const [usuario, setUsuario] = useState(null);

  // Cargar usuario desde localStorage al iniciar
  useEffect(() => {
    const guardado = localStorage.getItem("usuario");
    if (guardado) setUsuario(JSON.parse(guardado));
  }, []);

  // Guardar usuario cuando cambia
  useEffect(() => {
    if (usuario) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
    }
  }, [usuario]);

  const login = (email, password) => {
    // Puedes modificar esto si más adelante conectas con una API real
    if (email === "admin@reparafacil.cl" && password === "123456") {
      const nuevoUsuario = { nombre: "Administrador", email };
      setUsuario(nuevoUsuario);
      localStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUsuario(null);
    localStorage.removeItem("usuario");
  };

  // ====== value con todo expuesto ======
  const value = useMemo(
    () => ({
      servicios,
      tecnicos,
      agenda,
      addCita,
      removeCita,
      counter,
      add,
      reset,
      // 🔐 nuevos estados
      usuario,
      login,
      logout,
    }),
    [servicios, tecnicos, agenda, counter, usuario]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
}
