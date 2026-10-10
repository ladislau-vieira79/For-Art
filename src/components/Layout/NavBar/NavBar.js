import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import Logo from "../../img/Logo.png";
import style from "./NavBar.module.css";
import { FaUser, FaBars, FaTimes } from "react-icons/fa";
 
const LINKS = [
  { label: "Feed", to: "/Feed" },
  { label: "Galerias", to: "/Galerias" },
  { label: "Explorar", to: "/Explorar" },
  { label: "Artistas", to: "/Artistas" },
  { label: "Sobre nós", to: "/Sobre" },
];
 
function NavBar() {
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
 
      <div className={style.rightGroup}>
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
 
        <Link to="/Login" className={style.button_navbar}>
          <FaUser />
          <span className={style.loginLabel}>Login</span>
        </Link>
      </div>
    </nav>
  );
}
 
export default NavBar;