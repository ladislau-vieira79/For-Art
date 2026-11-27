import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { FaCloudUploadAlt, FaTimes, FaCheckCircle, FaTag } from "react-icons/fa";
import NavBar from "../../components/Layout/NavBar/NavBar";
import Footer from "../../components/Layout/Footer";
import {
  TECNICAS,
  EDICOES,
  GALERIAS_DO_ARTISTA,
  LIMITE_IMAGENS,
  TAMANHO_MAX_MB,
  publicarObra,
} from "./MockPublicarObra";
import style from "./PublicarObra.module.css";
import { formatarNumero } from "../../utils/formatar";

// Rota: <Route path="/publicar" element={<PublicarObra />} />
// Só artistas devem ver esta página (protege a rota quando tiveres login).

const VAZIO = {
  titulo: "",
  sinopse: "",
  tecnica: "",
  material: "",
  largura: "",
  altura: "",
  ano: String(new Date().getFullYear()),
  edicao: "Peça única",
  preco: "",
  galeriaId: "",
  disponivel: true,
};

function formatarPreco(valor) {
  const n = Number(valor);
  return n > 0 ? `Kz ${formatarNumero(n)}` : "Kz —";
}

function PublicarObra() {
  const [form, setForm] = useState(VAZIO);
  const [imagens, setImagens] = useState([]); // [{ id, file, url }]
  const [erros, setErros] = useState({});
  const [aEnviar, setAEnviar] = useState(false);
  const [publicada, setPublicada] = useState(null);
  const [arrastar, setArrastar] = useState(false);
  const inputRef = useRef(null);

  // liberta as URLs de pré-visualização ao sair da página
  useEffect(() => {
    return () => imagens.forEach((i) => URL.revokeObjectURL(i.url));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function alterar(campo, valor) {
    setForm((f) => ({ ...f, [campo]: valor }));
    if (erros[campo]) setErros((e) => ({ ...e, [campo]: undefined }));
  }

  function adicionarFicheiros(lista) {
    const novos = [];
    let aviso;
    for (const file of Array.from(lista)) {
      if (!file.type.startsWith("image/")) {
        aviso = "Só são aceites imagens (JPG, PNG, WEBP).";
        continue;
      }
      if (file.size > TAMANHO_MAX_MB * 1024 * 1024) {
        aviso = `Cada imagem pode ter no máximo ${TAMANHO_MAX_MB} MB.`;
        continue;
      }
      novos.push({ id: `${file.name}-${file.size}-${Math.random()}`, file, url: URL.createObjectURL(file) });
    }
    const livres = LIMITE_IMAGENS - imagens.length;
    if (novos.length > livres) {
      aviso = `Podes enviar no máximo ${LIMITE_IMAGENS} imagens.`;
      novos.slice(livres).forEach((i) => URL.revokeObjectURL(i.url));
    }
    setImagens((atuais) => [...atuais, ...novos.slice(0, livres)]);
    setErros((e) => ({ ...e, imagens: aviso }));
  }

  function removerImagem(id) {
    setImagens((atuais) => {
      const alvo = atuais.find((i) => i.id === id);
      if (alvo) URL.revokeObjectURL(alvo.url);
      return atuais.filter((i) => i.id !== id);
    });
  }

  function validar() {
    const e = {};
    if (imagens.length === 0) e.imagens = "Adiciona pelo menos uma imagem da obra.";
    if (!form.titulo.trim()) e.titulo = "Indica o título da obra.";
    if (!form.tecnica) e.tecnica = "Escolhe a técnica.";
    if (form.sinopse.trim().length < 20) e.sinopse = "Escreve uma sinopse com pelo menos 20 caracteres.";
    if (!(Number(form.preco) > 0)) e.preco = "Indica um preço maior que zero.";
    const ano = Number(form.ano);
    if (!ano || ano < 1900 || ano > new Date().getFullYear()) e.ano = "Ano inválido.";
    return e;
  }

  async function enviar(ev) {
    ev.preventDefault();
    const e = validar();
    setErros(e);
    if (Object.keys(e).length > 0) {
      // leva o user ao primeiro erro
      document.querySelector("[data-erro='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setAEnviar(true);
    const resposta = await publicarObra({ ...form, preco: Number(form.preco), imagens: imagens.map((i) => i.file) });
    setAEnviar(false);
    setPublicada(resposta);
  }

  function publicarOutra() {
    imagens.forEach((i) => URL.revokeObjectURL(i.url));
    setImagens([]);
    setForm(VAZIO);
    setErros({});
    setPublicada(null);
    window.scrollTo(0, 0);
  }

  if (publicada) {
    return (
      <>
        <NavBar />
        <main className={style.pagina}>
          <div className={style.sucesso}>
            <FaCheckCircle className={style.sucessoIcone} aria-hidden="true" />
            <h1>Obra publicada!</h1>
            <p>“{form.titulo}” já está visível para colecionadores e galerias.</p>
            <div className={style.sucessoAcoes}>
              <Link to={`/obra/${publicada.id}`} className={style.btnPrimario}>
                Ver a obra
              </Link>
              <button className={style.btnSecundario} onClick={publicarOutra}>
                Publicar outra obra
              </button>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const campoErro = (campo) => (erros[campo] ? { "data-erro": "true" } : {});

  return (
    <>
      <NavBar />

      <main className={style.pagina}>
        <header className={style.topo}>
          <h1>Publicar obra</h1>
          <p>Partilha o teu trabalho com colecionadores e galerias.</p>
        </header>

        <div className={style.layout}>
          <form className={style.form} onSubmit={enviar} noValidate>
            {/* ===== Imagens ===== */}
            <section className={style.bloco} {...campoErro("imagens")}>
              <h2>Imagens</h2>
              <div
                className={arrastar ? `${style.zona} ${style.zonaAtiva}` : style.zona}
                onClick={() => inputRef.current?.click()}
                onDragOver={(e) => { e.preventDefault(); setArrastar(true); }}
                onDragLeave={() => setArrastar(false)}
                onDrop={(e) => { e.preventDefault(); setArrastar(false); adicionarFicheiros(e.dataTransfer.files); }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && inputRef.current?.click()}
              >
                <FaCloudUploadAlt aria-hidden="true" />
                <strong>Arrasta as imagens ou clica para escolher</strong>
                <span>Até {LIMITE_IMAGENS} imagens · JPG, PNG ou WEBP · máx. {TAMANHO_MAX_MB} MB cada</span>
                <input
                  ref={inputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  hidden
                  onChange={(e) => { adicionarFicheiros(e.target.files); e.target.value = ""; }}
                />
              </div>
              {erros.imagens && <span className={style.erro}>{erros.imagens}</span>}

              {imagens.length > 0 && (
                <ul className={style.previas}>
                  {imagens.map((img, i) => (
                    <li key={img.id}>
                      <img src={img.url} alt={`Imagem ${i + 1}`} />
                      {i === 0 && <span className={style.capaTag}>Capa</span>}
                      <button type="button" onClick={() => removerImagem(img.id)} aria-label="Remover imagem">
                        <FaTimes />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            {/* ===== Informação ===== */}
            <section className={style.bloco}>
              <h2>Informação da obra</h2>

              <label className={style.campo} {...campoErro("titulo")}>
                <span>Título *</span>
                <input
                  type="text"
                  value={form.titulo}
                  maxLength={80}
                  onChange={(e) => alterar("titulo", e.target.value)}
                  placeholder="Ex: Memórias de Luanda"
                />
                {erros.titulo && <em className={style.erro}>{erros.titulo}</em>}
              </label>

              <div className={style.duas}>
                <label className={style.campo} {...campoErro("tecnica")}>
                  <span>Técnica *</span>
                  <select value={form.tecnica} onChange={(e) => alterar("tecnica", e.target.value)}>
                    <option value="">Escolher...</option>
                    {TECNICAS.map((t) => <option key={t}>{t}</option>)}
                  </select>
                  {erros.tecnica && <em className={style.erro}>{erros.tecnica}</em>}
                </label>

                <label className={style.campo}>
                  <span>Material</span>
                  <input
                    type="text"
                    value={form.material}
                    onChange={(e) => alterar("material", e.target.value)}
                    placeholder="Ex: Óleo sobre tela"
                  />
                </label>
              </div>

              <label className={style.campo} {...campoErro("sinopse")}>
                <span>Sinopse *</span>
                <textarea
                  rows={4}
                  value={form.sinopse}
                  maxLength={600}
                  onChange={(e) => alterar("sinopse", e.target.value)}
                  placeholder="Conta a história e a ideia por trás da obra..."
                />
                <small className={style.contador}>{form.sinopse.length}/600</small>
                {erros.sinopse && <em className={style.erro}>{erros.sinopse}</em>}
              </label>

              <div className={style.tres}>
                <label className={style.campo}>
                  <span>Largura (cm)</span>
                  <input type="number" min="0" value={form.largura} onChange={(e) => alterar("largura", e.target.value)} />
                </label>
                <label className={style.campo}>
                  <span>Altura (cm)</span>
                  <input type="number" min="0" value={form.altura} onChange={(e) => alterar("altura", e.target.value)} />
                </label>
                <label className={style.campo} {...campoErro("ano")}>
                  <span>Ano</span>
                  <input type="number" value={form.ano} onChange={(e) => alterar("ano", e.target.value)} />
                  {erros.ano && <em className={style.erro}>{erros.ano}</em>}
                </label>
              </div>

              <label className={style.campo}>
                <span>Edição</span>
                <select value={form.edicao} onChange={(e) => alterar("edicao", e.target.value)}>
                  {EDICOES.map((t) => <option key={t}>{t}</option>)}
                </select>
              </label>
            </section>

            {/* ===== Venda ===== */}
            <section className={style.bloco}>
              <h2>Venda</h2>

              <label className={style.campo} {...campoErro("preco")}>
                <span>Preço (Kz) *</span>
                <div className={style.prefixo}>
                  <b>Kz</b>
                  <input
                    type="number"
                    min="0"
                    value={form.preco}
                    onChange={(e) => alterar("preco", e.target.value)}
                    placeholder="150000"
                  />
                </div>
                {erros.preco && <em className={style.erro}>{erros.preco}</em>}
              </label>

              {GALERIAS_DO_ARTISTA.length > 0 && (
                <label className={style.campo}>
                  <span>Associar a uma galeria (opcional)</span>
                  <select value={form.galeriaId} onChange={(e) => alterar("galeriaId", e.target.value)}>
                    <option value="">Venda direta (sem galeria)</option>
                    {GALERIAS_DO_ARTISTA.map((g) => <option key={g.id} value={g.id}>{g.nome}</option>)}
                  </select>
                  <small>Para obras de artistas que já têm contrato com uma galeria.</small>
                </label>
              )}

              <label className={style.interruptor}>
                <input
                  type="checkbox"
                  checked={form.disponivel}
                  onChange={(e) => alterar("disponivel", e.target.checked)}
                />
                <span>Obra disponível para venda</span>
              </label>
            </section>

            <button type="submit" className={style.btnPublicar} disabled={aEnviar}>
              {aEnviar ? "A publicar..." : "Publicar obra"}
            </button>
          </form>

          {/* ===== Pré-visualização ===== */}
          <aside className={style.previa}>
            <h2>Pré-visualização</h2>
            <div className={style.cardPrevia}>
              <div className={style.cardImg}>
                {imagens[0] ? <img src={imagens[0].url} alt="" /> : <span>Sem imagem</span>}
              </div>
              <div className={style.cardInfo}>
                <strong>{form.titulo || "Título da obra"}</strong>
                <span>{form.tecnica || "Técnica"}</span>
                <span className={style.cardPreco}><FaTag aria-hidden="true" /> {formatarPreco(form.preco)}</span>
              </div>
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </>
  );
}

export default PublicarObra;