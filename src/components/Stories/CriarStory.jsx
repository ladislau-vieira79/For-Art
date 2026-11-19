import { useEffect, useRef, useState } from "react";
import { FaTimes, FaCloudUploadAlt } from "react-icons/fa";
import style from "./criarStory.module.css";

const MAX_MB = 5;
const MAX_LEGENDA = 120;

function CriarStory({ aoPublicar, aoFechar }) {
  const [imagem, setImagem] = useState(null); // URL de pré-visualização
  const [ficheiro, setFicheiro] = useState(null);
  const [legenda, setLegenda] = useState("");
  const [erro, setErro] = useState("");
  const inputRef = useRef(null);

  useEffect(() => {
    function tecla(e) { if (e.key === "Escape") aoFechar(); }
    window.addEventListener("keydown", tecla);
    return () => window.removeEventListener("keydown", tecla);
  }, [aoFechar]);

  // liberta a URL temporária ao trocar de imagem / fechar
  useEffect(() => () => { if (imagem) URL.revokeObjectURL(imagem); }, [imagem]);

  function escolher(e) {
    const f = e.target.files?.[0];
    e.target.value = "";
    if (!f) return;
    if (!f.type.startsWith("image/")) return setErro("Escolhe uma imagem (JPG, PNG ou WEBP).");
    if (f.size > MAX_MB * 1024 * 1024) return setErro(`A imagem pode ter no máximo ${MAX_MB} MB.`);
    setErro("");
    setFicheiro(f);
    setImagem(URL.createObjectURL(f));
  }

  function enviar(e) {
    e.preventDefault();
    if (!imagem) return setErro("Adiciona uma imagem para o story.");
    // TODO (API): enviar `ficheiro` e `legenda` com FormData (POST /api/stories)
    aoPublicar({ imagem, legenda: legenda.trim(), ficheiro });
  }

  return (
    <div className={style.fundo} onClick={aoFechar}>
      <form className={style.modal} onClick={(e) => e.stopPropagation()} onSubmit={enviar} role="dialog" aria-modal="true" aria-label="Criar story">
        <header className={style.topo}>
          <h2>Novo story</h2>
          <button type="button" className={style.fechar} onClick={aoFechar} aria-label="Fechar">
            <FaTimes />
          </button>
        </header>

        <div
          className={style.previa}
          onClick={() => inputRef.current?.click()}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
        >
          {imagem ? (
            <img src={imagem} alt="Pré-visualização do story" />
          ) : (
            <span className={style.vazio}>
              <FaCloudUploadAlt aria-hidden="true" />
              <strong>Escolher imagem</strong>
              <small>Formato vertical funciona melhor</small>
            </span>
          )}
          <input ref={inputRef} type="file" accept="image/*" hidden onChange={escolher} />
        </div>

        <label className={style.campo}>
          <span>Legenda (opcional)</span>
          <input
            type="text"
            value={legenda}
            maxLength={MAX_LEGENDA}
            onChange={(e) => setLegenda(e.target.value)}
            placeholder="Escreve algo sobre este momento..."
          />
          <small>{legenda.length}/{MAX_LEGENDA}</small>
        </label>

        {erro && <p className={style.erro}>{erro}</p>}

        <p className={style.nota}>O story fica visível durante 24 horas.</p>

        <button type="submit" className={style.btnPublicar} disabled={!imagem}>
          Publicar story
        </button>
      </form>
    </div>
  );
}

export default CriarStory;