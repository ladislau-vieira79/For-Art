
import { useEffect, useRef, useState } from "react";
import {
  FaHeart,
  FaRegHeart,
  FaRegComment,
  FaRegPaperPlane,
  FaEllipsisH,
  FaTag,
} from "react-icons/fa";
import { MOEDAS, converterPreco } from "./TaxaCambio";
import style from "./PostCard.module.css";


function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}
 
function PostCard({ post }) {
  const [curtido, setCurtido] = useState(post.curtidoInicial);
  const [likes, setLikes] = useState(post.likes);
  const [partilhas, setPartilhas] = useState(post.partilhas ?? 0);
  const [precoAberto, setPrecoAberto] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const precoRef = useRef(null);
 
  function alternarCurtir() {
    setCurtido((c) => {
      setLikes((n) => (c ? n - 1 : n + 1));
      return !c;
    });
  }
 
  function partilhar() {
    // aqui entraria a lógica real de partilha (abrir modal, copiar link, etc.)
    setPartilhas((n) => n + 1);
  }
 
  function solicitarCompra() {
    // aqui entraria a lógica real de pedido de compra (formulário, contacto com o artista, etc.)
    setPedidoEnviado(true);
  }
 
  // fecha o painel de conversão ao clicar fora dele
  useEffect(() => {
    function aoClicarFora(e) {
      if (precoRef.current && !precoRef.current.contains(e.target)) {
        setPrecoAberto(false);
      }
    }
    document.addEventListener("mousedown", aoClicarFora);
    return () => document.removeEventListener("mousedown", aoClicarFora);
  }, []);
 
  const moedaKz = MOEDAS[0];
 
  return (
    <article className={style.post}>
      <header className={style.cabecalho}>
        <div className={style.avatar}>
          {post.avatar ? (
            <img src={post.avatar} alt={post.autor} />
          ) : (
            <span>{getIniciais(post.autor)}</span>
          )}
        </div>
        <div className={style.autorInfo}>
          <span className={style.autorNome}>{post.autor}</span>
          <span className={style.tempo}>{post.tempo}</span>
        </div>
        <button className={style.opcoes} aria-label="Mais opções">
          <FaEllipsisH />
        </button>
      </header>
 
      <div className={style.imagemWrapper}>
        <img src={post.imagem} alt={post.legenda} loading="lazy" />
      </div>
 
      <div className={style.acoes}>
        <button
          className={curtido ? `${style.acaoBtn} ${style.curtido}` : style.acaoBtn}
          onClick={alternarCurtir}
          aria-label={curtido ? "Descurtir" : "Curtir"}
        >
          {curtido ? <FaHeart /> : <FaRegHeart />}
          <span className={style.contagem}>{likes.toLocaleString("pt-PT")}</span>
        </button>
 
        <button className={style.acaoBtn} aria-label="Comentar">
          <FaRegComment />
          <span className={style.contagem}>{post.comentarios.toLocaleString("pt-PT")}</span>
        </button>
 
        <button className={style.acaoBtn} onClick={partilhar} aria-label="Partilhar">
          <FaRegPaperPlane />
          <span className={style.contagem}>{partilhas.toLocaleString("pt-PT")}</span>
        </button>
 
        {post.precoKz != null && (
          <div className={style.precoWrapper} ref={precoRef}>
            <button
              className={style.precoBadge}
              onClick={() => setPrecoAberto((a) => !a)}
              aria-expanded={precoAberto}
            >
              <FaTag className={style.precoIcone} aria-hidden="true" />
              {converterPreco(post.precoKz, moedaKz)}
            </button>
 
            {precoAberto && (
              <div className={style.precoPainel} role="dialog">
                <p className={style.precoPainelTitulo}>Preço da obra</p>
                <ul className={style.precoLista}>
                  {MOEDAS.map((moeda) => (
                    <li key={moeda.codigo} className={style.precoLinha}>
                      <span className={style.precoMoedaNome}>
                        {moeda.nome}
                        <span className={style.precoMoedaCodigo}>{moeda.codigo}</span>
                      </span>
                      <span className={style.precoValor}>
                        {converterPreco(post.precoKz, moeda)}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className={style.precoAviso}>
                  Valores de conversão aproximados, apenas para referência.
                </p>
 
                <button
                  className={style.precoSolicitarBtn}
                  onClick={solicitarCompra}
                  disabled={pedidoEnviado}
                >
                  {pedidoEnviado ? "Pedido enviado ✓" : "Solicitar"}
                </button>
              </div>
            )}
          </div>
        )}
      </div>
 
      <div className={style.conteudo}>
        <p className={style.campo}>
          <span className={style.campoLabel}>Titulo:</span> {post.Titulo}
        </p>
        <p className={style.campo}>
          <span className={style.campoLabel}>Sinopse:</span> {post.legenda}
        </p>
      </div>
    </article>
  );
}
 
export default PostCard;