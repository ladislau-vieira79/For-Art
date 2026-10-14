
// Dados de exemplo — troca por um fetch à tua API
// (ex: GET /api/feed, GET /api/artistas/top-semana, GET /api/artistas/sugestoes)

export const mockPosts = [
  {
    id: 1,
    autor: "Osvaldo Vieira",
    avatar: null,
    tempo: "há 2 horas",
    imagem: "https://picsum.photos/seed/post1/700/700",
    Titulo:"Carcere Mental",
    legenda: " A minha mais recente exploração sobre liberdade e rotina.",
    likes: 238,
    comentarios: 14,
    partilhas: 6,
    curtidoInicial: false,
    precoKz: 185000,
  },
  {
    id: 2,
    autor: "Inês Cardoso",
    avatar: null,
    tempo: "há 5 horas",
    imagem: "https://picsum.photos/seed/post2/700/700",
    legenda: "Fragmentos de memória, acrílico sobre tela, 80x100cm.",
    likes: 412,
    comentarios: 31,
    partilhas: 18,
    curtidoInicial: true,
    precoKz: 320000,
  },
  
  {
    id: 3,
    autor: "Tomás Neto",
    avatar: null,
    tempo: "há 8 horas",
    imagem: "https://picsum.photos/seed/post3/700/700",
    legenda: "Ruído azul — peça digital, parte da série 'Interferência'.",
    likes: 156,
    comentarios: 9,
    partilhas: 3,
    curtidoInicial: false,
    precoKz: 62000,
  },
];

export const mockTopSemana = [
  { id: 1, nome: "David Mendes", foto: null, visualizacoesSemana: 4650 },
  { id: 2, nome: "Osvaldo Vieira", foto: null, visualizacoesSemana: 3200 },
  { id: 3, nome: "Inês Cardoso", foto: null, visualizacoesSemana: 2750 },
  { id: 4, nome: "Amara Duarte", foto: null, visualizacoesSemana: 2480 },
];

export const mockSugestoes = [
  { id: 5, nome: "Léa Fonseca", tecnica: "Pintura", foto: null },
  { id: 6, nome: "Rui Sousa", tecnica: "Escultura", foto: null },
  { id: 7, nome: "Marta Lopes", tecnica: "Ilustração", foto: null },
];