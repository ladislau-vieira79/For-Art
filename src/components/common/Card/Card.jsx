import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import style from './Cards.module.css'

function Card({
  imagem,
  Titulo_obra,
  Nome_artista,
  Categoria_Artista,
  Preco,
  to,
}) {
  // Se vier um "to" (rota da obra), o card inteiro navega ao clicar.
  // Sem "to", funciona como card estático (ex: pré-visualizações, mockups).
  const Wrapper = to ? Link : "div";
  const wrapperProps = to ? { to } : {};

  return (
    <Wrapper className={style.card} {...wrapperProps}>
      <div className={style.imagemWrapper}>
        <img
          className={style.imagem}
          src={imagem}
          alt={Titulo_obra}
          loading="lazy"
        />
      </div>

      <div className={style.conteudo}>
        <h3 className={style.tituloObra}>{Titulo_obra}</h3>
        <p className={style.nomeArtista}>
          {Nome_artista} · {Categoria_Artista}
        </p>

        <div className={style.rodape}>
          {Preco && <span className={style.preco}>{Preco}</span>}
          <span className={style.BtnCard}>
            Ver obra <FaArrowRight aria-hidden="true" />
          </span>
        </div>
      </div>
    </Wrapper>
  );
}

export default Card