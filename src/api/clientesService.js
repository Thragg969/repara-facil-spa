// src/api/clientesService.js
import api from "./api";

// Obtiene la lista de clientes
export async function getClientes() {
  const response = await api.get("/clientes");
  return response.data;
}

// Elimina un cliente por ID
export async function deleteCliente(id) {
  await api.delete(`/clientes/${id}`);
}
