

import { useState, useEffect } from 'react';
import './Carrossel.css';
import foto1 from '../../img/Foto1.png';
import foto2 from '../../img/Foto2.png';
import foto3 from '../../img/Foto3.png';

const INTERVALO = 4000; // ms entre slides

const slidesData = [
  {
    img: foto1,
    badge: '✦ Novidade',
    titulo: 'A arte ganha vida quando voce se inspira',
    texto: 'Ganhe visibilidade no mundo da arte',
    link: '/Explorar',
    textoBotao: 'Explorar',
    externo: false,
  },
  {
    img: foto2,
    badge: '✦ Missao',
    titulo: 'Dá visibilade a tua arte',
    texto: 'Pública, expoe e vende a tua arte',
    link: '/Cadastro',
    textoBotao: 'Criar conta',
    externo: true,
  },
  {
    img: foto3,
    badge: '✦ Oportunidade',
    titulo: 'Descubra os próximos grandes artístas',
    texto: 'Uma plataforma dedicada a revelar talentos da arte',
    link: '/Artistas',
    textoBotao: 'Ver Artístas',
    externo: false,
  },
];

function Carousel() {
  const [index, setIndex] = useState(0);

  // Avança automaticamente a cada X segundos
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((atual) => (atual + 1) % slidesData.length);
    }, INTERVALO);

    return () => clearInterval(timer); // limpa o timer quando o componente "sai"
  }, [index]);

  function irParaSlide(n) {
    const novoIndex = (n + slidesData.length) % slidesData.length;
    setIndex(novoIndex);
  }

  function mudarSlide(dir) {
    irParaSlide(index + dir);
  }

  return (
    <div className="carousel">
      {slidesData.map((slide, i) => (
        <div key={i} className={`slide ${i === index ? 'active' : ''}`}>
          <img src={slide.img} alt={`PlataBox Slide ${i + 1}`} />
          <div className="slide-overlay">
            <div className="slide-content">
              <span className="slide-badge">{slide.badge}</span>
              <h2>{slide.titulo}</h2>
              <p>{slide.texto}</p>
              {slide.externo ? (
                <a href={slide.link} target="_blank" rel="noreferrer" className="slide-btn">
                  {slide.textoBotao}
                </a>
              ) : (
                <a href={slide.link} className="slide-btn">
                  {slide.textoBotao}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      <button className="carousel-btn prev" onClick={() => mudarSlide(-1)}>
        <i className="bi bi-chevron-left"></i>
      </button>
      <button className="carousel-btn next" onClick={() => mudarSlide(1)}>
        <i className="bi bi-chevron-right"></i>
      </button>

      <div className="carousel-dots">
        {slidesData.map((_, i) => (
          <span
            key={i}
            className={`dot ${i === index ? 'ativo' : ''}`}
            onClick={() => irParaSlide(i)}
          ></span>
        ))}
      </div>

      <div className="carousel-progress">
        <div
          key={index} // key diferente reinicia a animação a cada slide novo
          className="carousel-progress-bar"
          style={{ animationDuration: `${INTERVALO}ms` }}
        ></div>
      </div>
    </div>
  );
}

export default Carousel;