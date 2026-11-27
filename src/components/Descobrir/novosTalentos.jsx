import { Link } from "react-router-dom";
import { FaSyncAlt } from "react-icons/fa";
import CardArtista from "../common/CardArtistas/CardArtista";
import { selecionarNovosTalentos } from "./mockDescobrir";
import style from "./Descobrir.module.css";

// Mostra os novos talentos "em destaque hoje". A seleção roda todos os dias
// (ver selecionarNovosTalentos), por isso ninguém fica de fora para sempre.
function NovosTalentos({ quantidade = 4 }) {
  const artistas = selecionarNovosTalentos(quantidade);

  return (
    <section aria-labelledby="titulo-novos">
      <div className={style.cabecalho}>
        <div>
          <span className={style.etiqueta}>Em destaque hoje</span>
          <h2 id="titulo-novos" className={style.titulo}>Novos talentos</h2>
          <p className={style.subtitulo}>
            Artistas a começar o seu caminho. Aqui não ganha quem tem mais seguidores:
            todos os dias muda a seleção, para cada artista ter a sua vez.
          </p>
        </div>
        <Link to="/artistas" className={style.verTodos}>Ver todos os artistas →</Link>
      </div>

      <div className={style.gridNovos}>
        {artistas.map((a) => (
          <div key={a.id} className={style.cartao}>
            <span className={style.fita}>Novo talento</span>
            <CardArtista
              nome={a.nome}
              tecnica={a.tecnica}
              Cidade={a.Cidade}
              foto={a.foto}
              to={`/artista/${a.id}`}
            />
          </div>
        ))}
      </div>

      <p className={style.nota}>
        <FaSyncAlt aria-hidden="true" /> A seleção muda todos os dias à meia-noite.
      </p>
    </section>
  );
}

export default NovosTalentos;