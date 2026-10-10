
import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Cadastro.module.css";
import {
  FaUser,
  FaLock,
  FaEnvelope,
  FaPalette,
  FaBuilding,
  FaGem,
} from "react-icons/fa";
import imagem from "../img/Cadastro.png";

// Os 3 perfis possíveis na plataforma. Fácil de reutilizar no backend:
// o "valor" é o que deves enviar no campo tipoConta do teu formulário.
const TIPOS_CONTA = [
  {
    valor: "artista",
    label: "Artista",
    descricao: "Publica e vende a tua arte",
    Icone: FaPalette,
  },
  {
    valor: "galeria",
    label: "Galeria",
    descricao: "Descobre e representa talento",
    Icone: FaBuilding,
  },
  {
    valor: "colecionador",
    label: "Colecionador",
    descricao: "Explora e compra obras",
    Icone: FaGem,
  },
];

function Cadastrar() {
  const [tipoConta, setTipoConta] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [aceitouTermos, setAceitouTermos] = useState(false);

  const [erros, setErros] = useState({});

  function validar() {
    const novosErros = {};

    if (tipoConta === "") {
      novosErros.tipoConta = "Escolhe como vais aderir à plataforma.";
    }

    if (nome.trim() === "") {
      novosErros.nome = "O nome é obrigatório.";
    }

    if (email.trim() === "") {
      novosErros.email = "O email é obrigatório.";
    } else if (!email.includes("@")) {
      novosErros.email = "Introduz um email válido.";
    }

    if (senha === "") {
      novosErros.senha = "A palavra-passe é obrigatória.";
    } else if (senha.length < 6) {
      novosErros.senha = "A palavra-passe deve ter pelo menos 6 caracteres.";
    }

    if (!aceitouTermos) {
      novosErros.termos = "Tens de aceitar os termos de uso.";
    }

    setErros(novosErros);

    // Se o objeto "novosErros" não tiver nenhuma chave, significa que passou tudo
    return Object.keys(novosErros).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();

    const formularioValido = validar();

    if (formularioValido) {
      console.log("Formulário válido! Enviar dados...", {
        tipoConta,
        nome,
        email,
      });
      // aqui envias os dados para a tua API/backend
    }
  }

  return (
    <div className={styles.Container}>
      <div className={styles.Cadastro_image_side}>
        <img src={imagem} alt="Cadastro" />

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
            <h1 className={styles.overlayTitulo}>
              O teu talento merece ser visto
            </h1>
            <p className={styles.overlaySubtitulo}>
              Cria o teu perfil, publica as tuas obras e liga-te a
              colecionadores e galerias de todo o mundo.
            </p>

            <div className={styles.estatisticas}>
              <div className={styles.estatItem}>
                <span className={styles.estatNumero}>2.400+</span>
                <span className={styles.estatLabel}>Artistas ativos</span>
              </div>
              <div className={styles.estatDivisor}></div>
              <div className={styles.estatItem}>
                <span className={styles.estatNumero}>8.900+</span>
                <span className={styles.estatLabel}>Obras publicadas</span>
              </div>
              <div className={styles.estatDivisor}></div>
              <div className={styles.estatItem}>
                <span className={styles.estatNumero}>120+</span>
                <span className={styles.estatLabel}>Galerias parceiras</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.Cadastro_form_side}>
        <form
          className={styles.Cadastro_form}
          onSubmit={handleSubmit}
          noValidate
        >
          <h1 className={styles.titulo}>Criar conta</h1>
          <p className={styles.subtitulo}>
            Junta-te à comunidade e mostra a tua arte ao mundo
          </p>

          {/* Tipo de conta */}
          <div className={styles.campo}>
            <span className={styles.tipoContaLabel}>Quero aderir como</span>
            <div
              className={styles.tipoContaOpcoes}
              role="radiogroup"
              aria-label="Tipo de conta"
            >
              {TIPOS_CONTA.map(({ valor, label, descricao, Icone }) => (
                <label
                  key={valor}
                  className={
                    tipoConta === valor
                      ? `${styles.tipoContaCard} ${styles.selecionado}`
                      : styles.tipoContaCard
                  }
                >
                  <input
                    type="radio"
                    name="tipoConta"
                    value={valor}
                    checked={tipoConta === valor}
                    onChange={() => setTipoConta(valor)}
                    className={styles.radioOculto}
                  />
                  <Icone className={styles.tipoContaIcone} aria-hidden="true" />
                  <span className={styles.tipoContaNome}>{label}</span>
                  <span className={styles.tipoContaDescricao}>{descricao}</span>
                </label>
              ))}
            </div>
            {erros.tipoConta && (
              <p className={styles.mensagemErro}>{erros.tipoConta}</p>
            )}
          </div>

          {/* Campo Nome */}
          <div className={styles.campo}>
            <label>Nome completo</label>
            <div
              className={`${styles.inputWrapper} ${
                erros.nome ? styles.inputErro : ""
              }`}
            >
              <FaUser className={styles.icon} />
              <input
                type="text"
                placeholder="Digite o seu nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>
            {erros.nome && <p className={styles.mensagemErro}>{erros.nome}</p>}
          </div>

          {/* Campo Email */}
          <div className={styles.campo}>
            <label>E-mail</label>
            <div
              className={`${styles.inputWrapper} ${
                erros.email ? styles.inputErro : ""
              }`}
            >
              <FaEnvelope className={styles.icon} />
              <input
                type="email"
                placeholder="Digite o seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {erros.email && (
              <p className={styles.mensagemErro}>{erros.email}</p>
            )}
          </div>

          {/* Campo Senha */}
          <div className={styles.campo}>
            <label>Senha</label>
            <div
              className={`${styles.inputWrapper} ${
                erros.senha ? styles.inputErro : ""
              }`}
            >
              <FaLock className={styles.icon} />
              <input
                type="password"
                placeholder="Digite a sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
            </div>
            {erros.senha && (
              <p className={styles.mensagemErro}>{erros.senha}</p>
            )}
          </div>

          {/* Checkbox de termos */}
          <label className={styles.checkboxLabel}>
            <input
              type="checkbox"
              checked={aceitouTermos}
              onChange={(e) => setAceitouTermos(e.target.checked)}
            />
            <span>Eu concordo com os termos de uso e a política de privacidade</span>
          </label>
          {erros.termos && (
            <p className={styles.mensagemErro}>{erros.termos}</p>
          )}

          <button type="submit" className={styles.btnCadastrar}>
            Cadastrar
          </button>

          <p className={styles.jaTemConta}>
            Já tens conta? <Link to="/login">Inicia sessão</Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Cadastrar;