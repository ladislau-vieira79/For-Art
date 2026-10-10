
import { useMemo, useState } from "react";
import { FaSearch } from "react-icons/fa";
import NavBar from "../../Layout/NavBar/NavBar";
import Footer from "../../Layout/Footer";
import Card from "../../common/Card/Card";
import { CATEGORIAS, TECNICAS, PAISES, Mockobras } from "./Mockobras";
import style from "./Explorar.module.css";

const POR_PAGINA = 10;

const FAIXAS_PRECO = [
  { label: "Qualquer preço", min: 0, max: Infinity },
  { label: "Até 50 000 Kz", min: 0, max: 50000 },
  { label: "50 000 – 150 000 Kz", min: 50000, max: 150000 },
  { label: "Mais de 150 000 Kz", min: 150000, max: Infinity },
];

const ORDENACOES = [
  { key: "recentes", label: "Mais recentes" },
  { key: "populares", label: "Mais populares" },
  { key: "preco", label: "Preço ↑" },
];

function Explorar() {
  const [pesquisa, setPesquisa] = useState("");
  const [categoria, setCategoria] = useState("");
  const [tecnica, setTecnica] = useState("");
  const [pais, setPais] = useState("");
  const [faixaPreco, setFaixaPreco] = useState(0);
  const [ordenar, setOrdenar] = useState("recentes");
  const [visiveis, setVisiveis] = useState(POR_PAGINA);

  // TODO: quando ligares à API, troca este useMemo por um fetch com estes
  // filtros como query params, e a paginação por um "cursor"/"page" do backend.
  const obrasFiltradas = useMemo(() => {
    let lista = [...Mockobras];
    const faixa = FAIXAS_PRECO[faixaPreco];

    if (categoria) lista = lista.filter((o) => o.Categoria_Artista === categoria);
    if (tecnica) lista = lista.filter((o) => o.Tecnica === tecnica);
    if (pais) lista = lista.filter((o) => o.Pais === pais);

    lista = lista.filter((o) => {
      const preco = o.precoNumero ?? 0;
      return preco >= faixa.min && preco <= faixa.max;
    });

    if (pesquisa.trim()) {
      const termo = pesquisa.trim().toLowerCase();
      lista = lista.filter(
        (o) =>
          o.Titulo_obra.toLowerCase().includes(termo) ||
          o.Nome_artista.toLowerCase().includes(termo)
      );
    }

    switch (ordenar) {
      case "populares":
        lista.sort((a, b) => b.views - a.views);
        break;
      case "preco":
        lista.sort((a, b) => (a.precoNumero ?? Infinity) - (b.precoNumero ?? Infinity));
        break;
      default:
        lista.sort((a, b) => new Date(b.criadoEm) - new Date(a.criadoEm));
    }

    return lista;
  }, [pesquisa, categoria, tecnica, pais, faixaPreco, ordenar]);

  const obrasVisiveis = obrasFiltradas.slice(0, visiveis);
  const temMais = visiveis < obrasFiltradas.length;

  function limparFiltros() {
    setCategoria("");
    setTecnica("");
    setPais("");
    setFaixaPreco(0);
    setPesquisa("");
    setVisiveis(POR_PAGINA);
  }

  // reinicia a paginação sempre que um filtro muda
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
        <div className={style.buscaLinha}>
          <div className={style.busca}>
            <FaSearch aria-hidden="true" />
            <input
              type="text"
              placeholder="Pesquisar obras, artistas ou técnicas"
              value={pesquisa}
              onChange={(e) => comReinicio(setPesquisa)(e.target.value)}
            />
          </div>
        </div>

        <div className={style.filtros}>
          <select
            className={style.filtro}
            value={categoria}
            onChange={(e) => comReinicio(setCategoria)(e.target.value)}
          >
            <option value="">Categoria</option>
            {CATEGORIAS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <select
            className={style.filtro}
            value={tecnica}
            onChange={(e) => comReinicio(setTecnica)(e.target.value)}
          >
            <option value="">Técnica</option>
            {TECNICAS.map((t) => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>

          <select
            className={style.filtro}
            value={faixaPreco}
            onChange={(e) => comReinicio(setFaixaPreco)(Number(e.target.value))}
          >
            {FAIXAS_PRECO.map((f, i) => (
              <option key={f.label} value={i}>{f.label}</option>
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

          <button className={style.limpar} onClick={limparFiltros}>
            Limpar filtros
          </button>
        </div>

        <div className={style.ordenacao}>
          {ORDENACOES.map((op) => (
            <button
              key={op.key}
              className={
                op.key === ordenar ? `${style.aba} ${style.abaAtiva}` : style.aba
              }
              onClick={() => setOrdenar(op.key)}
            >
              {op.label}
            </button>
          ))}
        </div>

        {obrasVisiveis.length > 0 ? (
          <div className={style.grid}>
            {obrasVisiveis.map((obra) => (
              <Card
                key={obra.id}
                imagem={obra.imagem}
                Titulo_obra={obra.Titulo_obra}
                Nome_artista={obra.Nome_artista}
                Categoria_Artista={obra.Categoria_Artista}
                Preco={obra.Preco}
                to={`/obra/${obra.id}`}
              />
            ))}
          </div>
        ) : (
          <p className={style.vazio}>
            Nenhuma obra encontrada com estes filtros. Tenta ajustar a pesquisa.
          </p>
        )}

        {temMais && (
          <button
            className={style.carregarMais}
            onClick={() => setVisiveis((v) => v + POR_PAGINA)}
          >
            Carregar mais obras
          </button>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default Explorar;