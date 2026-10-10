
import { useState } from "react";
import { FaChevronDown } from "react-icons/fa";
import style from "./Faq.module.css";

// Conteúdo de exemplo — ajusta os valores (comissão, prazos, etc.)
// aos que decidires para o negócio real.
const PERGUNTAS = [
  {
    pergunta: "O For Art é gratuito?",
    resposta:
      "Sim. Criar conta, publicar obras e construir o teu perfil é sempre gratuito. Cobramos apenas uma pequena comissão sobre vendas concluídas na plataforma — se não vendes, não pagas nada.",
  },
  {
    pergunta: "Como funciona a comissão sobre vendas?",
    resposta:
      "Quando vendes uma obra através do For Art, uma percentagem do valor fica para a plataforma e o resto é transferido para ti. A percentagem exata está sempre visível antes de confirmares a venda, sem custos escondidos.",
  },
  {
    pergunta: "Preciso de ser um artista profissional para me inscrever?",
    resposta:
      "Não. O For Art foi pensado sobretudo para artistas anónimos ou em início de carreira. Não pedimos currículo nem exposições anteriores — só a tua arte.",
  },
  {
    pergunta: "Como e quando recebo o pagamento das minhas vendas?",
    resposta:
      "Após a venda ser confirmada pelo comprador, o valor fica disponível na tua conta For Art. Podes levantar para a tua conta bancária ou carteira digital associada, normalmente dentro de alguns dias úteis.",
  },
  {
    pergunta: "Posso vender para compradores fora do meu país?",
    resposta:
      "Sim. O For Art permite vendas internacionais — o preço é convertido automaticamente para a moeda do comprador. Combinações de envio de obras físicas ficam a cargo do artista e do comprador.",
  },
  {
    pergunta: "Como funcionam as propostas de galerias?",
    resposta:
      "Galerias e curadores verificados podem pesquisar artistas na plataforma e enviar propostas de exposição ou patrocínio diretamente para o teu perfil. Tu decides se aceitas, recusas, ou continuas a conversa por mensagem.",
  },
  {
    pergunta: "Preciso de verificar a minha conta?",
    resposta:
      "Para publicar obras não. Para vender, pedimos uma verificação simples de identidade — protege-te a ti e aos compradores, e evita perfis falsos na plataforma.",
  },
  {
    pergunta: "Quantas obras posso publicar?",
    resposta:
      "Não há limite. Podes publicar quantas obras quiseres, organizá-las em coleções, e marcar cada uma como à venda, sob consulta, ou apenas para portefólio.",
  },
];

function Faq() {
  const [aberta, setAberta] = useState(0); // primeira pergunta já aberta por defeito

  function alternar(index) {
    setAberta((atual) => (atual === index ? -1 : index));
  }

  return (
    <section className={style.secao}>
      <div className={style.cabecalho}>
        <span className={style.etiqueta}>Dúvidas frequentes</span>
        <h2>Perguntas e respostas</h2>
      </div>

      <div className={style.lista}>
        {PERGUNTAS.map((item, index) => {
          const estaAberta = aberta === index;
          return (
            <div
              key={item.pergunta}
              className={estaAberta ? `${style.item} ${style.itemAberto}` : style.item}
            >
              <button
                className={style.pergunta}
                onClick={() => alternar(index)}
                aria-expanded={estaAberta}
              >
                <span>{item.pergunta}</span>
                <FaChevronDown className={style.seta} aria-hidden="true" />
              </button>

              <div className={style.respostaWrapper}>
                <p className={style.resposta}>{item.resposta}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Faq;