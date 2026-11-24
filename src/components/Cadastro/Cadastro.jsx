
import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPalette,
  FaBuilding,
  FaGem,
  FaEye,
  FaEyeSlash,
  FaCheck,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./Cadastro.module.css";
import imagem from "../img/Cadastro.png";

// Os 3 perfis possíveis na plataforma. O "valor" é o que deves enviar
// no campo tipoConta para o backend.
const TIPOS_CONTA = [
  { valor: "artista", label: "Artista", descricao: "Publica e vende a tua arte", Icone: FaPalette },
  { valor: "galeria", label: "Galeria", descricao: "Descobre e representa talento", Icone: FaBuilding },
  { valor: "colecionador", label: "Colecionador", descricao: "Explora e compra obras", Icone: FaGem },
];

const NIVEIS_FORCA = ["", "Fraca", "Razoável", "Boa", "Forte"];

// 0 a 4 pontos: tamanho, maiúsculas+minúsculas, número, símbolo
function calcularForca(senha) {
  if (!senha) return 0;
  let pontos = 0;
  if (senha.length >= 8) pontos++;
  if (/[a-z]/.test(senha) && /[A-Z]/.test(senha)) pontos++;
  if (/\d/.test(senha)) pontos++;
  if (/[^A-Za-z0-9]/.test(senha)) pontos++;
  return Math.max(pontos, 1);
}

// Regras de validação por campo (reutilizadas no blur e no submit)
function validarCampo(campo, valor) {
  switch (campo) {
    case "tipoConta":
      return valor === "" ? "Escolhe como vais aderir à plataforma." : "";
    case "nome":
      return valor.trim() === "" ? "O nome é obrigatório." : "";
    case "email":
      if (valor.trim() === "") return "O email é obrigatório.";
      return /^\S+@\S+\.\S+$/.test(valor) ? "" : "Introduz um email válido.";
    case "senha":
      if (valor === "") return "A palavra-passe é obrigatória.";
      return valor.length < 6 ? "A palavra-passe deve ter pelo menos 6 caracteres." : "";
    case "termos":
      return valor ? "" : "Tens de aceitar os termos de uso.";
    default:
      return "";
  }
}

function Cadastrar() {
  const [valores, setValores] = useState({
    tipoConta: "",
    nome: "",
    email: "",
    senha: "",
    termos: false,
  });
  const [erros, setErros] = useState({});
  const [verSenha, setVerSenha] = useState(false);
  const [aEnviar, setAEnviar] = useState(false);
  const [concluido, setConcluido] = useState(false);

  const forca = calcularForca(valores.senha);

  function alterar(campo, valor) {
    setValores((v) => ({ ...v, [campo]: valor }));
    // se o campo já tinha erro, revalida enquanto o user corrige
    if (erros[campo]) {
      setErros((e) => ({ ...e, [campo]: validarCampo(campo, valor) }));
    }
  }

  function aoSair(campo) {
    setErros((e) => ({ ...e, [campo]: validarCampo(campo, valores[campo]) }));
  }

  function validarTudo() {
    const novos = {};
    Object.keys(valores).forEach((c) => {
      const msg = validarCampo(c, valores[c]);
      if (msg) novos[c] = msg;
    });
    setErros(novos);
    return novos;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const novos = validarTudo();

    if (Object.keys(novos).length > 0) {
      // leva o foco ao primeiro campo com erro
      document.querySelector("[aria-invalid='true']")?.focus();
      return;
    }

    setAEnviar(true);
    console.log("Formulário válido! Enviar dados...", {
      tipoConta: valores.tipoConta,
      nome: valores.nome,
      email: valores.email,
    });
    // TODO (API): troca este atraso simulado por um fetch POST ao teu backend
    await new Promise((r) => setTimeout(r, 1000));
    setAEnviar(false);
    setConcluido(true);
  }

  const classeInput = (campo) =>
    erros[campo] ? `${styles.inputWrapper} ${styles.inputErro}` : styles.inputWrapper;

  return (
    <div className={styles.Container}>
      {/* ===== Lado da imagem ===== */}
      <div className={styles.Cadastro_image_side}>
        <img src={imagem} alt="" />

        <div className={styles.overlayConteudo}>
          <div className={styles.overlayTopo}>
            <div className={styles.logoWrapper}>
              <span className={styles.logoIcone}>✦</span>
              <span className={styles.logoTexto}>
                For<em>Art</em>
              </span>
            </div>
          </div>

          <div className={styles.overlayBase}>
            <span className={styles.selo}>Plataforma para artistas emergentes</span>
            <h2 className={styles.overlayTitulo}>O teu talento merece ser visto</h2>
            <p className={styles.overlaySubtitulo}>
              Cria o teu perfil, publica as tuas obras e liga-te a colecionadores e galerias de todo o mundo.
            </p>

            <div className={styles.estatisticas}>
              <div className={styles.estatItem}>
                <span className={styles.estatNumero}>2.400+</span>
                <span className={styles.estatLabel}>Artistas ativos</span>
              </div>
              <div className={styles.estatDivisor} />
              <div className={styles.estatItem}>
                <span className={styles.estatNumero}>8.900+</span>
                <span className={styles.estatLabel}>Obras publicadas</span>
              </div>
              <div className={styles.estatDivisor} />
              <div className={styles.estatItem}>
                <span className={styles.estatNumero}>120+</span>
                <span className={styles.estatLabel}>Galerias parceiras</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Lado do formulário ===== */}
      <div className={styles.Cadastro_form_side}>
        {concluido ? (
          <div className={styles.sucesso}>
            <FaCheckCircle className={styles.sucessoIcone} aria-hidden="true" />
            <h1 className={styles.titulo}>Conta criada!</h1>
            <p className={styles.subtitulo}>
              Bem-vindo(a) à For Art, {valores.nome.split(" ")[0]}. Já podes iniciar sessão e começar.
            </p>
            <Link to="/login" className={styles.btnCadastrar}>
              Ir para o login
            </Link>
          </div>
        ) : (
          <form className={styles.Cadastro_form} onSubmit={handleSubmit} noValidate>
            {/* Logo visível só no mobile (a imagem fica escondida) */}
            <div className={styles.logoMobile}>
              <span className={styles.logoIcone}>✦</span>
              <span className={styles.logoTextoEscuro}>
                For<em>Art</em>
              </span>
            </div>

            <h1 className={styles.titulo}>Criar conta</h1>
            <p className={styles.subtitulo}>Junta-te à comunidade e mostra a tua arte ao mundo</p>

            {/* Tipo de conta */}
            <fieldset className={styles.campo}>
              <legend className={styles.tipoContaLabel}>Quero aderir como</legend>
              <div className={styles.tipoContaOpcoes} role="radiogroup" aria-label="Tipo de conta">
                {TIPOS_CONTA.map(({ valor, label, descricao, Icone }) => {
                  const ativo = valores.tipoConta === valor;
                  return (
                    <label
                      key={valor}
                      className={ativo ? `${styles.tipoContaCard} ${styles.selecionado}` : styles.tipoContaCard}
                    >
                      <input
                        type="radio"
                        name="tipoConta"
                        value={valor}
                        checked={ativo}
                        onChange={() => alterar("tipoConta", valor)}
                        className={styles.radioOculto}
                      />
                      <span className={styles.check} aria-hidden="true">
                        <FaCheck />
                      </span>
                      <Icone className={styles.tipoContaIcone} aria-hidden="true" />
                      <span className={styles.tipoContaNome}>{label}</span>
                      <span className={styles.tipoContaDescricao}>{descricao}</span>
                    </label>
                  );
                })}
              </div>
              {erros.tipoConta && (
                <p className={styles.mensagemErro} role="alert">{erros.tipoConta}</p>
              )}
            </fieldset>

            {/* Nome */}
            <div className={styles.campo}>
              <label htmlFor="nome">Nome completo</label>
              <div className={classeInput("nome")}>
                <FaUser className={styles.icon} aria-hidden="true" />
                <input
                  id="nome"
                  type="text"
                  autoComplete="name"
                  placeholder="Digite o seu nome"
                  value={valores.nome}
                  onChange={(e) => alterar("nome", e.target.value)}
                  onBlur={() => aoSair("nome")}
                  aria-invalid={!!erros.nome}
                />
              </div>
              {erros.nome && <p className={styles.mensagemErro} role="alert">{erros.nome}</p>}
            </div>

            {/* Email */}
            <div className={styles.campo}>
              <label htmlFor="email">E-mail</label>
              <div className={classeInput("email")}>
                <FaEnvelope className={styles.icon} aria-hidden="true" />
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="Digite o seu email"
                  value={valores.email}
                  onChange={(e) => alterar("email", e.target.value)}
                  onBlur={() => aoSair("email")}
                  aria-invalid={!!erros.email}
                />
              </div>
              {erros.email && <p className={styles.mensagemErro} role="alert">{erros.email}</p>}
            </div>

            {/* Senha */}
            <div className={styles.campo}>
              <label htmlFor="senha">Senha</label>
              <div className={classeInput("senha")}>
                <FaLock className={styles.icon} aria-hidden="true" />
                <input
                  id="senha"
                  type={verSenha ? "text" : "password"}
                  autoComplete="new-password"
                  placeholder="Digite a sua senha"
                  value={valores.senha}
                  onChange={(e) => alterar("senha", e.target.value)}
                  onBlur={() => aoSair("senha")}
                  aria-invalid={!!erros.senha}
                />
                <button
                  type="button"
                  className={styles.btnOlho}
                  onClick={() => setVerSenha((v) => !v)}
                  aria-label={verSenha ? "Esconder senha" : "Mostrar senha"}
                >
                  {verSenha ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>

              {valores.senha && (
                <div className={styles.forca} data-nivel={forca}>
                  <div className={styles.forcaBarras} aria-hidden="true">
                    {[1, 2, 3, 4].map((n) => (
                      <span key={n} className={n <= forca ? styles.barraAtiva : ""} />
                    ))}
                  </div>
                  <span className={styles.forcaTexto}>Força: {NIVEIS_FORCA[forca]}</span>
                </div>
              )}

              {erros.senha && <p className={styles.mensagemErro} role="alert">{erros.senha}</p>}
            </div>

            {/* Termos */}
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={valores.termos}
                onChange={(e) => alterar("termos", e.target.checked)}
                aria-invalid={!!erros.termos}
              />
              <span>Eu concordo com os termos de uso e a política de privacidade</span>
            </label>
            {erros.termos && <p className={styles.mensagemErro} role="alert">{erros.termos}</p>}

            <button type="submit" className={styles.btnCadastrar} disabled={aEnviar}>
              {aEnviar ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" /> A criar conta...
                </>
              ) : (
                "Cadastrar"
              )}
            </button>

            <p className={styles.jaTemConta}>
              Já tens conta? <Link to="/login">Inicia sessão</Link>
            </p>
          </form>
        )}
      </div>
    </div>
  );
}

export default Cadastrar;