import styles from './Funcionamento.module.css'
import Titulos from '../common/Titulos/Titulos'

function Funcionamento() {
  return (
    <div className={styles.wrapper}>
      <Titulos
        Titulo="Como funciona"
        Subtitulo="Mostre ao mundo a tua arte"
      />

      <div className={styles.grid}>
        <div className={styles.card}>
          <div className={styles.circulo}>01</div>
          <h2 className={styles.tituloCard}>Crie o teu perfil</h2>
          <p className={styles.descricao}>
            Apresenta-te, mostra a tua técnica e o que te inspira. O teu espaço, à tua imagem.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.circulo}>02</div>
          <h2 className={styles.tituloCard}>Publica as tuas obras</h2>
          <p className={styles.descricao}>
            Carrega fotos das tuas obras, define preços ou marca como "Sob consulta" para propostas de galerias.
          </p>
        </div>

        <div className={styles.card}>
          <div className={styles.circulo}>03</div>
          <h2 className={styles.tituloCard}>Sê descoberto</h2>
          <p className={styles.descricao}>
            Colecionadores e galerias encontram-te, seguem-te e entram em contacto diretamente.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Funcionamento