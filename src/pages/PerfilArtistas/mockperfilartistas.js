// Dados de exemplo dos perfis — troca por um fetch à tua API
// (ex: GET /api/artistas/:id)
//
// Os perfis são construídos a partir da MESMA lista da página Artistas
// (mockArtistas), por isso o artista em que o user clica no card é sempre
// o mesmo que aparece no perfil. Aqui só acrescentamos o que o perfil
// precisa a mais (bio, capa, obras, exposições, redes).

import { mockArtistas } from "../Artistas/mockArtistas";

const TITULOS_POR_TECNICA = {
  Pintura: ["Cárcere Mental", "Memórias de Luanda", "Rosto Coletivo", "Horizonte Urbano", "Identidade Fragmentada", "Raízes"],
  Escultura: ["Forma Viva", "Peso do Tempo", "Elo", "Corpo de Barro", "Silêncio em Bronze", "Equilíbrio"],
  Fotografia: ["Luz de Fim de Tarde", "Rua Vazia", "Olhar Distante", "Mercado ao Amanhecer", "Sombras", "Travessia"],
  "Arte Digital": ["Ruído Azul", "Interferência #1", "Pixel e Memória", "Neon Tropical", "Sinal Perdido", "Camadas"],
  Ilustração: ["Jardim Imaginário", "Conversa à Janela", "Pequenos Gigantes", "Viagem de Papel", "Fio de Cor", "Quintal"],
};

const GALERIAS = ["Galeria Horizonte", "Espaço Contemporâneo", "Casa das Artes", "Atelier Sul"];

function slug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "");
}

export function obterPerfilArtista(id) {
  const base = mockArtistas.find((a) => a.id === Number(id));
  if (!base) return null; // a página mostra "artista não encontrado"

  const titulos = TITULOS_POR_TECNICA[base.tecnica] ?? TITULOS_POR_TECNICA.Pintura;
  const obras = titulos.map((titulo, i) => ({
    id: base.id * 100 + i + 1,
    titulo,
    imagem: `https://picsum.photos/seed/obra-${base.id}-${i + 1}/500/625`,
    precoKz: 60000 + ((base.id * 37 + i * 53) % 30) * 10000,
  }));

  return {
    id: base.id,
    nome: base.nome,
    utilizador: `@${slug(base.nome)}`,
    verificado: base.seguidores >= 1500,
    foto: base.foto,
    capa: `https://picsum.photos/seed/capa-artista-${base.id}/1440/320`,
    localizacao: `${base.Cidade}, ${base.pais}`,
    tecnica: base.tecnica,
    membroDesde: String(2022 + (base.id % 3)),
    bio: `${base.nome} é artista de ${base.tecnica.toLowerCase()} baseado(a) em ${base.Cidade}. O seu trabalho explora identidade, memória e o quotidiano, e já foi mostrado em galerias parceiras da For Art.`,
    stats: {
      obras: obras.length,
      seguidores: base.seguidores,
      visualizacoesSemana: base.visualizacoesSemana,
    },
    redes: {
      instagram: `@${slug(base.nome)}.art`,
      site: `www.${slug(base.nome)}.com`,
    },
    obras,
    exposicoes: [
      {
        id: 1,
        titulo: `${titulos[0]} — exposição individual`,
        galeria: GALERIAS[base.id % GALERIAS.length],
        periodo: "12 Mar — 30 Abr 2026",
        estado: "em-curso",
      },
      {
        id: 2,
        titulo: "Memória Coletiva",
        galeria: GALERIAS[(base.id + 1) % GALERIAS.length],
        periodo: "10 Jan — 20 Fev 2025",
        estado: "encerrada",
      },
    ],
  };
}