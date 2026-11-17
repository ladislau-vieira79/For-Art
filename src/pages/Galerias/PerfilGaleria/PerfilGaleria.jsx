import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaGlobe,
  FaPhone,
  FaTag,
  FaCheckCircle,
  FaBuilding,
} from "react-icons/fa";
import NavBar from "../../../components/Layout/NavBar/NavBar";
import Footer from "../../../components/Layout/Footer";
import CardArtista from "../../../components/common/CardArtistas/CardArtista";
import { obterPerfilGaleria } from "./MockPerfilGaleria";
import style from "./PerfilGaleria.module.css";

// Rota: <Route path="/galeria/:id" element={<PerfilGaleria />} />
// O :id vem do card clicado na página Galerias. Numa versão ligada à API,
// troca obterPerfilGaleria(id) por um fetch(`/api/galerias/${id}`).

const TABS = [
  { valor: "sobre", label: "Sobre" },
  { valor: "obras", label: "Obras em destaque" },
  { valor: "artistas", label: "Artistas representados" },
  { valor: "exposicoes", label: "Exposições" },
  { valor: "contacto", label: "Contacto" },
];

function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function formatarPreco(precoKz) {
  return `Kz ${precoKz.toLocaleString("pt-PT")}`;
}

function PerfilGaleria() {
  const { id } = useParams();
  const galeria = obterPerfilGaleria(id);
  const [tabAtiva, setTabAtiva] = useState("sobre");
  const [aSeguir, setASeguir] = useState(false);

  // Ao abrir outra galeria: volta ao topo e reinicia tab e botão seguir
  useEffect(() => {
    window.scrollTo(0, 0);
    setTabAtiva("sobre");
    setASeguir(false);
  }, [id]);

  if (!galeria) {
    return (
      <>
        <NavBar />
        <main className={style.pagina}>
          <p className={style.vazio}>
            Galeria não encontrada.{" "}
            <Link to="/galerias">Voltar à lista de galerias</Link>
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
        {/* ===== Capa + logo ===== */}
        <div className={style.capa}>
          <img src={galeria.capa} alt="" />
          <div className={style.logo}>
            {galeria.foto ? (
              <img src={galeria.foto} alt={galeria.nome} />
            ) : (
              <span>{getIniciais(galeria.nome)}</span>
            )}
          </div>
        </div>

        {/* ===== Cabeçalho ===== */}
        <header className={style.cabecalho}>
          <div className={style.cabecalhoInfo}>
            <h1 className={style.nome}>
              {galeria.nome}
              {galeria.verificada && (
                <FaCheckCircle
                  className={style.selo}
                  aria-label="Galeria verificada"
                />
              )}
            </h1>
            <div className={style.metaLinha}>
              <span>
                <FaMapMarkerAlt aria-hidden="true" /> {galeria.localizacao}
              </span>
              <span>
                <FaBuilding aria-hidden="true" /> {galeria.areaInteresse}
              </span>
              <span>Membro desde {galeria.membroDesde}</span>
            </div>
          </div>

          <div className={style.botoesHero}>
            <Link to="/mensagens" className={style.btnSecundario}>
              <FaEnvelope aria-hidden="true" /> Contactar
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
            <span className={style.statNum}>{galeria.stats.artistas}</span>
            <span className={style.statLbl}>artistas representados</span>
          </div>
          <div className={style.statItem}>
            <span className={style.statNum}>{galeria.stats.obras}</span>
            <span className={style.statLbl}>obras expostas</span>
          </div>
          <div className={style.statItem}>
            <span className={style.statNum}>{galeria.stats.exposicoes}</span>
            <span className={style.statLbl}>exposições</span>
          </div>
          <div className={style.statItem}>
            <span className={style.statNum}>
              {galeria.stats.seguidores.toLocaleString("pt-PT")}
            </span>
            <span className={style.statLbl}>seguidores</span>
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
        {tabAtiva === "sobre" && (
          <section className={style.secao}>
            <div className={style.bloco}>
              <h2 className={style.secaoTitulo}>Sobre a galeria</h2>
              <p className={style.texto}>{galeria.sobre}</p>
              <div className={style.tags}>
                {galeria.areas.map((a) => (
                  <span key={a} className={style.tag}>{a}</span>
                ))}
              </div>
            </div>
          </section>
        )}

        {tabAtiva === "obras" && (
          <section className={style.secao}>
            <div className={style.gridObras}>
              {galeria.obras.map((obra) => (
                <Link key={obra.id} to={`/obra/${obra.id}`} className={style.obraCard}>
                  <div className={style.obraImgWrapper}>
                    <img src={obra.imagem} alt={obra.titulo} loading="lazy" />
                  </div>
                  <div className={style.obraInfo}>
                    <span className={style.obraTitulo}>{obra.titulo}</span>
                    <span className={style.obraArtista}>{obra.artista}</span>
                    <span className={style.obraPreco}>
                      <FaTag aria-hidden="true" /> {formatarPreco(obra.precoKz)}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {tabAtiva === "artistas" && (
          <section className={style.secao}>
            <div className={style.gridArtistas}>
              {galeria.artistas.map((a) => (
                <CardArtista
                  key={a.id}
                  nome={a.nome}
                  tecnica={a.tecnica}
                  Cidade={a.Cidade}
                  foto={a.foto}
                  to={`/artista/${a.id}`}
                />
              ))}
            </div>
          </section>
        )}

        {tabAtiva === "exposicoes" && (
          <section className={style.secao}>
            <div className={style.exposicoesLista}>
              {galeria.exposicoes.map((exp) => (
                <div key={exp.id} className={style.exposicaoItem}>
                  <div className={style.exposicaoInfo}>
                    <span className={style.exposicaoTitulo}>{exp.titulo}</span>
                    <span className={style.exposicaoMeta}>
                      {exp.local} · {exp.periodo}
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

        {tabAtiva === "contacto" && (
          <section className={style.secao}>
            <div className={style.bloco}>
              <h2 className={style.secaoTitulo}>Contacto &amp; localização</h2>
              <ul className={style.contactoLista}>
                <li><FaMapMarkerAlt aria-hidden="true" /> {galeria.contacto.morada}</li>
                <li><FaEnvelope aria-hidden="true" /> {galeria.contacto.email}</li>
                <li><FaPhone aria-hidden="true" /> {galeria.contacto.telefone}</li>
                <li><FaGlobe aria-hidden="true" /> {galeria.contacto.site}</li>
                <li><FaInstagram aria-hidden="true" /> {galeria.contacto.instagram}</li>
              </ul>
              <Link to="/mensagens" className={style.btnContactoGrande}>
                <FaEnvelope aria-hidden="true" /> Enviar mensagem à galeria
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}

export default PerfilGaleria;