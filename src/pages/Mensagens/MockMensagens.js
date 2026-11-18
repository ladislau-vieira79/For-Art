// Dados de exemplo — troca por um fetch à tua API
// (ex: GET /api/conversas  e  GET /api/conversas/:id/mensagens)
//
// de: "eu"    -> mensagem enviada por ti (balão à direita)
// de: "outro" -> mensagem recebida (balão à esquerda)
// tipo: "pedido" -> cartão de pedido de compra (o botão "Solicitar" do Feed)

export const mockConversas = [
  {
    id: 1,
    nome: "Osvaldo Vieira",
    perfil: "artista",
    verificado: true,
    foto: null,
    perfilTo: "/artista/1",
    naoLidas: 2,
    mensagens: [
      { id: 1, de: "outro", dia: "Ontem", hora: "16:40", texto: "Olá! Vi que gostaste da obra \"Memórias de Luanda\"." },
      { id: 2, de: "eu", dia: "Ontem", hora: "16:52", texto: "Sim, é lindíssima. Ainda está disponível?" },
      {
        id: 3, de: "eu", dia: "Hoje", hora: "09:10", tipo: "pedido", estado: "pendente",
        obra: { titulo: "Memórias de Luanda", imagem: "https://picsum.photos/seed/obra-1-2/200/250", precoKz: 185000 },
      },
      { id: 4, de: "outro", dia: "Hoje", hora: "09:42", texto: "Está sim! Recebi o teu pedido." },
      { id: 5, de: "outro", dia: "Hoje", hora: "09:43", texto: "Consigo enviar para Luanda esta semana, se fecharmos hoje." },
    ],
  },
  {
    id: 2,
    nome: "Galeria Kianda",
    perfil: "galeria",
    verificado: true,
    foto: null,
    perfilTo: "/galeria/1",
    naoLidas: 0,
    mensagens: [
      { id: 1, de: "outro", dia: "Ontem", hora: "11:05", texto: "Bom dia! Gostaríamos de convidar-te para a exposição \"Raízes e Futuros\"." },
      { id: 2, de: "eu", dia: "Ontem", hora: "11:30", texto: "Que ótima notícia! Podem enviar os detalhes?" },
      { id: 3, de: "outro", dia: "Ontem", hora: "11:41", texto: "Claro. A abertura é a 14 de março, na sala principal." },
    ],
  },
  {
    id: 3,
    nome: "Carlos Mendes",
    perfil: "colecionador",
    verificado: false,
    foto: null,
    perfilTo: null,
    naoLidas: 1,
    mensagens: [
      { id: 1, de: "outro", dia: "Hoje", hora: "08:20", texto: "Bom dia. Tenho interesse numa das tuas obras de escultura." },
      {
        id: 2, de: "outro", dia: "Hoje", hora: "08:21", tipo: "pedido", estado: "pendente",
        obra: { titulo: "Forma Viva", imagem: "https://picsum.photos/seed/obra-3-1/200/250", precoKz: 240000 },
      },
    ],
  },
  {
    id: 4,
    nome: "Inês Cardoso",
    perfil: "artista",
    verificado: true,
    foto: null,
    perfilTo: "/artista/2",
    naoLidas: 0,
    mensagens: [
      { id: 1, de: "eu", dia: "Seg", hora: "14:10", texto: "Adorei a tua última série de fotografias." },
      { id: 2, de: "outro", dia: "Seg", hora: "14:35", texto: "Muito obrigada! Vou publicar mais obras em breve 🙂" },
    ],
  },
  {
    id: 5,
    nome: "Espaço Mira",
    perfil: "galeria",
    verificado: true,
    foto: null,
    perfilTo: "/galeria/2",
    naoLidas: 0,
    mensagens: [
      { id: 1, de: "outro", dia: "Dom", hora: "18:00", texto: "Obrigado por te teres juntado à nossa lista de artistas convidados." },
    ],
  },
];