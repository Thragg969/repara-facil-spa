import { Link } from "react-router-dom";

export default function AppNavbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">🔧 ReparaFácil SPA</Link>
        <div className="collapse navbar-collapse">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item"><Link className="nav-link" to="/">Inicio</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/servicios">Servicios</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/agenda">Agenda</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/garantias">Garantías</Link></li>
            <li className="nav-item"><Link className="nav-link" to="/tecnicos">Técnicos</Link></li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
