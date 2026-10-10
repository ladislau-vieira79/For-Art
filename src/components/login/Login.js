import { useState } from 'react'
import { FaUser, FaLock } from "react-icons/fa";
import styles from './Login.module.css'
import imagem from '../img/Login.png';

function Login() {
  const [email, setemail] = useState("")
  const [password, setpassword] = useState("")
  const [mensagem, setMensagem] = useState(null);

  function CadastrarUsuario(e) {
    e.preventDefault();

    if (email === '' || password === '') {
      setMensagem({ texto: 'Preenche todos os campos!', tipo: 'erro' });
      return;
    }

    if (email === 'teste@teste.com' && password === '123456') {
      setMensagem({ texto: 'Login efetuado com sucesso! ✅', tipo: 'sucesso' });
    } else {
      setMensagem({ texto: 'Email ou palavra-passe incorretos ❌', tipo: 'erro' });
    }
  }

  return (
    <div className={styles.Container}>

      <div className={styles.Cadastro_image_side}>
        <img src={imagem} alt="Login" />

        <div className={styles.overlayConteudo}>
          <div className={styles.logoWrapper}>
            <span className={styles.logoIcone}>✦</span>
            <span className={styles.logoTexto}>For<em>Art</em></span>
          </div>

          <div className={styles.overlayBase}>
            <h1 className={styles.overlayTitulo}>
              Bem-vindo de volta
            </h1>
            <p className={styles.overlaySubtitulo}>
              Entra na tua conta e continua a partilhar a tua arte com o mundo.
            </p>
          </div>
        </div>
      </div>

      <div className={styles.Cadastro_form_side}>
        <div className={styles.Cadastro_form_wrapper}>
          <h1 className={styles.titulo}>Entrar</h1>
          <p className={styles.subtituloForm}>Introduz os teus dados para aceder à tua conta</p>

          <form className={styles.Cadastro_form} onSubmit={CadastrarUsuario}>

            {mensagem && (
              <p className={`${styles.mensagem} ${styles[mensagem.tipo]}`}>
                {mensagem.texto}
              </p>
            )}

            <div className={styles.campo}>
              <label>Nome ou email</label>
              <div className={styles.inputWrapper}>
                <FaUser className={styles.icon} />
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => setemail(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label>Password</label>
              <div className={styles.inputWrapper}>
                <FaLock className={styles.icon} />
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Senha"
                  onChange={(e) => setpassword(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.Lembrar}>
              <label className={styles.checkboxLabel}>
                <input type="checkbox" />
                Lembrar de mim
              </label>
              <a className={styles.linkAzul} href="#">Esqueceu a senha?</a>
            </div>

            <button type="submit" className={styles.btnCadastrar}>Entrar</button>

            <div className={styles.cadastrar_link}>
              <p>
                Não tem uma conta? <a className={styles.linkAzul} href="#">Cadastrar-se</a>
              </p>
            </div>
          </form>
        </div>
      </div>

    </div>
  )
}

export default Login