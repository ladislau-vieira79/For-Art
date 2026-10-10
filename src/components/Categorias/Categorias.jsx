
import { useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import style from "./Categorias.module.css";

// TODO: troca "corPlaceholder" pela foto real da categoria (prop "foto"),
// ex: foto: FotoCategoriaPintura (import de uma imagem em /img)
const CATEGORIAS = [
  {
    id: "pintura",
    nome: "Pintura",
    descricao:
      "De óleo a acrílico, aguarela a guache — a categoria mais popular do For Art, com milhares de obras publicadas por artistas de todo o mundo.",
    corPlaceholder: "linear-gradient(150deg,#155EEF 0%, #0B3B91 100%)",
    foto: null,
  },
  {
    id: "escultura",
    nome: "Escultura",
    descricao:
      "Peças em madeira, metal, argila e materiais mistos. Obras físicas, muitas vezes únicas — ideais para colecionadores que procuram algo irrepetível.",
    corPlaceholder: "linear-gradient(150deg,#FF6B00 0%, #0a0e2a 100%)",
    foto: null,
  },
 
  {
    id: "digital",
    nome: "Arte digital",
    descricao:
      "Ilustração digital, arte generativa e peças criadas nativamente em ecrã — a categoria que mais cresce na plataforma.",
    corPlaceholder: "linear-gradient(150deg,#FFB800 0%, #FF6B00 100%)",
    foto: null,
  },
  {
    id: "ilustracao",
    nome: "Ilustração",
    descricao:
      "Desde retratos a banda desenhada e concept art — ilustradores de todos os estilos têm aqui o seu espaço.",
    corPlaceholder: "linear-gradient(150deg,#155EEF 0%, #FFB800 100%)",
    foto: null,
  },
];

function Categorias() {
  const [ativa, setAtiva] = useState(CATEGORIAS[0].id);
  const categoriaAtiva = CATEGORIAS.find((c) => c.id === ativa);

  return (
    <section className={style.secao}>
      <div className={style.cabecalho}>
        <span className={style.etiqueta}>Explora por categoria</span>
        <h2>Arte para todos os gostos</h2>
      </div>

      <div className={style.conteudo}>
        <div className={style.abas} role="tablist">
          {CATEGORIAS.map((cat) => {
            const estaAtiva = cat.id === ativa;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={estaAtiva}
                className={estaAtiva ? `${style.aba} ${style.abaAtiva}` : style.aba}
                onClick={() => setAtiva(cat.id)}
              >
                <span className={style.abaNome}>{cat.nome}</span>
                <p className={style.abaDescricao}>{cat.descricao}</p>
              </button>
            );
          })}
        </div>

        <div className={style.visual}>
          <div
            className={style.foto}
            style={
              categoriaAtiva.foto
                ? { backgroundImage: `url(${categoriaAtiva.foto})` }
                : { background: categoriaAtiva.corPlaceholder }
            }
          >
            <span className={style.legenda}>{categoriaAtiva.nome}</span>
          </div>

          <Link
            to={`/explorar?categoria=${categoriaAtiva.id}`}
            className={style.btnExplorar}
          >
            Explorar {categoriaAtiva.nome} <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Categorias;
