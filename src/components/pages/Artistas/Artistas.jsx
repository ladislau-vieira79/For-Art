import { useMemo, useState } from "react";
import { FaSearch, FaFire } from "react-icons/fa";
import NavBar from "../../Layout/NavBar/NavBar";
import Footer from "../../Layout/Footer";
import CardArtista from "../../common/CardArtistas/CardArtista";
import { ESPECIALIDADES, PAISES, mockArtistas } from "./MockArtistas";
import style from "./Artistas.module.css";
 
const POR_PAGINA = 6;
 
function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}
 
function Artistas() {
  const [pesquisa, setPesquisa] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [pais, setPais] = useState("");
  const [maisSeguidos, setMaisSeguidos] = useState(false);
  const [visiveis, setVisiveis] = useState(POR_PAGINA);
 
  // Top 4 da semana, sempre com base na lista completa (não é afetado pelos filtros)
  const topSemana = useMemo(
    () =>
      [...mockArtistas]
        .sort((a, b) => b.visualizacoesSemana - a.visualizacoesSemana)
        .slice(0, 4),
    []
  );
 
  // TODO: quando ligares à API, troca este useMemo por um fetch com
  // estes filtros como query params.
  const artistasFiltrados = useMemo(() => {
    let lista = [...mockArtistas];
 
    if (especialidade) lista = lista.filter((a) => a.tecnica === especialidade);
    if (pais) lista = lista.filter((a) => a.pais === pais);
 
    if (pesquisa.trim()) {
      const termo = pesquisa.trim().toLowerCase();
      lista = lista.filter(
        (a) =>
          a.nome.toLowerCase().includes(termo) ||
          a.tecnica.toLowerCase().includes(termo)
      );
    }
 
    if (maisSeguidos) {
      lista.sort((a, b) => b.seguidores - a.seguidores);
    }
 
    return lista;
  }, [pesquisa, especialidade, pais, maisSeguidos]);
 
  const artistasVisiveis = artistasFiltrados.slice(0, visiveis);
  const temMais = visiveis < artistasFiltrados.length;
 
  function comReinicio(setter) {
    return (valor) => {
      setter(valor);
      setVisiveis(POR_PAGINA);
    };
  }
 
  return (
    <div>
      <NavBar />
 
      <main className={style.pagina}>
        <div className={style.cabecalho}>
          <span className={style.etiqueta}>Comunidade For Art</span>
          <h1>Artistas</h1>
          <p>
            Descobre e segue artistas de todo o mundo. Cada seguidor conta
            para o alcance e reconhecimento de quem ainda está a construir o
            seu nome.
          </p>
        </div>
 
        <section className={style.topSemana}>
          <div className={style.topTitulo}>
            <FaFire aria-hidden="true" />
            <span>Top artistas da semana</span>
          </div>
          <div className={style.topLista}>
            {topSemana.map((a, index) => (
              <a key={a.id} href={`/artista/${a.id}`} className={style.topItem}>
                <div className={style.topAvatar}>
                  {a.foto ? (
                    <img src={a.foto} alt={a.nome} />
                  ) : (
                    <span>{getIniciais(a.nome)}</span>
                  )}
                  <span className={style.topPosicao}>{index + 1}</span>
                </div>
                <span className={style.topNome}>{a.nome}</span>
                <span className={style.topViews}>
                  {a.visualizacoesSemana.toLocaleString("pt-PT")} visualizações
                </span>
              </a>
            ))}
          </div>
        </section>
 
        <div className={style.busca}>
          <FaSearch aria-hidden="true" />
          <input
            type="text"
            placeholder="Pesquisar artistas por nome ou técnica"
            value={pesquisa}
            onChange={(e) => comReinicio(setPesquisa)(e.target.value)}
          />
        </div>
 
        <div className={style.filtros}>
          <select
            className={style.filtro}
            value={especialidade}
            onChange={(e) => comReinicio(setEspecialidade)(e.target.value)}
          >
            <option value="">Especialidade</option>
            {ESPECIALIDADES.map((e) => (
              <option key={e} value={e}>{e}</option>
            ))}
          </select>
 
          <select
            className={style.filtro}
            value={pais}
            onChange={(e) => comReinicio(setPais)(e.target.value)}
          >
            <option value="">País</option>
            {PAISES.map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
 
          <button
            className={maisSeguidos ? `${style.pillOrdenar} ${style.pillAtiva}` : style.pillOrdenar}
            onClick={() => comReinicio(setMaisSeguidos)((v) => !v)}
          >
            Mais seguidos
          </button>
        </div>
 
        {artistasVisiveis.length > 0 ? (
          <div className={style.grid}>
            {artistasVisiveis.map((a) => (
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
        ) : (
          <p className={style.vazio}>Nenhum artista encontrado com estes filtros.</p>
        )}
 
        {temMais && (
          <button
            className={style.carregarMais}
            onClick={() => setVisiveis((v) => v + POR_PAGINA)}
          >
            Carregar mais artistas
          </button>
        )}
      </main>
 
      <Footer />
    </div>
  );
}
 
export default Artistas;