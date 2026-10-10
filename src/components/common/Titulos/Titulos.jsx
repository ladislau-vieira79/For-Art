
import { FaArrowRight } from "react-icons/fa";
import style from './Titulos.module.css'

function Titulos({Titulo, Subtitulo, MostrarBotao}){
    return(
        <div className={style.Container} >
            <div className={style.textoSeccao}>
               <h3 className={style.destaque}> {Titulo} </h3>
               <h1 className={style.titulo}> {Subtitulo} </h1>
            </div>
            
             {MostrarBotao && (
            <div style={{marginRight:'4%'}} >
            <button className={style.Btn} >
                Ver todas
                <FaArrowRight />
            </button>
            </div>
             )}
           
        </div>
      
    )
}

export default Titulos;