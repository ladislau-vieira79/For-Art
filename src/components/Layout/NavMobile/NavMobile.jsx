
import { Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import style from "./NavMobile.module.css";
import { FaRegComment } from "react-icons/fa";

// Barra de topo exclusiva para mobile/tablet no Feed.
// Só tem 2 elementos: ícone de mensagens (esquerda) e logo (centro, -> Home).
// Em desktop fica completamente escondida (ver NavMobile.module.css).
function NavMobile() {
  return (
    <nav className={style.Container}>
      <Link to="/mensagens" className={style.button_navbar} aria-label="Mensagens">
        <FaRegComment />
      </Link>
 
      <Link to="/" className={style.logoLink}>
        <img className={style.imag} src={Logo} alt="For Art" />
      </Link>
    </nav>
  );
}
 
export default NavMobile;