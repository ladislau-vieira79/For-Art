import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaBell,
  FaTag,
  FaRegComments,
  FaUserPlus,
  FaHeart,
  FaCalendarAlt,
  FaCoins,
  FaInfoCircle,
  FaTimes,
  FaCheckDouble,
} from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer";
import { mockNotificacoes } from "./mockNotificacoes";
import style from "./Notificacoes.module.css";

// Rota: <Route path="/notificacoes" element={<Notificacoes />} />
// TODO (API): carregar com fetch; ao clicar, PATCH a marcar como lida.

const ICONES = {
  pedido: { Icone: FaTag, cor: "amarelo" },
  mensagem: { Icone: FaRegComments, cor: "azul" },
  seguidor: { Icone: FaUserPlus, cor: "azul" },
  curtida: { Icone: FaHeart, cor: "vermelho" },
  exposicao: { Icone: FaCalendarAlt, cor: "laranja" },
  venda: { Icone: FaCoins, cor: "verde" },
  sistema: { Icone: FaInfoCircle, cor: "cinza" },
};

const ORDEM_GRUPOS = ["Hoje", "Ontem", "Anteriores"];

function Notificacoes() {
  const [itens, setItens] = useState(mockNotificacoes);
  const [filtro, setFiltro] = useState("todas"); // "todas" | "naoLidas"

  const naoLidas = itens.filter((n) => !n.lida).length;

  const grupos = useMemo(() => {
    const visiveis = filtro === "naoLidas" ? itens.filter((n) => !n.lida) : itens;
    return ORDEM_GRUPOS
      .map((nome) => ({ nome, lista: visiveis.filter((n) => n.grupo === nome) }))
      .filter((g) => g.lista.length > 0);
  }, [itens, filtro]);

  function marcarLida(id) {
    setItens((lista) => lista.map((n) => (n.id === id ? { ...n, lida: true } : n)));
  }

  function marcarTodas() {
    setItens((lista) => lista.map((n) => ({ ...n, lida: true })));
  }

  function remover(id) {
    setItens((lista) => lista.filter((n) => n.id !== id));
  }

  return (
    <>
      <NavBar />

      <main className={style.pagina}>
        <div className={style.caixa}>
          <header className={style.topo}>
            <div>
              <h1>Notificações</h1>
              <p>
                {naoLidas > 0
                  ? `Tens ${naoLidas} ${naoLidas === 1 ? "notificação nova" : "notificações novas"}`
                  : "Estás em dia"}
              </p>
            </div>
            <button className={style.btnTodas} onClick={marcarTodas} disabled={naoLidas === 0}>
              <FaCheckDouble aria-hidden="true" /> Marcar todas como lidas
            </button>
          </header>

          <div className={style.filtros} role="tablist">
            <button
              role="tab"
              aria-selected={filtro === "todas"}
              className={filtro === "todas" ? `${style.filtro} ${style.filtroAtivo}` : style.filtro}
              onClick={() => setFiltro("todas")}
            >
              Todas
            </button>
            <button
              role="tab"
              aria-selected={filtro === "naoLidas"}
              className={filtro === "naoLidas" ? `${style.filtro} ${style.filtroAtivo}` : style.filtro}
              onClick={() => setFiltro("naoLidas")}
            >
              Não lidas {naoLidas > 0 && <span className={style.contador}>{naoLidas}</span>}
            </button>
          </div>

          {grupos.length === 0 ? (
            <div className={style.vazio}>
              <FaBell aria-hidden="true" />
              <p>{filtro === "naoLidas" ? "Não tens notificações por ler." : "Ainda não tens notificações."}</p>
            </div>
          ) : (
            grupos.map((g) => (
              <section key={g.nome} className={style.grupo}>
                <h2>{g.nome}</h2>
                <ul>
                  {g.lista.map((n) => {
                    const { Icone, cor } = ICONES[n.tipo] ?? ICONES.sistema;
                    return (
                      <li key={n.id} className={n.lida ? style.item : `${style.item} ${style.nova}`}>
                        <Link to={n.to} className={style.link} onClick={() => marcarLida(n.id)}>
                          <span className={`${style.icone} ${style[cor]}`}>
                            <Icone aria-hidden="true" />
                          </span>
                          <span className={style.corpo}>
                            <span className={style.texto}>{n.texto}</span>
                            <span className={style.hora}>{n.hora}</span>
                          </span>
                          {!n.lida && <span className={style.ponto} aria-label="Não lida" />}
                        </Link>
                        <button
                          className={style.btnRemover}
                          onClick={() => remover(n.id)}
                          aria-label="Remover notificação"
                        >
                          <FaTimes />
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}

export default Notificacoes;