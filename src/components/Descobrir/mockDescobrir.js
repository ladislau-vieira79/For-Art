// Dados e regras da secção "Descobrir" (visibilidade para novos talentos).
// Troca cada parte por um fetch à tua API quando tiveres backend:
//   GET /api/destaques/novos-talentos   GET /api/destaques/artista-da-semana
//   GET /api/colecoes                   GET /api/colecoes/:slug

import { mockArtistas } from "../../pages/Artistas/mockArtistas";
import { obterPerfilArtista } from "../../pages/PerfilArtistas/mockperfilartistas";

/* ------------------------------------------------------------------ */
/* 1) NOVOS TALENTOS — rotação justa                                   */
/* ------------------------------------------------------------------ */

// Um artista é "novo talento" enquanto tiver menos seguidores do que isto.
// (Na API, usa antes a data de adesão: ex. "menos de 12 meses na plataforma".)
export const LIMITE_SEGUIDORES_NOVO = 1500;

const UM_DIA_MS = 24 * 60 * 60 * 1000;

// Regra de ouro: NÃO ordena por popularidade. A cada dia, a "janela" de
// artistas avança, por isso, ao fim de alguns dias, TODOS os novos talentos
// tiveram exatamente o mesmo número de dias em destaque.
export function selecionarNovosTalentos(quantidade = 4, data = new Date()) {
  const novos = mockArtistas
    .filter((a) => a.seguidores < LIMITE_SEGUIDORES_NOVO)
    .sort((a, b) => a.id - b.id); // ordem fixa e neutra

  if (novos.length <= quantidade) return novos;

  const dia = Math.floor(data.getTime() / UM_DIA_MS);
  const inicio = (dia * quantidade) % novos.length;
  return Array.from({ length: quantidade }, (_, i) => novos[(inicio + i) % novos.length]);
}

/* ------------------------------------------------------------------ */
/* 2) ARTISTA DA SEMANA — escolhido por um curador                     */
/* ------------------------------------------------------------------ */

export const ARTISTA_DA_SEMANA = {
  artistaId: 6,
  semana: "Semana de 24 a 30 de novembro",
  curador: { nome: "Curadoria For Art", cargo: "Equipa de curadoria" },
  // Na API, o texto vem do curador convidado.
  texto:
    "Rui Sousa trabalha o barro e o metal como quem escuta uma conversa antiga. As suas peças falam de travessia e de laços entre margens. É um escultor a seguir de perto.",
};

export function obterArtistaDaSemana() {
  const artista = mockArtistas.find((a) => a.id === ARTISTA_DA_SEMANA.artistaId);
  if (!artista) return null;
  const perfil = obterPerfilArtista(artista.id);
  return { ...ARTISTA_DA_SEMANA, artista, obras: perfil ? perfil.obras.slice(0, 3) : [] };
}

/* ------------------------------------------------------------------ */
/* 3) COLEÇÕES TEMÁTICAS — curadas por pessoas                         */
/* ------------------------------------------------------------------ */

const COLECOES = [
  {
    slug: "luanda-hoje",
    titulo: "Luanda hoje",
    descricao: "A cidade vista por quem vive nela: ruas, ruído, memória e futuro.",
    curador: "Curadoria For Art",
    artistaIds: [1, 6, 9],
    cor: ["#155eef", "#0b3b91"],
  },
  {
    slug: "memoria-e-identidade",
    titulo: "Memória e identidade",
    descricao: "Obras que escavam o passado para perceber quem somos.",
    curador: "Curadoria For Art",
    artistaIds: [2, 3, 5],
    cor: ["#ff6b00", "#b84a00"],
  },
  {
    slug: "cor-e-luz",
    titulo: "Cor e luz",
    descricao: "Fotografia, ilustração e arte digital onde a cor manda.",
    curador: "Curadoria For Art",
    artistaIds: [4, 7, 8, 10],
    cor: ["#7c3aed", "#4c1d95"],
  },
];

function montarObras(artistaIds) {
  return artistaIds.flatMap((id) => {
    const perfil = obterPerfilArtista(id);
    if (!perfil) return [];
    return perfil.obras.slice(0, 2).map((o) => ({ ...o, artista: perfil.nome, tecnica: perfil.tecnica }));
  });
}

export function listarColecoes() {
  return COLECOES.map((c) => ({ ...c, totalObras: montarObras(c.artistaIds).length }));
}

export function obterColecao(slug) {
  const c = COLECOES.find((x) => x.slug === slug);
  return c ? { ...c, obras: montarObras(c.artistaIds) } : null;
}