import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { listarColecoes } from "./mockDescobrir";
import style from "./Descobrir.module.css";

function ColecoesTematicas() {
  const colecoes = listarColecoes();

  return (
    <section aria-labelledby="titulo-colecoes">
      <div className={style.cabecalho}>
        <div>
          <span className={style.etiqueta}>Curadoria</span>
          <h2 id="titulo-colecoes" className={style.titulo}>Coleções temáticas</h2>
          <p className={style.subtitulo}>
            Seleções feitas por pessoas, que juntam obras e artistas à volta de uma ideia.
          </p>
        </div>
      </div>

      <div className={style.gridColecoes}>
        {colecoes.map((c) => (
          <Link
            key={c.slug}
            to={`/colecao/${c.slug}`}
            className={style.colecao}
            style={{ "--c1": c.cor[0], "--c2": c.cor[1] }}
          >
            <span className={style.colecaoContador}>{c.totalObras} obras</span>
            <h3 className={style.colecaoTitulo}>{c.titulo}</h3>
            <p className={style.colecaoDesc}>{c.descricao}</p>
            <span className={style.colecaoCta}>
              Ver coleção <FaArrowRight aria-hidden="true" />
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

export default ColecoesTematicas;