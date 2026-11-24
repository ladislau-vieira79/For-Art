import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FaUser,
  FaLock,
  FaEye,
  FaEyeSlash,
  FaExclamationCircle,
  FaCheckCircle,
} from "react-icons/fa";
import styles from "./Login.module.css";
import imagem from "../img/Login.png";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [lembrar, setLembrar] = useState(false);
  const [verSenha, setVerSenha] = useState(false);
  const [aEnviar, setAEnviar] = useState(false);
  const [mensagem, setMensagem] = useState(null); // { texto, tipo: "erro" | "sucesso" }
  const [camposComErro, setCamposComErro] = useState({});

  async function entrar(e) {
    e.preventDefault();

    const erros = {};
    if (email.trim() === "") erros.email = true;
    if (password === "") erros.password = true;
    setCamposComErro(erros);

    if (erros.email || erros.password) {
      setMensagem({ texto: "Preenche todos os campos!", tipo: "erro" });
      document.getElementById(erros.email ? "email" : "password")?.focus();
      return;
    }

    setMensagem(null);
    setAEnviar(true);
    // TODO (API): troca este atraso e a verificação de teste por um fetch POST ao teu backend
    await new Promise((r) => setTimeout(r, 900));
    setAEnviar(false);

    if (email === "teste@teste.com" && password === "123456") {
      setMensagem({ texto: "Login efetuado com sucesso!", tipo: "sucesso" });
      // TODO: guardar o token (se "lembrar" estiver ativo, em localStorage) e navegar para o feed
    } else {
      setMensagem({ texto: "Email ou palavra-passe incorretos.", tipo: "erro" });
    }
  }

  const classeInput = (campo) =>
    camposComErro[campo] ? `${styles.inputWrapper} ${styles.inputErro}` : styles.inputWrapper;

  return (
    <div className={styles.Container}>
      {/* ===== Lado da imagem ===== */}
      <div className={styles.Cadastro_image_side}>
        <img src={imagem} alt="" />

        <div className={styles.overlayConteudo}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoIcone}>✦</span>
            <span className={styles.logoTexto}>
              For<em>Art</em>
            </span>
          </div>

          <div className={styles.overlayBase}>
            <span className={styles.selo}>Onde a arte encontra o seu público</span>
            <h2 className={styles.overlayTitulo}>Bem-vindo de volta</h2>
            <p className={styles.overlaySubtitulo}>
              Entra na tua conta e continua a partilhar a tua arte com o mundo.
            </p>
          </div>
        </div>
      </div>

      {/* ===== Lado do formulário ===== */}
      <div className={styles.Cadastro_form_side}>
        <div className={styles.Cadastro_form_wrapper}>
          <div className={styles.logoMobile}>
            <span className={styles.logoIcone}>✦</span>
            <span className={styles.logoTextoEscuro}>
              For<em>Art</em>
            </span>
          </div>

          <h1 className={styles.titulo}>Entrar</h1>
          <p className={styles.subtituloForm}>Introduz os teus dados para aceder à tua conta</p>

          <form className={styles.Cadastro_form} onSubmit={entrar} noValidate>
            {mensagem && (
              <p className={`${styles.mensagem} ${styles[mensagem.tipo]}`} role="alert">
                {mensagem.tipo === "erro" ? (
                  <FaExclamationCircle aria-hidden="true" />
                ) : (
                  <FaCheckCircle aria-hidden="true" />
                )}
                {mensagem.texto}
              </p>
            )}

            <div className={styles.campo}>
              <label htmlFor="email">Nome ou email</label>
              <div className={classeInput("email")}>
                <FaUser className={styles.icon} aria-hidden="true" />
                <input
                  type="text"
                  id="email"
                  name="email"
                  autoComplete="username"
                  placeholder="Email ou nome de utilizador"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setCamposComErro((c) => ({ ...c, email: false }));
                  }}
                  aria-invalid={!!camposComErro.email}
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label htmlFor="password">Password</label>
              <div className={classeInput("password")}>
                <FaLock className={styles.icon} aria-hidden="true" />
                <input
                  type={verSenha ? "text" : "password"}
                  id="password"
                  name="password"
                  autoComplete="current-password"
                  placeholder="Senha"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setCamposComErro((c) => ({ ...c, password: false }));
                  }}
                  aria-invalid={!!camposComErro.password}
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
            </div>

            <div className={styles.Lembrar}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" checked={lembrar} onChange={(e) => setLembrar(e.target.checked)} />
                Lembrar de mim
              </label>
              {/* Cria a rota /recuperar-senha quando tiveres essa página */}
              <Link className={styles.linkAzul} to="/recuperar-senha">
                Esqueceu a senha?
              </Link>
            </div>

            <button type="submit" className={styles.btnCadastrar} disabled={aEnviar}>
              {aEnviar ? (
                <>
                  <span className={styles.spinner} aria-hidden="true" /> A entrar...
                </>
              ) : (
                "Entrar"
              )}
            </button>

            <div className={styles.cadastrar_link}>
              <p>
                Não tem uma conta?{" "}
                <Link className={styles.linkAzul} to="/cadastro">
                  Cadastrar-se
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;