
import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer";
import CardGaleria from "../../pages/Galerias/CardGalerias/CardGalerias";
import { AREAS_INTERESSE, PAISES, mockGalerias } from "./Mockgalerias";
import style from "./Galerias.module.css";

const POR_PAGINA = 6;

function Galerias() {
  const [pesquisa, setPesquisa] = useState("");
  const [area, setArea] = useState("");
  const [pais, setPais] = useState("");
  const [visiveis, setVisiveis] = useState(POR_PAGINA);

  // TODO: quando ligares à API, troca este useMemo por um fetch com
  // estes filtros como query params.
  const galeriasFiltradas = useMemo(() => {
    let lista = [...mockGalerias];

    if (area) lista = lista.filter((g) => g.areaInteresse === area);
    if (pais) lista = lista.filter((g) => g.pais === pais);

    if (pesquisa.trim()) {
      const termo = pesquisa.trim().toLowerCase();
      lista = lista.filter((g) => g.nome.toLowerCase().includes(termo));
    }

    return lista;
  }, [pesquisa, area, pais]);

  const galeriasVisiveis = galeriasFiltradas.slice(0, visiveis);
  const temMais = visiveis < galeriasFiltradas.length;

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
          <span className={style.etiqueta}>Parceiros For Art</span>
          <h1>Galerias</h1>
          <p>
            Instituições e curadores que procuram novos talentos diretamente
            na plataforma. Segue, explora e descobre onde a tua arte pode
            chegar a seguir.
          </p>
        </div>

        <div className={style.busca}>
          <FaSearch aria-hidden="true" />
          <input
            type="text"
            placeholder="Pesquisar galerias por nome"
            value={pesquisa}
            onChange={(e) => comReinicio(setPesquisa)(e.target.value)}
          />
        </div>

        <div className={style.filtros}>
          <select
            className={style.filtro}
            value={area}
            onChange={(e) => comReinicio(setArea)(e.target.value)}
          >
            <option value="">Área de interesse</option>
            {AREAS_INTERESSE.map((a) => (
              <option key={a} value={a}>{a}</option>
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
        </div>

        {galeriasVisiveis.length > 0 ? (
          <div className={style.grid}>
            {galeriasVisiveis.map((g) => (
              <CardGaleria
                key={g.id}
                nome={g.nome}
                localizacao={g.localizacao}
                areaInteresse={g.areaInteresse}
                verificada={g.verificada}
                foto={g.foto}
                to={`/galeria/${g.id}`}
              />
            ))}
          </div>
        ) : (
          <p className={style.vazio}>
            Nenhuma galeria encontrada com estes filtros.
          </p>
        )}

        {temMais && (
          <button
            className={style.carregarMais}
            onClick={() => setVisiveis((v) => v + POR_PAGINA)}
          >
            Carregar mais galerias
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Galerias;