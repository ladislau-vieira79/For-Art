
import NavBar from '../../Layout/NavBar/NavBar'
import { Link } from 'react-router-dom'
import Footer from '../../Layout/Footer'
import { FaEye, FaImages, FaHandshake } from 'react-icons/fa'
import style from './Sobre.module.css'

function Sobre() {
  return (
    <div>
      <NavBar />

      <main>
        <section className={style.hero}>
          <div className={style.eyebrow}>A nossa missão</div>
          <h1>
            Dar palco a quem{" "}
            <span className={style.display}>ainda não foi visto.</span>
          </h1>
          <p>
            O For Art nasceu para dar aos artistas anónimos um espaço
            próprio: publicar, ser descoberto, receber propostas de galerias
            e vender diretamente a quem valoriza o seu trabalho — sem
            precisar de contactos ou de já ser conhecido.
          </p>
        </section>

        <section className={style.stats}>
          <div className={style.stats_grid}>
            <div>
              <div className={style.num}>3 200+</div>
              <div className={style.lbl}>Artistas</div>
            </div>
            <div>
              <div className={style.num}>18 400+</div>
              <div className={style.lbl}>Obras publicadas</div>
            </div>
            <div>
              <div className={style.num}>54</div>
              <div className={style.lbl}>Países</div>
            </div>
            <div>
              <div className={style.num}>1 100+</div>
              <div className={style.lbl}>Vendas realizadas</div>
            </div>
          </div>
        </section>

        <section className={style.section}>
          <div className={style.section_head}>
            <h2>
              O que <span className={style.display}>oferecemos</span>
            </h2>
          </div>
          <div className={style.offer_grid}>
            <div className={style.offer}>
              <div className={style.icon}>
                <FaEye aria-hidden="true" />
              </div>
              <h3>Visibilidade real</h3>
              <p>
                O teu perfil e as tuas obras chegam a colecionadores e
                curadores que, de outra forma, nunca te encontrariam.
              </p>
            </div>
            <div className={style.offer}>
              <div className={style.icon}>
                <FaImages aria-hidden="true" />
              </div>
              <h3>Vendas diretas</h3>
              <p>
                Publica com preço, recebe propostas e vende sem
                intermediários a tomarem a maior parte do valor da tua obra.
              </p>
            </div>
            <div className={style.offer}>
              <div className={style.icon}>
                <FaHandshake aria-hidden="true" />
              </div>
              <h3>Parcerias com galerias</h3>
              <p>
                Galerias e curadores pesquisam talento diretamente na
                plataforma e podem convidar-te para exposições.
              </p>
            </div>
          </div>
        </section>

        <section className={style.section}>
          <div className={style.section_head}>
            <h2>
              A <span className={style.display}>equipa</span>
            </h2>
          </div>
          <div className={style.team_grid}>
            <div className={style.member}>
              <div className={style.avatar}></div>
              <h4>Ladislau Vieira</h4>
              <span>Fundador(a)</span>
            </div>
            <div className={style.member}>
              <div className={style.avatar}></div>
              <h4>Ladislau Vieira</h4>
              <span>Design</span>
            </div>
          </div>
        </section>

        <section className={style.cta_band}>
          <h2>Faz parte desta história</h2>
          <p>
            A adesão é gratuita. Cria a tua conta e publica a tua primeira
            obra hoje.
          </p>
          <Link to="/Cadastro">
            <button className={style.btn_gradient}>
              Criar a minha conta
            </button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default Sobre