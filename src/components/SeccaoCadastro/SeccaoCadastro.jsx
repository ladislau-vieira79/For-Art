
import {Link} from 'react-router-dom'
import style from './SeccaoCadastro.module.css'

function SeccaoCadastro() {
  return (
    <div className={style.wrapper}>
      <div className={style.container}>
        <h2 className={style.titulo}>Pronto para mostrar a tua arte ao mundo?</h2>
        <p className={style.subtitulo}>
          A adesão é gratuita. Publica as tuas obras rápido e fácil.
        </p>
        <Link to="/Cadastro" >
        <button className={style.btnCadastro}>Criar a minha conta</button>
        </Link>
        
      </div>
    </div>
  )
}

export default SeccaoCadastro