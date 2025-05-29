import "./navbar.css";
import { Link } from "react-router-dom";
import { FaCarSide } from "react-icons/fa";

function Navbar(){
  return(
    <nav className="navbar">
      <div className="navbar-left">
          <FaCarSide className="navbar-icon" />
          <span className="navbar-title">AutoFipe</span>
      </div>

      <div className="navbar-menu">
        <Link to="/">Home</Link>
        <Link to="/buscar">Buscar Veiculo</Link>
        <Link to="/veiculos">Veículos Disponíveis</Link>
        <Link to="/adicionar">Adicionar Veículo</Link>
        <Link to="/quem-somos">Quem Somos</Link>
      </div>
    </nav>
  )
}

export default Navbar;