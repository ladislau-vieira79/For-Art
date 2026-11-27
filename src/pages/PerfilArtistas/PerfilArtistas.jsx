import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaPalette,
  FaEnvelope,
  FaInstagram,
  FaGlobe,
  FaTag,
  FaCheckCircle,
  FaCalendarAlt,
} from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer";
import { obterPerfilArtista } from "./mockperfilartistas";
import style from "./PerfilArtistas.module.css";
import { formatarNumero } from "../../utils/formatar";

// Rota: <Route path="/artista/:id" element={<PerfilArtista />} />
// O :id vem do card clicado na página Artistas. Numa versão ligada à API,
// troca obterPerfilArtista(id) por um fetch(`/api/artistas/${id}`).

const TABS = [
  { valor: "obras", label: "Obras" },
  { valor: "sobre", label: "Sobre" },
  { valor: "exposicoes", label: "Exposições" },
];

function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function formatarPreco(precoKz) {
  return `Kz ${formatarNumero(precoKz)}`;
}

function PerfilArtista() {
  const { id } = useParams();
  const artista = obterPerfilArtista(id);
  const [tabAtiva, setTabAtiva] = useState("obras");
  const [aSeguir, setASeguir] = useState(false);

  // Ao abrir outro artista: volta ao topo e reinicia tab e botão seguir
  useEffect(() => {
    window.scrollTo(0, 0);
    setTabAtiva("obras");
    setASeguir(false);
  }, [id]);

  if (!artista) {
    return (
      <>
        <NavBar />
        <main className={style.pagina}>
          <p className={style.vazio}>
            Artista não encontrado.{" "}
            <Link to="/artistas">Voltar à lista de artistas</Link>
          </p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <NavBar />

      <main className={style.pagina}>
        {/* ===== Capa + avatar ===== */}
        <div className={style.capa}>
          <img src={artista.capa} alt="" />
          <div className={style.avatar}>
            {artista.foto ? (
              <img src={artista.foto} alt={artista.nome} />
            ) : (
              <span>{getIniciais(artista.nome)}</span>
            )}
          </div>
        </div>

        {/* ===== Cabeçalho ===== */}
        <header className={style.cabecalho}>
          <div className={style.cabecalhoInfo}>
            <h1 className={style.nome}>
              {artista.nome}
              {artista.verificado && (
                <FaCheckCircle
                  className={style.selo}
                  aria-label="Artista verificado"
                />
              )}
            </h1>
            <p className={style.utilizador}>{artista.utilizador}</p>
            <div className={style.metaLinha}>
              <span>
                <FaMapMarkerAlt aria-hidden="true" /> {artista.localizacao}
              </span>
              <span>
                <FaPalette aria-hidden="true" /> {artista.tecnica}
              </span>
              <span>Membro desde {artista.membroDesde}</span>
            </div>
          </div>

          <div className={style.botoesHero}>
            <Link to="/mensagens" className={style.btnSecundario}>
              <FaEnvelope aria-hidden="true" /> Mensagem
            </Link>
            <button
              className={aSeguir ? `${style.btnPrimario} ${style.aSeguir}` : style.btnPrimario}
              onClick={() => setASeguir((s) => !s)}
            >
              {aSeguir ? "A seguir" : "+ Seguir"}
            </button>
          </div>
        </header>

        {/* ===== Estatísticas ===== */}
        <div className={style.stats}>
          <div className={style.statItem}>
            <span className={style.statNum}>{artista.stats.obras}</span>
            <span className={style.statLbl}>obras publicadas</span>
          </div>
          <div className={style.statItem}>
            <span className={style.statNum}>
              {formatarNumero(artista.stats.seguidores)}
            </span>
            <span className={style.statLbl}>seguidores</span>
          </div>
          <div className={style.statItem}>
            <span className={style.statNum}>
              {formatarNumero(artista.stats.visualizacoesSemana)}
            </span>
            <span className={style.statLbl}>visualizações esta semana</span>
          </div>
        </div>

        {/* ===== Tabs ===== */}
        <div className={style.tabs} role="tablist">
          {TABS.map((tab) => (
            <button
              key={tab.valor}
              role="tab"
              aria-selected={tabAtiva === tab.valor}
              className={
                tabAtiva === tab.valor ? `${style.tab} ${style.tabAtiva}` : style.tab
              }
              onClick={() => setTabAtiva(tab.valor)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* ===== Conteúdo das tabs ===== */}
        {tabAtiva === "obras" && (
          <section className={style.secao}>
            {artista.obras.length === 0 ? (
              <p className={style.vazio}>Este artista ainda não publicou obras.</p>
            ) : (
              <div className={style.gridObras}>
                {artista.obras.map((obra) => (
                  <Link
                    key={obra.id}
                    to={`/obra/${obra.id}`}
                    className={style.obraCard}
                  >
                    <div className={style.obraImgWrapper}>
                      <img src={obra.imagem} alt={obra.titulo} loading="lazy" />
                    </div>
                    <div className={style.obraInfo}>
                      <span className={style.obraTitulo}>{obra.titulo}</span>
                      <span className={style.obraPreco}>
                        <FaTag aria-hidden="true" /> {formatarPreco(obra.precoKz)}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </section>
        )}

        {tabAtiva === "sobre" && (
          <section className={style.secao}>
            <div className={style.sobreGrid}>
              <div className={style.sobreBloco}>
                <h2 className={style.secaoTitulo}>Sobre {artista.nome.split(" ")[0]}</h2>
                <p className={style.bioTexto}>{artista.bio}</p>

                <div className={style.redesLista}>
                  {artista.redes.instagram && (
                    <a href="#" className={style.redeItem}>
                      <FaInstagram aria-hidden="true" /> {artista.redes.instagram}
                    </a>
                  )}
                  {artista.redes.site && (
                    <a href="#" className={style.redeItem}>
                      <FaGlobe aria-hidden="true" /> {artista.redes.site}
                    </a>
                  )}
                </div>
              </div>

              <aside className={style.lateral}>
                <h2 className={style.secaoTitulo}>Em resumo</h2>
                <ul className={style.lateralLista}>
                  <li><FaMapMarkerAlt aria-hidden="true" /> {artista.localizacao}</li>
                  <li><FaPalette aria-hidden="true" /> {artista.tecnica}</li>
                  <li><FaCalendarAlt aria-hidden="true" /> Membro desde {artista.membroDesde}</li>
                </ul>
                <Link to="/mensagens" className={style.btnMensagemGrande}>
                  <FaEnvelope aria-hidden="true" /> Enviar mensagem
                </Link>
              </aside>
            </div>
          </section>
        )}

        {tabAtiva === "exposicoes" && (
          <section className={style.secao}>
            <div className={style.exposicoesLista}>
              {artista.exposicoes.map((exp) => (
                <div key={exp.id} className={style.exposicaoItem}>
                  <div className={style.exposicaoInfo}>
                    <span className={style.exposicaoTitulo}>{exp.titulo}</span>
                    <span className={style.exposicaoMeta}>
                      {exp.galeria} · {exp.periodo}
                    </span>
                  </div>
                  <span
                    className={
                      exp.estado === "em-curso"
                        ? `${style.exposicaoTag} ${style.emCurso}`
                        : `${style.exposicaoTag} ${style.encerrada}`
                    }
                  >
                    {exp.estado === "em-curso" ? "Em curso" : "Encerrada"}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default PerfilArtista;