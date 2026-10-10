
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
import style from './CardArtista.module.css'

function getIniciais(nome = "") {
  return nome
    .trim()
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((p) => p[0].toUpperCase())
    .join("");
}

function CardArtista({ nome, tecnica, Cidade, foto, to, seguindoInicial = false }) {
  const [seguindo, setSeguindo] = useState(seguindoInicial);

  function handleSeguir(e) {
    e.preventDefault(); // por segurança, caso o botão alguma vez fique dentro de um link
    setSeguindo((s) => !s);
  }

  const Info = (
    <>
      <div className={style.imagem}>
        {foto ? (
          <img src={foto} alt={nome} loading="lazy" />
        ) : (
          <span className={style.iniciais}>{getIniciais(nome)}</span>
        )}
      </div>
      <h3 className={style.Nome}>{nome}</h3>
      <p className={style.tecnica}>
        {tecnica}
        {Cidade && (
          <>
            {" "}
            <FaMapMarkerAlt className={style.pin} aria-hidden="true" /> {Cidade}
          </>
        )}
      </p>
    </>
  );

  return (
    <div className={style.Container}>
      {to ? (
        <Link to={to} className={style.linkArea}>
          {Info}
        </Link>
      ) : (
        Info
      )}

      <button
        className={seguindo ? `${style.btnSeguir} ${style.aSeguir}` : style.btnSeguir}
        onClick={handleSeguir}
      >
        {seguindo ? "A seguir" : "Seguir"}
      </button>
    </div>
  );
}

export default CardArtista