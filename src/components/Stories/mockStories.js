// Dados de exemplo — troca por um fetch à tua API
// (ex: GET /api/stories  -> só stories das últimas 24h
//      POST /api/stories -> publicar um novo story, com FormData)
//
// Cada item é um ARTISTA com os seus stories. "visto" passa a true quando o
// user abre o story.

export const DURACAO_STORY_MS = 5000;

// O user logado (quem publica). Vem do login quando o tiveres.
export const euArtista = { id: 0, nome: "Tu", foto: null };

export const mockStories = [
  {
    id: 1, nome: "Osvaldo Vieira", foto: null, visto: false,
    stories: [
      { id: 101, imagem: "https://picsum.photos/seed/story-1a/540/960", legenda: "A trabalhar na nova série em Luanda 🎨", hora: "há 2 h", obraId: 102 },
      { id: 102, imagem: "https://picsum.photos/seed/story-1b/540/960", legenda: "Detalhe da tela, ainda a secar.", hora: "há 1 h" },
    ],
  },
  {
    id: 2, nome: "Inês Cardoso", foto: null, visto: false,
    stories: [
      { id: 201, imagem: "https://picsum.photos/seed/story-2a/540/960", legenda: "Nova escultura a chegar à galeria!", hora: "há 4 h" },
    ],
  },
  {
    id: 3, nome: "Amara Duarte", foto: null, visto: false,
    stories: [
      { id: 301, imagem: "https://picsum.photos/seed/story-3a/540/960", legenda: "Luz de fim de tarde em Maputo.", hora: "há 6 h" },
      { id: 302, imagem: "https://picsum.photos/seed/story-3b/540/960", legenda: "", hora: "há 5 h" },
      { id: 303, imagem: "https://picsum.photos/seed/story-3c/540/960", legenda: "Próxima exposição: 14 de março.", hora: "há 5 h" },
    ],
  },
  {
    id: 8, nome: "David Mendes", foto: null, visto: true,
    stories: [
      { id: 801, imagem: "https://picsum.photos/seed/story-8a/540/960", legenda: "Processo criativo 🖥️", hora: "há 9 h" },
    ],
  },
  {
    id: 9, nome: "Kiese Bento", foto: null, visto: false,
    stories: [
      { id: 901, imagem: "https://picsum.photos/seed/story-9a/540/960", legenda: "Atelier aberto este sábado.", hora: "há 11 h" },
    ],
  },
];