import React, { createContext, useContext, useMemo, useState } from "react";


const AppContext = createContext(null);

export function AppProvider({ children }) {
  // ====== tus estados actuales ======
  const [servicios, setServicios] = useState([]);
  const [tecnicos, setTecnicos] = useState([]);
  const [agenda, setAgenda] = useState([]);

  // ====== tus funciones originales ======
  const addCita = (nuevaCita) => setAgenda((prev) => [...prev, nuevaCita]);
  const removeCita = (id) => setAgenda((prev) => prev.filter((c) => c.id !== id));

  // ======  NUEVO BLOQUE (contador global) ======
  const [counter, setCounter] = useState(0);
  const add = () => setCounter((c) => c + 1);
  const reset = () => setCounter(0);

  // ====== value con todo lo que expones ======
  const value = useMemo(
    () => ({
      servicios,
      tecnicos,
      agenda,
      addCita,
      removeCita,
      // 👇 nuevo agregado
      counter,
      add,
      reset,
    }),
    [servicios, tecnicos, agenda, counter]
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useApp debe usarse dentro de AppProvider");
  return ctx;
}
