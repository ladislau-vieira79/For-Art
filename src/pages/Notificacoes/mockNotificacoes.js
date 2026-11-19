// Dados de exemplo — troca por um fetch à tua API
// (ex: GET /api/notificacoes  e  PATCH /api/notificacoes/:id/lida)
//
// tipo:  "pedido" | "mensagem" | "seguidor" | "curtida" | "exposicao" | "venda" | "sistema"
// grupo: "Hoje" | "Ontem" | "Anteriores"  (na API, calcula a partir da data)
// to:    rota para onde a notificação leva ao clicar

export const mockNotificacoes = [
  {
    id: 1, tipo: "pedido", grupo: "Hoje", hora: "09:10", lida: false,
    texto: "Carlos Mendes enviou um pedido de compra para “Forma Viva”.",
    to: "/mensagens",
  },
  {
    id: 2, tipo: "mensagem", grupo: "Hoje", hora: "08:42", lida: false,
    texto: "Osvaldo Vieira respondeu à tua mensagem.",
    to: "/mensagens",
  },
  {
    id: 3, tipo: "seguidor", grupo: "Hoje", hora: "07:55", lida: false,
    texto: "Galeria Kianda começou a seguir-te.",
    to: "/galeria/1",
  },
  {
    id: 4, tipo: "curtida", grupo: "Ontem", hora: "19:30", lida: true,
    texto: "Inês Cardoso e mais 12 pessoas gostaram de “Memórias de Luanda”.",
    to: "/obra/102",
  },
  {
    id: 5, tipo: "exposicao", grupo: "Ontem", hora: "11:05", lida: true,
    texto: "Galeria Kianda convidou-te para a exposição “Raízes e Futuros”.",
    to: "/galeria/1",
  },
  {
    id: 6, tipo: "venda", grupo: "Anteriores", hora: "Seg", lida: true,
    texto: "A tua obra “Cárcere Mental” foi vendida por Kz 130 000.",
    to: "/obra/101",
  },
  {
    id: 7, tipo: "seguidor", grupo: "Anteriores", hora: "Dom", lida: true,
    texto: "Amara Duarte começou a seguir-te.",
    to: "/artista/3",
  },
  {
    id: 8, tipo: "sistema", grupo: "Anteriores", hora: "Sáb", lida: true,
    texto: "Bem-vindo à For Art! Completa o teu perfil para teres mais visibilidade.",
    to: "/",
  },
];