// Dados de exemplo da obra — troca por um fetch à tua API
// (ex: GET /api/obras/:id)
//
// A obra é encontrada nas MESMAS listas que os perfis usam (artistas e
// galerias), por isso a obra em que o user clica é sempre a que aparece aqui.

import { mockArtistas } from "../Artistas/mockArtistas";
import { mockGalerias } from "../Galerias/Mockgalerias";
import { obterPerfilArtista } from "../PerfilArtistas/mockperfilartistas";
import { obterPerfilGaleria } from "../Galerias/PerfilGaleria/MockPerfilGaleria";

const MATERIAIS = {
  Pintura: { material: "Óleo sobre tela", dim: "80 × 100 cm" },
  Escultura: { material: "Bronze e barro", dim: "45 × 30 × 30 cm" },
  Fotografia: { material: "Impressão fine art em papel algodão", dim: "60 × 90 cm" },
  "Arte Digital": { material: "Impressão digital em tela", dim: "70 × 70 cm" },
  Ilustração: { material: "Aguarela e tinta-da-china", dim: "40 × 50 cm" },
};

function montar(base, artista, extra = {}) {
  const info = MATERIAIS[artista.tecnica] ?? MATERIAIS.Pintura;
  return {
    id: base.id,
    titulo: base.titulo,
    imagem: base.imagem,
    imagens: [0, 1, 2].map((n) =>
      n === 0 ? base.imagem : `https://picsum.photos/seed/obra-${base.id}-detalhe-${n}/500/625`
    ),
    precoKz: base.precoKz,
    disponivel: base.id % 7 !== 0,
    tecnica: artista.tecnica,
    material: info.material,
    dimensoes: info.dim,
    ano: 2022 + (base.id % 4),
    edicao: artista.tecnica === "Fotografia" || artista.tecnica === "Arte Digital" ? "Edição limitada de 10" : "Peça única",
    descricao: `“${base.titulo}” faz parte da produção recente de ${artista.nome}. A obra explora identidade, memória e o quotidiano, e foi concebida em ${artista.Cidade}. Acompanha certificado de autenticidade assinado pelo artista.`,
    artista: {
      id: artista.id,
      nome: artista.nome,
      Cidade: artista.Cidade,
      pais: artista.pais,
      foto: artista.foto,
    },
    galeria: null,
    ...extra,
  };
}

export function obterObra(id) {
  const n = Number(id);

  // 1) obras publicadas no perfil de um artista
  for (const a of mockArtistas) {
    const perfil = obterPerfilArtista(a.id);
    const o = perfil?.obras.find((x) => x.id === n);
    if (o) return montar(o, a);
  }

  // 2) obras em destaque de uma galeria
  for (const g of mockGalerias) {
    const perfil = obterPerfilGaleria(g.id);
    const o = perfil?.obras.find((x) => x.id === n);
    if (o) {
      const a = mockArtistas.find((x) => x.nome === o.artista) ?? mockArtistas[0];
      return montar(o, a, { galeria: { id: g.id, nome: g.nome } });
    }
  }

  return null; // a página mostra "obra não encontrada"
}

// Outras obras do mesmo artista (para a secção "Mais deste artista")
export function obterOutrasObras(obra, limite = 4) {
  const perfil = obterPerfilArtista(obra.artista.id);
  return (perfil?.obras ?? []).filter((o) => o.id !== obra.id).slice(0, limite);
}