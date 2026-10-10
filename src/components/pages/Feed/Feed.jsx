
import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import {
  FaHome,
  FaSearch,
  FaPlusSquare,
  FaBell,
  FaUser,
  FaEnvelope,
  FaFire,
} from "react-icons/fa";
import NavMobile from "../../Layout/NavMobile/NavMobile";
import PostCard from "../../pages/Feed/PostCard/PostCard";
import Logo from "../../img/Logo.png";
import { mockPosts, mockTopSemana, mockSugestoes } from "./Mockfeed";
import style from "./Feed.module.css";

const NAV_ITEMS = [
  { label: "Feed", to: "/feed", icon: FaHome },
  { label: "Explorar", to: "/explorar", icon: FaSearch },
  { label: "Publicar", to: "/publicar", icon: FaPlusSquare },
  { label: "Notificações", to: "/notificacoes", icon: FaBell },
  { label: "Mensagens", to: "/mensagens", icon: FaEnvelope, escondeMobile: true },
  { label: "Perfil", to: "/perfil", icon: FaUser },
];

function getIniciais(nome = "") {
  return nome.trim().split(" ").filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join("");
}

function Feed() {
  const [sugestoes, setSugestoes] = useState(
    mockSugestoes.map((s) => ({ ...s, seguindo: false }))
  );

  function alternarSeguir(id) {
    setSugestoes((lista) =>
      lista.map((s) => (s.id === id ? { ...s, seguindo: !s.seguindo } : s))
    );
  }

  return (
    <div className={style.layout}>
      {/* ===== Barra de topo (só mobile/tablet) =====
          Componente próprio (NavMobile): logo centrado (-> Home) e ícone
          de mensagens à esquerda. Fica escondido em desktop pelo seu
          próprio CSS — o resto do Feed (sidebar, posts, aside) não foi
          tocado. */}
      <div className={style.navMobileWrap}>
        <NavMobile />
      </div>

      {/* ===== Navegação lateral (desktop) / inferior (mobile) ===== */}
      <nav className={style.sidebar}>
        <Link to="/" className={style.logo}>
          <img src={Logo} alt="For Art" />
        </Link>

        <ul className={style.navLista}>
          {NAV_ITEMS.map(({ label, to, icon: Icon, escondeMobile }) => (
            <li
              key={to}
              className={escondeMobile ? style.escondeMobile : undefined}
            >
              <NavLink
                to={to}
                className={({ isActive }) =>
                  isActive ? `${style.navLink} ${style.navLinkAtivo}` : style.navLink
                }
              >
                <Icon className={style.navIcon} />
                <span className={style.navLabel}>{label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* ===== Feed central ===== */}
      <main className={style.feed}>
        {/* Top artistas em carrossel — só visível em mobile/tablet */}
        <section className={style.topMobile}>
          <div className={style.topMobileTitulo}>
            <FaFire aria-hidden="true" /> Top artistas da semana
          </div>
          <div className={style.topMobileLista}>
            {mockTopSemana.map((a) => (
              <Link key={a.id} to={`/artista/${a.id}`} className={style.topMobileItem}>
                <div className={style.topMobileAvatar}>
                  {a.foto ? <img src={a.foto} alt={a.nome} /> : <span>{getIniciais(a.nome)}</span>}
                </div>
                <span>{a.nome.split(" ")[0]}</span>
              </Link>
            ))}
          </div>
        </section>

        {mockPosts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </main>

      {/* ===== Coluna direita (só desktop) ===== */}
      <aside className={style.asideDesktop}>
        <div className={style.card}>
          <div className={style.cardTitulo}>
            <FaFire aria-hidden="true" /> Top artistas da semana
          </div>
          {mockTopSemana.map((a, i) => (
            <Link key={a.id} to={`/artista/${a.id}`} className={style.topLinha}>
              <span className={style.topPosicao}>{i + 1}</span>
              <div className={style.topAvatar}>
                {a.foto ? <img src={a.foto} alt={a.nome} /> : <span>{getIniciais(a.nome)}</span>}
              </div>
              <div className={style.topInfo}>
                <span className={style.topNome}>{a.nome}</span>
                <span className={style.topViews}>
                  {a.visualizacoesSemana.toLocaleString("pt-PT")} visualizações
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className={style.card}>
          <div className={style.cardTitulo}>Sugestões para seguir</div>
          {sugestoes.map((s) => (
            <div key={s.id} className={style.sugestaoLinha}>
              <div className={style.topAvatar}>
                {s.foto ? <img src={s.foto} alt={s.nome} /> : <span>{getIniciais(s.nome)}</span>}
              </div>
              <div className={style.topInfo}>
                <span className={style.topNome}>{s.nome}</span>
                <span className={style.topViews}>{s.tecnica}</span>
              </div>
              <button
                className={s.seguindo ? `${style.seguirBtn} ${style.seguindo}` : style.seguirBtn}
                onClick={() => alternarSeguir(s.id)}
              >
                {s.seguindo ? "A seguir" : "Seguir"}
              </button>
            </div>
          ))}
        </div>
      </aside>
    </div>
  );
}

export default Feed;