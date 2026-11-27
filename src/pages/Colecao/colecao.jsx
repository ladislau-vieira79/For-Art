import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer";
import Card from "../../components/common/Card/Card";
import { obterColecao } from "../../components/Descobrir/mockDescobrir";
import { formatarKz } from "../../utils/formatar";
import style from "./colecao.module.css";

// Rota: <Route path="/colecao/:slug" element={<Colecao />} />
// Numa versão ligada à API, troca obterColecao(slug) por fetch(`/api/colecoes/${slug}`).

function Colecao() {
  const { slug } = useParams();
  const colecao = obterColecao(slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  if (!colecao) {
    return (
      <>
        <NavBar />
        <main className={style.pagina}>
          <p className={style.vazio}>
            Coleção não encontrada. <Link to="/explorar">Explorar obras</Link>
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
        <header
          className={style.topo}
          style={{ "--c1": colecao.cor[0], "--c2": colecao.cor[1] }}
        >
          <Link to="/explorar" className={style.voltar}>
            <FaArrowLeft aria-hidden="true" /> Voltar
          </Link>
          <span className={style.etiqueta}>Coleção</span>
          <h1>{colecao.titulo}</h1>
          <p>{colecao.descricao}</p>
          <span className={style.curador}>
            Curadoria: <strong>{colecao.curador}</strong> · {colecao.obras.length} obras
          </span>
        </header>

        <div className={style.grid}>
          {colecao.obras.map((o) => (
            <Card
              key={o.id}
              imagem={o.imagem}
              Titulo_obra={o.titulo}
              Nome_artista={o.artista}
              Categoria_Artista={o.tecnica}
              Preco={formatarKz(o.precoKz)}
              to={`/obra/${o.id}`}
            />
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Colecao;