import { Link } from "react-router-dom";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { obterArtistaDaSemana } from "./mockDescobrir";
import style from "./Descobrir.module.css";

function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

// Artista escolhido à mão por um curador — vale mais do que qualquer algoritmo.
function ArtistaDaSemana() {
  const dados = obterArtistaDaSemana();
  if (!dados) return null;
  const { artista, obras, texto, curador, semana } = dados;

  return (
    <section className={style.semana} aria-labelledby="titulo-semana">
      <div className={style.semanaTexto}>
        <span className={style.selo}>
          <FaStar aria-hidden="true" /> Artista da semana
        </span>
        <span className={style.semanaPeriodo}>{semana}</span>

        <div className={style.artistaLinha}>
          <div className={style.avatarGrande}>
            {artista.foto ? <img src={artista.foto} alt={artista.nome} /> : getIniciais(artista.nome)}
          </div>
          <div>
            <h2 id="titulo-semana" className={style.nomeArtista}>{artista.nome}</h2>
            <div className={style.metaArtista}>
              {artista.tecnica} · <FaMapMarkerAlt aria-hidden="true" /> {artista.Cidade}, {artista.pais}
            </div>
          </div>
        </div>

        <blockquote className={style.citacao}>{texto}</blockquote>
        <span className={style.curador}>
          Escolha de <strong>{curador.nome}</strong> · {curador.cargo}
        </span>

        <div className={style.acoes}>
          <Link to={`/artista/${artista.id}`} className={style.btnPrimario}>Ver perfil</Link>
          {obras[0] && (
            <Link to={`/obra/${obras[0].id}`} className={style.btnSecundario}>Ver obra em destaque</Link>
          )}
        </div>
      </div>

      <div className={style.semanaObras}>
        {obras.map((o) => (
          <Link key={o.id} to={`/obra/${o.id}`} className={style.obraMini}>
            <div className={style.obraMiniImg}>
              <img src={o.imagem} alt={o.titulo} loading="lazy" />
            </div>
            <span className={style.obraMiniNome}>{o.titulo}</span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ArtistaDaSemana;