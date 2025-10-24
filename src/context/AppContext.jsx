import React, { createContext, useContext, useMemo, useState, useEffect } from "react";
import { SERVICES, TECHS } from "../data/mock.js";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [servicios] = useState(SERVICES);
  const [tecnicos]  = useState(TECHS);

  // carga inicial desde localStorage
  const [agenda, setAgenda] = useState(() => {
    try {
      const raw = localStorage.getItem("reparafacil_agenda");
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });

  // guarda cada cambio
  useEffect(() => {
    localStorage.setItem("reparafacil_agenda", JSON.stringify(agenda));
  }, [agenda]);

  const addCita = (cita) => setAgenda(prev => [...prev, cita]);
  const removeCita = (id) => setAgenda(prev => prev.filter(c => c.id !== id));

  const value = useMemo(() => ({
    servicios, tecnicos, agenda, addCita, removeCita
  }), [servicios, tecnicos, agenda]);

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useApp = () => useContext(AppContext);
