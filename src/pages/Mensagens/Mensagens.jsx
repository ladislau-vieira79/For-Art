import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaSearch,
  FaPaperPlane,
  FaArrowLeft,
  FaCheckCircle,
  FaTag,
  FaRegComments,
} from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import { mockConversas } from "./MockMensagens";
import style from "./Mensagens.module.css";

// Rota: <Route path="/mensagens" element={<Mensagens />} />
// TODO (API): carregar as conversas com fetch e enviar a mensagem com um
// POST — hoje tudo vive em estado local e desaparece ao recarregar.

const ROTULO_PERFIL = {
  artista: "Artista",
  galeria: "Galeria",
  colecionador: "Colecionador",
};

function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function formatarPreco(precoKz) {
  return `Kz ${precoKz.toLocaleString("pt-PT")}`;
}

function ultimaMensagem(conversa) {
  const m = conversa.mensagens[conversa.mensagens.length - 1];
  if (!m) return { texto: "", hora: "" };
  const texto = m.tipo === "pedido" ? `Pedido de compra: ${m.obra.titulo}` : m.texto;
  return { texto: m.de === "eu" ? `Tu: ${texto}` : texto, hora: m.hora };
}

function Avatar({ nome, foto, className }) {
  return (
    <div className={className}>
      {foto ? <img src={foto} alt={nome} /> : <span>{getIniciais(nome)}</span>}
    </div>
  );
}

function Mensagens() {
  const [conversas, setConversas] = useState(mockConversas);
  const [ativaId, setAtivaId] = useState(mockConversas[0]?.id ?? null);
  const [verConversa, setVerConversa] = useState(false); // só afeta o mobile
  const [pesquisa, setPesquisa] = useState("");
  const [texto, setTexto] = useState("");
  const fimRef = useRef(null);

  const ativa = conversas.find((c) => c.id === ativaId) ?? null;

  const lista = useMemo(() => {
    const termo = pesquisa.trim().toLowerCase();
    return termo
      ? conversas.filter((c) => c.nome.toLowerCase().includes(termo))
      : conversas;
  }, [conversas, pesquisa]);

  // abre a conversa e marca como lida
  function abrir(id) {
    setAtivaId(id);
    setVerConversa(true);
    setConversas((cs) => cs.map((c) => (c.id === id ? { ...c, naoLidas: 0 } : c)));
  }

  function enviar(e) {
    e.preventDefault();
    const limpo = texto.trim();
    if (!limpo || !ativa) return;

    const agora = new Date();
    const hora = agora.toLocaleTimeString("pt-PT", { hour: "2-digit", minute: "2-digit" });

    setConversas((cs) =>
      cs.map((c) =>
        c.id === ativa.id
          ? {
              ...c,
              mensagens: [
                ...c.mensagens,
                { id: Date.now(), de: "eu", dia: "Hoje", hora, texto: limpo },
              ],
            }
          : c
      )
    );
    setTexto("");
  }

  // Enter envia, Shift+Enter muda de linha
  function aoPremirTecla(e) {
    if (e.key === "Enter" && !e.shiftKey) {
      enviar(e);
    }
  }

  // desce até à última mensagem ao trocar de conversa ou enviar
  useEffect(() => {
    fimRef.current?.scrollIntoView({ block: "end" });
  }, [ativaId, ativa?.mensagens.length]);

  return (
    <>
      <NavBar />

      <main className={style.pagina}>
        <div
          className={
            verConversa ? `${style.caixa} ${style.mostraConversa}` : style.caixa
          }
        >
          {/* ===== Lista de conversas ===== */}
          <aside className={style.painelLista}>
            <div className={style.listaTopo}>
              <h1 className={style.titulo}>Mensagens</h1>
              <div className={style.busca}>
                <FaSearch aria-hidden="true" />
                <input
                  type="text"
                  placeholder="Pesquisar conversas"
                  value={pesquisa}
                  onChange={(e) => setPesquisa(e.target.value)}
                />
              </div>
            </div>

            <ul className={style.lista}>
              {lista.length === 0 && (
                <li className={style.listaVazia}>Nenhuma conversa encontrada.</li>
              )}
              {lista.map((c) => {
                const ult = ultimaMensagem(c);
                const selecionada = c.id === ativaId;
                return (
                  <li key={c.id}>
                    <button
                      className={
                        selecionada
                          ? `${style.conversa} ${style.conversaAtiva}`
                          : style.conversa
                      }
                      onClick={() => abrir(c.id)}
                    >
                      <Avatar nome={c.nome} foto={c.foto} className={style.avatar} />
                      <div className={style.conversaInfo}>
                        <div className={style.conversaLinha}>
                          <span className={style.conversaNome}>{c.nome}</span>
                          <span className={style.conversaHora}>{ult.hora}</span>
                        </div>
                        <div className={style.conversaLinha}>
                          <span
                            className={
                              c.naoLidas > 0
                                ? `${style.conversaPrevia} ${style.previaNova}`
                                : style.conversaPrevia
                            }
                          >
                            {ult.texto}
                          </span>
                          {c.naoLidas > 0 && (
                            <span className={style.badge}>{c.naoLidas}</span>
                          )}
                        </div>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* ===== Conversa aberta ===== */}
          <section className={style.painelConversa}>
            {!ativa ? (
              <div className={style.semConversa}>
                <FaRegComments aria-hidden="true" />
                <p>Escolhe uma conversa para começar.</p>
              </div>
            ) : (
              <>
                <header className={style.conversaCabecalho}>
                  <button
                    className={style.btnVoltar}
                    onClick={() => setVerConversa(false)}
                    aria-label="Voltar às conversas"
                  >
                    <FaArrowLeft />
                  </button>
                  <Avatar nome={ativa.nome} foto={ativa.foto} className={style.avatar} />
                  <div className={style.cabecalhoInfo}>
                    <span className={style.cabecalhoNome}>
                      {ativa.nome}
                      {ativa.verificado && (
                        <FaCheckCircle
                          className={style.selo}
                          aria-label="Verificado"
                        />
                      )}
                    </span>
                    <span className={style.cabecalhoPerfil}>
                      {ROTULO_PERFIL[ativa.perfil]}
                    </span>
                  </div>
                  {ativa.perfilTo && (
                    <Link to={ativa.perfilTo} className={style.btnVerPerfil}>
                      Ver perfil
                    </Link>
                  )}
                </header>

                <div className={style.mensagens}>
                  {ativa.mensagens.map((m, i) => {
                    const novoDia = i === 0 || ativa.mensagens[i - 1].dia !== m.dia;
                    const minha = m.de === "eu";
                    return (
                      <div key={m.id} className={style.grupo}>
                        {novoDia && <div className={style.dia}>{m.dia}</div>}

                        <div
                          className={
                            minha
                              ? `${style.linhaMsg} ${style.linhaMinha}`
                              : style.linhaMsg
                          }
                        >
                          {m.tipo === "pedido" ? (
                            <div
                              className={
                                minha
                                  ? `${style.pedido} ${style.pedidoMeu}`
                                  : style.pedido
                              }
                            >
                              <span className={style.pedidoEtiqueta}>
                                <FaTag aria-hidden="true" /> Pedido de compra
                              </span>
                              <div className={style.pedidoCorpo}>
                                <img src={m.obra.imagem} alt={m.obra.titulo} />
                                <div>
                                  <span className={style.pedidoTitulo}>{m.obra.titulo}</span>
                                  <span className={style.pedidoPreco}>
                                    {formatarPreco(m.obra.precoKz)}
                                  </span>
                                </div>
                              </div>
                              <span className={style.pedidoEstado}>
                                {m.estado === "pendente" ? "A aguardar resposta" : "Aceite"}
                              </span>
                              <span className={style.hora}>{m.hora}</span>
                            </div>
                          ) : (
                            <div
                              className={
                                minha
                                  ? `${style.balao} ${style.balaoMeu}`
                                  : style.balao
                              }
                            >
                              <p>{m.texto}</p>
                              <span className={style.hora}>{m.hora}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                  <div ref={fimRef} />
                </div>

                <form className={style.compositor} onSubmit={enviar}>
                  <textarea
                    rows={1}
                    placeholder="Escreve uma mensagem..."
                    value={texto}
                    onChange={(e) => setTexto(e.target.value)}
                    onKeyDown={aoPremirTecla}
                  />
                  <button
                    type="submit"
                    className={style.btnEnviar}
                    disabled={!texto.trim()}
                    aria-label="Enviar mensagem"
                  >
                    <FaPaperPlane />
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
    </>
  );
}

export default Mensagens;