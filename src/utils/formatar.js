// Formatação de números usada em toda a plataforma.
// O toLocaleString("pt-PT") não separa milhares com 4 dígitos (1310 fica
// "1310"), o que deixava os números inconsistentes ("1310" vs "185 000").
// Aqui o separador é sempre um espaço sem quebra: 1 310 · 185 000 · 2 400 000
export function formatarNumero(valor) {
  const n = Math.round(Number(valor) || 0);
  return String(n).replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

// "Kz 185 000"
export function formatarKz(valor) {
  return `Kz ${formatarNumero(valor)}`;
}
