
import { FaArrowRight } from "react-icons/fa";
import style from './Titulos.module.css'

function BtnTitulo({Nome, icon}){
    return(
         <div style={{marginRight:'4%'}} >
            <button className={style.Btn} >
                Ver todas
                <FaArrowRight />
            </button>
            </div>
    )
}

export default BtnTitulo