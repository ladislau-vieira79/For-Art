import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaTimes, FaTag } from "react-icons/fa";
import AvatarStory from "./avatarStory";
import { DURACAO_STORY_MS } from "./mockStories";
import style from "./storyviewer.module.css";

// Visualizador em ecrã inteiro:
//  - toque/clique à esquerda = anterior, à direita = seguinte
//  - segurar = pausa · setas ← → navegam · Esc fecha
//  - no fim dos stories de um artista passa para o artista seguinte

function StoryViewer({ fila, inicio, aoVer, aoFechar }) {
  const [a, setA] = useState(inicio); // artista
  const [s, setS] = useState(0); // story do artista
  const [pausado, setPausado] = useState(false);

  const artista = fila[a];
  const story = artista.stories[s];

  // marca o artista como visto ao abrir
  useEffect(() => {
    aoVer(artista.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [a]);

  function seguinte() {
    if (s < artista.stories.length - 1) setS(s + 1);
    else if (a < fila.length - 1) { setA(a + 1); setS(0); }
    else aoFechar();
  }

  function anterior() {
    if (s > 0) setS(s - 1);
    else if (a > 0) { setA(a - 1); setS(fila[a - 1].stories.length - 1); }
  }

  // teclado + bloqueia o scroll da página por trás
  useEffect(() => {
    function tecla(e) {
      if (e.key === "Escape") aoFechar();
      if (e.key === "ArrowRight") seguinte();
      if (e.key === "ArrowLeft") anterior();
    }
    window.addEventListener("keydown", tecla);
    const antes = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", tecla);
      document.body.style.overflow = antes;
    };
  });

  function aoTocar(e) {
    const { left, width } = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - left;
    if (x < width / 3) anterior();
    else seguinte();
  }

  return (
    <div className={style.fundo} role="dialog" aria-modal="true" aria-label={`Story de ${artista.nome}`}>
      <div className={style.caixa}>
        {/* barras de progresso */}
        <div className={style.barras}>
          {artista.stories.map((st, i) => (
            <span key={st.id} className={style.barra}>
              <span
                key={i === s ? `ativa-${st.id}` : st.id}
                className={
                  i < s ? `${style.fill} ${style.cheio}` : i === s ? `${style.fill} ${style.correr}` : style.fill
                }
                style={i === s ? { animationDuration: `${DURACAO_STORY_MS}ms`, animationPlayState: pausado ? "paused" : "running" } : undefined}
                onAnimationEnd={i === s ? seguinte : undefined}
              />
            </span>
          ))}
        </div>

        <header className={style.cabecalho}>
          <Link to={artista.meu ? "/" : `/artista/${artista.id}`} className={style.autor} onClick={aoFechar}>
            <AvatarStory nome={artista.nome} foto={artista.foto} className={style.avatar} />
            <span>
              <strong>{artista.meu ? "Tu" : artista.nome}</strong>
              <small>{story.hora}</small>
            </span>
          </Link>
          <button className={style.fechar} onClick={aoFechar} aria-label="Fechar story">
            <FaTimes />
          </button>
        </header>

        {/* imagem + zonas de toque */}
        <div
          className={style.palco}
          onClick={aoTocar}
          onPointerDown={() => setPausado(true)}
          onPointerUp={() => setPausado(false)}
          onPointerLeave={() => setPausado(false)}
        >
          <img key={story.id} src={story.imagem} alt={story.legenda || `Story de ${artista.nome}`} draggable={false} />
        </div>

        {(story.legenda || story.obraId) && (
          <footer className={style.rodape}>
            {story.legenda && <p>{story.legenda}</p>}
            {story.obraId && (
              <Link to={`/obra/${story.obraId}`} className={style.verObra} onClick={aoFechar}>
                <FaTag aria-hidden="true" /> Ver obra
              </Link>
            )}
          </footer>
        )}
      </div>
    </div>
  );
}

export default StoryViewer;