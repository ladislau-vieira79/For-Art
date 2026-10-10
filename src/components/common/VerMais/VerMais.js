
import style from './VerMais.module.css'

function VerMais({nome}){
    return(
      <div className={style.Container} >
         <button className={style.Btn} >{nome}</button>
      </div>
    )
}

export default VerMais