
import { FaFacebookF, FaInstagram, FaTiktok, FaYoutube, FaUser } from "react-icons/fa";
import { HiOutlineMail, HiOutlinePhone, HiOutlineLocationMarker } from "react-icons/hi";
import {Link} from 'react-router-dom'
import Logo2 from '../img/Logo2.png'
import { IoSend } from "react-icons/io5";
import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.conteudo}>

        {/* Coluna 1: Logo + descrição + redes sociais */}
        <div className={styles.coluna}>
          <img className={styles.imag} src={Logo2} alt="For Art"/>
          <p className={styles.descricao}>
            Conectamos artistas e amantes da arte, valorizando criatividade, talento e expressão em todas as suas formas.
          </p>
          <div className={styles.redesSociais}>
            <a href="#"><FaFacebookF /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTiktok /></a>
            <a href="#"><FaYoutube /></a>
          </div>
        </div>

        {/* Coluna 2: Navegação */}
        <div className={styles.coluna}>
          <h3 className={styles.tituloColuna}>NAVEGAÇÃO</h3>
          <ul className={styles.lista}>
            <li><a href="#">Feed</a></li>
            <li><a href="#">Galerias</a></li>
            <li><a href="#">Explorar</a></li>
            <li><a href="#">Artistas</a></li>
            <li><a href="#">Sobre nós</a></li>
            
          </ul>
        </div>

        {/* Coluna 3: Categorias */}
        <div className={styles.coluna}>
          <h3 className={styles.tituloColuna}>CATEGORIAS</h3>
          <ul className={styles.lista}>
            <li><a href="#">Pintura</a></li>
            <li><a href="#">Escultura</a></li>
            <li><a href="#">Fotografia</a></li>
            <li><a href="#">Ilustração</a></li>
            <li><a href="#">Arte Digital</a></li>
          </ul>
        </div>

        {/* Coluna 4: Contacto */}
        <div className={styles.coluna}>
          <h3 className={styles.tituloColuna}>CONTACTO</h3>
          <ul className={styles.listaContacto}>
            <li><HiOutlineMail /> contacto@forart.com</li>
            <li><HiOutlinePhone /> +244 900 123 456</li>
            <li><HiOutlineLocationMarker /> Luanda, Angola</li>
          </ul>
        </div>

        {/* Coluna 5: Newsletter */}
        <div className={styles.coluna}>
          <h3 className={styles.tituloColuna}>FOR ART</h3>
          <p className={styles.descricao}>
            Receba novidades sobre exposições, artistas e eventos exclusivos.
          </p>
           <Link to="/Login" >
            <button className={styles.button_navbar} > <FaUser/> Login </button>
           </Link>
        </div>

      </div>

      {/* Linha final */}
      <div className={styles.rodape}>
        <p>© 2026 For Art. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
}

export default Footer;