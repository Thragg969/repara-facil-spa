import { useState } from "react";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import React from 'react';


export default function ScheduleModal({ show, onClose, service, onSubmit }) {
  const [cliente, setCliente] = useState("");
  const [direccion, setDireccion] = useState("");
  const [fecha, setFecha] = useState("");
  const [notas, setNotas] = useState("");

  const handleSave = () => {
    if (!cliente || !direccion || !fecha) return;
    onSubmit({
      cliente, direccion, fecha, notas,
      servicioId: service.id,
    });
    setCliente(""); setDireccion(""); setFecha(""); setNotas("");
    onClose();
  };

  if (!service) return null;

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agendar: {service.nombre}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="g-2">
            <Col md={6}>
              <Form.Control
                placeholder="Nombre cliente"
                value={cliente}
                onChange={e => setCliente(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Dirección"
                value={direccion}
                onChange={e => setDireccion(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                type="datetime-local"
                value={fecha}
                onChange={e => setFecha(e.target.value)}
              />
            </Col>
            <Col md={6}>
              <Form.Control
                placeholder="Notas (opcional)"
                value={notas}
                onChange={e => setNotas(e.target.value)}
              />
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSave}>Guardar cita</Button>
      </Modal.Footer>
    </Modal>
  );
}
