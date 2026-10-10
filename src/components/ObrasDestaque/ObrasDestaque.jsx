
import styles from './ObrasDestaque.module.css'
import Foto1 from '../img/carcere mental.jpg'
// nota: mantive o teu caminho/nome de ficheiro original. Se este componente
// estiver numa subpasta diferente de onde estava antes, ajusta os "../"
// conforme a localização real da pasta img/ no teu projeto.

const Obras = [
  { id: 1, Autor: 'Osvaldo Vieira', TituloObra: 'Cárcere Mental', imagem: Foto1 },
  { id: 2, Autor: 'Osvaldo Vieira', TituloObra: 'Cárcere Mental', imagem: Foto1 },
  { id: 3, Autor: 'Osvaldo Vieira', TituloObra: 'Cárcere Mental', imagem: Foto1 },
  { id: 4, Autor: 'Osvaldo Vieira', TituloObra: 'Cárcere Mental', imagem: Foto1 },
  { id: 5, Autor: 'Osvaldo Vieira', TituloObra: 'Cárcere Mental', imagem: Foto1 },
  { id: 6, Autor: 'Osvaldo Vieira', TituloObra: 'Cárcere Mental', imagem: Foto1 },
]

// Duplicado de propósito: é o que permite o loop do carrossel
// (ver a animação "rolar" no CSS — desliza exatamente 50%, que é o
// comprimento de UMA cópia da lista, e depois recomeça sem se notar o corte)
const ObrasDuplicadas = [...Obras, ...Obras]

function ObrasDestaque() {
  return (
    <section className={styles.secao}>
      <div className={styles.cabecalho}>
        <span className={styles.etiqueta}>Selecionadas esta semana</span>
        <h2>Obras em destaque</h2>
      </div>

      <div className={styles.pista}>
        <div className={styles.trilho}>
          {ObrasDuplicadas.map((obra, index) => (
            <div className={styles.cartao} key={`${obra.id}-${index}`}>
              <div className={styles.fotoWrapper}>
                <img
                  src={obra.imagem}
                  alt={obra.TituloObra}
                  className={styles.foto}
                  loading="lazy"
                />
              </div>
              <div className={styles.info}>
                <h3>{obra.TituloObra}</h3>
                <p className={styles.cargo}>{obra.Autor}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ObrasDestaque