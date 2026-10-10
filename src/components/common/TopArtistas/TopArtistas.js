
import style from './TopArtistas.module.css'


function TopArtistas({nome_artista, foto, pontos_artista}){
    return(
        <div className={style.Container} >
            <h3>Top artistas da semana</h3>
           <div>
              <div className={style.imagem}>
                 
              </div>
              <h4 className={style.nome_artista} > {nome_artista} </h4>
              <p  className={style.pontos} > {pontos_artista} views </p>

           </div>

        </div>
    )
}

export default TopArtistas