import { Link } from 'react-router-dom'
import  estilo  from './NavBar.css'

function NavBar(){
  return(
    <div className={estilo} >
    <nav >
    <ul>
        <li className={estilo.itemMenu}><Link to="/">Home</Link></li>
        <li className={estilo.itemMenu}><Link to="/usuario">Usuário</Link></li>

    </ul>
    </nav>
    </div>
  );
}

export default NavBar