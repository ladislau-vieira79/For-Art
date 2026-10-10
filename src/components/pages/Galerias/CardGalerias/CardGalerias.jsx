
import { Link } from "react-router-dom";
import { FaMapMarkerAlt, FaCheckCircle } from "react-icons/fa";
import style from "./CardGalerias.module.css";

function getIniciais(nome = "") {
  return nome
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function CardGaleria({ nome, localizacao, areaInteresse, foto, verificada, to }) {
  return (
    <div className={style.Container}>
      <Link to={to} className={style.linkArea}>
        <div className={style.logo}>
          {foto ? (
            <img src={foto} alt={nome} loading="lazy" />
          ) : (
            <span className={style.iniciais}>{getIniciais(nome)}</span>
          )}
        </div>

        <div className={style.nomeLinha}>
          <h3 className={style.Nome}>{nome}</h3>
          {verificada && (
            <FaCheckCircle className={style.selo} title="Galeria verificada" />
          )}
        </div>

        <p className={style.localizacao}>
          <FaMapMarkerAlt className={style.pin} aria-hidden="true" /> {localizacao}
        </p>

        {areaInteresse && <span className={style.tag}>{areaInteresse}</span>}
      </Link>

      <Link to={to} className={style.btnPerfil}>
        Ver perfil
      </Link>
    </div>
  );
}

export default CardGaleria;