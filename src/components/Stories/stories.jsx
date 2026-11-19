import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { mockStories, euArtista } from "./mockStories";
import AvatarStory from "./avatarStory";
import StoryViewer from "./storyviewer";
import CriarStory from "./CriarStory";
import style from "./stories.module.css";

// Uso no Feed (por cima da lista de posts):
//   import Stories from "../../components/Stories/Stories";
//   <Stories />
//
// TODO (API): carregar os stories com fetch e enviar o novo story com um POST.
// Hoje tudo vive em estado local e desaparece ao recarregar.

function Stories({ podePublicar = true }) {
  const [artistas, setArtistas] = useState(mockStories);
  const [meus, setMeus] = useState([]); // stories publicados por mim
  const [aberto, setAberto] = useState(null); // índice na lista "fila"
  const [criar, setCriar] = useState(false);

  // fila de visualização: os meus primeiro (se existirem), depois os outros
  const fila = [
    ...(meus.length ? [{ ...euArtista, visto: false, stories: meus, meu: true }] : []),
    ...artistas,
  ];

  function marcarVisto(id) {
    if (id === euArtista.id) return;
    setArtistas((lista) => lista.map((a) => (a.id === id ? { ...a, visto: true } : a)));
  }

  function publicar({ imagem, legenda }) {
    setMeus((atuais) => [
      ...atuais,
      { id: Date.now(), imagem, legenda, hora: "agora" },
    ]);
    setCriar(false);
  }

  return (
    <>
      <section className={style.barra} aria-label="Stories">
        {podePublicar && (
          <button className={style.item} onClick={() => setCriar(true)}>
            <span className={style.anelNovo}>
              <AvatarStory nome={euArtista.nome} foto={euArtista.foto} className={style.avatar} />
              <span className={style.mais}><FaPlus aria-hidden="true" /></span>
            </span>
            <span className={style.nome}>O teu story</span>
          </button>
        )}

        {fila.map((a, i) => (
          <button key={`${a.id}-${a.meu ? "meu" : ""}`} className={style.item} onClick={() => setAberto(i)}>
            <span className={a.visto ? `${style.anel} ${style.visto}` : style.anel}>
              <AvatarStory nome={a.nome} foto={a.foto} className={style.avatar} />
            </span>
            <span className={style.nome}>{a.meu ? "Os teus stories" : a.nome.split(" ")[0]}</span>
          </button>
        ))}
      </section>

      {aberto !== null && (
        <StoryViewer
          fila={fila}
          inicio={aberto}
          aoVer={marcarVisto}
          aoFechar={() => setAberto(null)}
        />
      )}

      {criar && <CriarStory aoPublicar={publicar} aoFechar={() => setCriar(false)} />}
    </>
  );
}

export default Stories;