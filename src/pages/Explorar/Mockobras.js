
// Dados de exemplo — troca por um fetch à tua API
// (ex: GET /api/obras?categoria=...&tecnica=...&pais=...&ordenar=...)
//
// "imagem" usa picsum.photos só para termos algo visível durante o
// desenvolvimento. Substitui pelo caminho real da foto de cada obra.

export const CATEGORIAS = ["Pintura", "Escultura", "Fotografia", "Arte digital", "Ilustração"];
export const TECNICAS = ["Óleo", "Acrílico", "Aguarela", "Nanquim", "Digital", "Mista"];
export const PAISES = ["Angola", "Portugal", "Brasil", "Moçambique", "Cabo Verde"];

export const Mockobras = [
  { id: 1, Titulo_obra: "Cárcere Mental", Nome_artista: "Osvaldo Vieira", Categoria_Artista: "Pintura", Tecnica: "Óleo", Pais: "Angola", precoNumero: 185000, views: 3200, criadoEm: "2026-09-20" },
  { id: 2, Titulo_obra: "Ruído Azul", Nome_artista: "Tomás Neto", Categoria_Artista: "Arte digital", Tecnica: "Digital", Pais: "Portugal", precoNumero: 62000, views: 1450, criadoEm: "2026-09-24" },
  { id: 3, Titulo_obra: "Silêncio Violeta", Nome_artista: "Amara Duarte", Categoria_Artista: "Fotografia", Tecnica: "Digital", Pais: "Brasil", precoNumero: null, views: 2870, criadoEm: "2026-09-18" },
  { id: 4, Titulo_obra: "Duas Margens", Nome_artista: "Rui Sousa", Categoria_Artista: "Escultura", Tecnica: "Mista", Pais: "Moçambique", precoNumero: 240000, views: 980, criadoEm: "2026-09-22" },
  { id: 5, Titulo_obra: "Terra e Sol", Nome_artista: "Léa Fonseca", Categoria_Artista: "Pintura", Tecnica: "Acrílico", Pais: "Cabo Verde", precoNumero: 98000, views: 1650, criadoEm: "2026-09-15" },
  { id: 6, Titulo_obra: "Horizonte Partido", Nome_artista: "David Mendes", Categoria_Artista: "Arte digital", Tecnica: "Digital", Pais: "Angola", precoNumero: 120000, views: 4100, criadoEm: "2026-09-26" },
  { id: 7, Titulo_obra: "Retrato em Cinza", Nome_artista: "Marta Lopes", Categoria_Artista: "Ilustração", Tecnica: "Nanquim", Pais: "Portugal", precoNumero: 45000, views: 720, criadoEm: "2026-09-10" },
  { id: 8, Titulo_obra: "Vento Sul", Nome_artista: "Kiese Bento", Categoria_Artista: "Pintura", Tecnica: "Óleo", Pais: "Angola", precoNumero: 156000, views: 2210, criadoEm: "2026-09-21" },
  { id: 9, Titulo_obra: "Corpo e Sombra", Nome_artista: "Ana Ribeiro", Categoria_Artista: "Fotografia", Tecnica: "Digital", Pais: "Brasil", precoNumero: 73000, views: 1340, criadoEm: "2026-09-17" },
  { id: 10, Titulo_obra: "Cidade Suspensa", Nome_artista: "Nuno Alves", Categoria_Artista: "Arte digital", Tecnica: "Digital", Pais: "Portugal", precoNumero: null, views: 3980, criadoEm: "2026-09-27" },
].map((obra, i) => ({
  ...obra,
  imagem: `https://picsum.photos/seed/forart${i}/500/620`,
  Preco: obra.precoNumero ? `${obra.precoNumero.toLocaleString("pt-PT")} Kz` : "Sob consulta",
}));