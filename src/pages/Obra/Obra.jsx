import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaHeart,
  FaRegHeart,
  FaShareAlt,
  FaCheckCircle,
  FaTag,
  FaCertificate,
  FaTruck,
  FaMapMarkerAlt,
  FaArrowLeft,
} from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer";
import { obterObra, obterOutrasObras } from "./MockObra";
import style from "./Obra.module.css";
import { formatarNumero } from "../../utils/formatar";

// Rota: <Route path="/obra/:id" element={<Obra />} />
// O :id vem do card clicado (perfil do artista, perfil da galeria, feed...).
// Numa versão ligada à API, troca obterObra(id) por fetch(`/api/obras/${id}`).

function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function formatarPreco(precoKz) {
  return `Kz ${formatarNumero(precoKz)}`;
}

function Obra() {
  const { id } = useParams();
  const obra = obterObra(id);
  const [imgAtiva, setImgAtiva] = useState(0);
  const [guardada, setGuardada] = useState(false);
  const [pedidoEnviado, setPedidoEnviado] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Ao abrir outra obra: volta ao topo e reinicia o estado
  useEffect(() => {
    window.scrollTo(0, 0);
    setImgAtiva(0);
    setGuardada(false);
    setPedidoEnviado(false);
    setCopiado(false);
  }, [id]);

  async function partilhar() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      /* sem permissão para copiar — ignora */
    }
  }

  if (!obra) {
    return (
      <>
        <NavBar />
        <main className={style.pagina}>
          <p className={style.vazio}>
            Obra não encontrada. <Link to="/explorar">Explorar obras</Link>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  const outras = obterOutrasObras(obra);

  return (
    <>
      <NavBar />

      <main className={style.pagina}>
        <Link to={`/artista/${obra.artista.id}`} className={style.voltar}>
          <FaArrowLeft aria-hidden="true" /> Voltar ao artista
        </Link>

        <div className={style.layout}>
          {/* ===== Imagens ===== */}
          <div className={style.galeria}>
            <div className={style.imgPrincipal}>
              <img src={obra.imagens[imgAtiva]} alt={obra.titulo} />
              {!obra.disponivel && <span className={style.vendida}>Vendida</span>}
            </div>
            <div className={style.miniaturas}>
              {obra.imagens.map((src, i) => (
                <button
                  key={src}
                  className={i === imgAtiva ? `${style.mini} ${style.miniAtiva}` : style.mini}
                  onClick={() => setImgAtiva(i)}
                  aria-label={`Ver imagem ${i + 1}`}
                >
                  <img src={src} alt="" loading="lazy" />
                </button>
              ))}
            </div>
          </div>

          {/* ===== Informação ===== */}
          <div className={style.info}>
            <span className={style.tecnicaTag}>{obra.tecnica}</span>
            <h1 className={style.titulo}>{obra.titulo}</h1>

            <Link to={`/artista/${obra.artista.id}`} className={style.artistaLinha}>
              <span className={style.avatar}>
                {obra.artista.foto ? (
                  <img src={obra.artista.foto} alt={obra.artista.nome} />
                ) : (
                  getIniciais(obra.artista.nome)
                )}
              </span>
              <span>
                <strong>{obra.artista.nome}</strong>
                <small>
                  <FaMapMarkerAlt aria-hidden="true" /> {obra.artista.Cidade}, {obra.artista.pais}
                </small>
              </span>
            </Link>

            <div className={style.precoBloco}>
              <span className={style.preco}>
                <FaTag aria-hidden="true" /> {formatarPreco(obra.precoKz)}
              </span>
              <span className={obra.disponivel ? style.disponivel : style.indisponivel}>
                {obra.disponivel ? "Disponível" : "Vendida"}
              </span>
            </div>

            <div className={style.acoes}>
              {pedidoEnviado ? (
                <Link to="/mensagens" className={`${style.btnPrimario} ${style.enviado}`}>
                  <FaCheckCircle aria-hidden="true" /> Pedido enviado — ver mensagens
                </Link>
              ) : (
                <button
                  className={style.btnPrimario}
                  disabled={!obra.disponivel}
                  onClick={() => setPedidoEnviado(true)}
                >
                  Solicitar obra
                </button>
              )}
              <button
                className={style.btnIcone}
                onClick={() => setGuardada((g) => !g)}
                aria-pressed={guardada}
                aria-label={guardada ? "Remover dos guardados" : "Guardar obra"}
              >
                {guardada ? <FaHeart className={style.coracao} /> : <FaRegHeart />}
              </button>
              <button className={style.btnIcone} onClick={partilhar} aria-label="Copiar link da obra">
                <FaShareAlt />
              </button>
            </div>
            {copiado && <span className={style.aviso}>Link copiado!</span>}

            <h2 className={style.secaoTitulo}>Sobre a obra</h2>
            <p className={style.texto}>{obra.descricao}</p>

            <h2 className={style.secaoTitulo}>Detalhes</h2>
            <dl className={style.detalhes}>
              <div><dt>Técnica</dt><dd>{obra.tecnica}</dd></div>
              <div><dt>Material</dt><dd>{obra.material}</dd></div>
              <div><dt>Dimensões</dt><dd>{obra.dimensoes}</dd></div>
              <div><dt>Ano</dt><dd>{obra.ano}</dd></div>
              <div><dt>Edição</dt><dd>{obra.edicao}</dd></div>
              {obra.galeria && (
                <div>
                  <dt>Galeria</dt>
                  <dd><Link to={`/galeria/${obra.galeria.id}`}>{obra.galeria.nome}</Link></dd>
                </div>
              )}
            </dl>

            <ul className={style.garantias}>
              <li>
                <FaCertificate aria-hidden="true" />
                <span>Certificado de autenticidade incluído</span>
              </li>
              <li>
                <FaTruck aria-hidden="true" />
                <span>Envio ou levantamento combinado com o artista</span>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== Mais deste artista ===== */}
        {outras.length > 0 && (
          <section className={style.mais}>
            <h2 className={style.secaoTitulo}>Mais de {obra.artista.nome}</h2>
            <div className={style.gridMais}>
              {outras.map((o) => (
                <Link key={o.id} to={`/obra/${o.id}`} className={style.maisCard}>
                  <div className={style.maisImg}>
                    <img src={o.imagem} alt={o.titulo} loading="lazy" />
                  </div>
                  <span className={style.maisTitulo}>{o.titulo}</span>
                  <span className={style.maisPreco}>{formatarPreco(o.precoKz)}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default Obra;