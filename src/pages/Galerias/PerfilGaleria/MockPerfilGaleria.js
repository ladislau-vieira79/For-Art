// Dados de exemplo dos perfis de galeria — troca por um fetch à tua API
// (ex: GET /api/galerias/:id)
//
// O perfil é construído a partir da MESMA lista da página Galerias
// (mockGalerias), por isso a galeria em que o user clica no card é sempre
// a mesma que aparece no perfil. Os artistas representados vêm da lista
// da página Artistas.

import { mockGalerias } from "../Mockgalerias";
import { mockArtistas } from "../../Artistas/mockArtistas";

const TITULOS_OBRAS = [
  "Cárcere Mental", "Memórias de Luanda", "Horizonte Urbano",
  "Forma Viva", "Luz de Fim de Tarde", "Ruído Azul",
  "Raízes", "Peso do Tempo", "Travessia",
];

const EXPOSICOES = [
  { titulo: "Memória Coletiva", periodo: "12 Mar — 30 Abr 2026", local: "Sala principal", estado: "em-curso" },
  { titulo: "Raízes e Futuros", periodo: "10 Jan — 20 Fev 2026", local: "Espaço anexo", estado: "encerrada" },
  { titulo: "Luz do Sul", periodo: "05 Set — 30 Out 2025", local: "Sala principal", estado: "encerrada" },
];

function slug(nome) {
  return nome
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\s+/g, "");
}

export function obterPerfilGaleria(id) {
  const base = mockGalerias.find((g) => g.id === Number(id));
  if (!base) return null; // a página mostra "galeria não encontrada"

  // 6 artistas representados (escolha determinística, para o exemplo)
  const artistas = Array.from({ length: 6 }, (_, i) =>
    mockArtistas[(base.id * 2 + i) % mockArtistas.length]
  );

  // uma obra em destaque por artista
  const obras = artistas.map((a, i) => ({
    id: base.id * 1000 + a.id * 10 + i,
    titulo: TITULOS_OBRAS[(base.id + i) % TITULOS_OBRAS.length],
    artista: a.nome,
    imagem: `https://picsum.photos/seed/galeria-${base.id}-obra-${i + 1}/500/625`,
    precoKz: 80000 + ((base.id * 31 + i * 47) % 25) * 10000,
  }));

  const cidade = base.localizacao.split(",")[0];

  return {
    id: base.id,
    nome: base.nome,
    verificada: base.verificada,
    foto: base.foto,
    capa: `https://picsum.photos/seed/capa-galeria-${base.id}/1440/320`,
    localizacao: base.localizacao,
    areaInteresse: base.areaInteresse,
    membroDesde: String(2022 + (base.id % 3)),
    sobre: `A ${base.nome} é um espaço dedicado a ${base.areaInteresse.toLowerCase()} em ${cidade}. Trabalha com artistas emergentes e consagrados, organiza exposições regulares e aproxima o público de novos talentos através da For Art.`,
    areas: [base.areaInteresse, "Artistas emergentes", "Exposições"],
    stats: {
      artistas: artistas.length,
      obras: obras.length * 8,
      exposicoes: EXPOSICOES.length,
      seguidores: 900 + base.id * 410,
    },
    artistas,
    obras,
    exposicoes: EXPOSICOES.map((e, i) => ({ id: i + 1, ...e })),
    contacto: {
      morada: `Rua das Artes, ${10 + base.id * 3} — ${base.localizacao}`,
      email: `contacto@${slug(base.nome)}.com`,
      telefone: `+244 9${base.id}0 000 000`,
      site: `www.${slug(base.nome)}.com`,
      instagram: `@${slug(base.nome)}`,
    },
  };
}