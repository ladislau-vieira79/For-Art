import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import style from "./NavMobile.module.css";
import { FaBars, FaTimes, FaRegComment } from "react-icons/fa";

const LINKS = [
  { label: "Galerias", to: "/galerias" },
  { label: "Explorar", to: "/explorar" },
  { label: "Artistas", to: "/artistas" },
];

// Barra de topo exclusiva para mobile/tablet (ver NavMobile.module.css:
// em desktop fica completamente escondida).
// Layout: hambúrguer à esquerda (abre os links Galerias/Explorar/Artistas),
// logo centrado (-> Home), ícone de mensagens à direita (-> Mensagens).
function NavMobile() {
  const [isOpen, setIsOpen] = useState(false);

  function closeMenu() {
    setIsOpen(false);
  }

  return (
    <nav className={style.Container}>
      <button
        className={style.hamburger}
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isOpen}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      <Link to="/" className={style.logoLink} onClick={closeMenu}>
        <img className={style.imag} src={Logo} alt="For Art" />
      </Link>

      <Link to="/mensagens" className={style.button_navbar} aria-label="Mensagens">
        <FaRegComment />
      </Link>

      <ul className={`${style.Navbar_links} ${isOpen ? style.open : ""}`}>
        {LINKS.map((link) => (
          <li key={link.to}>
            <NavLink
              className={({ isActive }) =>
                isActive ? `${style.links} ${style.active}` : style.links
              }
              to={link.to}
              onClick={closeMenu}
            >
              {link.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default NavMobile;