// Opções do formulário e "envio" simulado — troca por um fetch à tua API
// (ex: POST /api/obras com FormData: campos + ficheiros de imagem)

export const TECNICAS = ["Pintura", "Escultura", "Fotografia", "Arte Digital", "Ilustração"];

export const EDICOES = ["Peça única", "Edição limitada", "Edição aberta"];

// Galerias com que o artista tem contrato (vêm do perfil do user logado)
export const GALERIAS_DO_ARTISTA = [
  { id: 1, nome: "Galeria Horizonte" },
  { id: 2, nome: "Espaço Contemporâneo" },
];

export const LIMITE_IMAGENS = 4;
export const TAMANHO_MAX_MB = 5;

// Simula o pedido ao servidor. Quando tiveres API, troca por:
//   const dados = new FormData(); ... ; const r = await fetch("/api/obras", { method: "POST", body: dados });
export function publicarObra(dados) {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log("Obra publicada (simulação):", dados);
      resolve({ id: 102 }); // id devolvido pelo servidor
    }, 900);
  });
}