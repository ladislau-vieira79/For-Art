import ArtistaDaSemana from "./artistaDaSemana";
import NovosTalentos from "./novosTalentos";
import ColecoesTematicas from "./colecoesTematicas";
import style from "./Descobrir.module.css";

// Bloco completo de visibilidade para novos talentos.
// Uso (Home ou página Artistas):
//   import Descobrir from "../../components/Descobrir/Descobrir";
//   <Descobrir />
function Descobrir() {
  return (
    <div className={style.wrap}>
      <ArtistaDaSemana />
      <NovosTalentos />
      <ColecoesTematicas />
    </div>
  );
}

export default Descobrir;