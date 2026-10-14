
// Taxas de câmbio de EXEMPLO, fixas no código — só para teres o componente
// funcional durante o desenvolvimento.
//
// IMPORTANTE: antes de ires para produção, troca isto por uma chamada a uma
// API de câmbio real (ex: exchangerate-api.com, open.er-api.com, ou o
// provedor que a tua stack de pagamentos já usar), com cache de algumas
// horas — taxas de câmbio mudam todos os dias e não devem ficar fixas
// no código de um site em produção.

export const MOEDAS = [
  { codigo: "AOA", nome: "Kwanza", simbolo: "Kz", taxaDesdeKz: 1 },
  { codigo: "USD", nome: "Dólar americano", simbolo: "$", taxaDesdeKz: 1 / 920 },
  { codigo: "EUR", nome: "Euro", simbolo: "€", taxaDesdeKz: 1 / 1000 },
  { codigo: "BRL", nome: "Real brasileiro", simbolo: "R$", taxaDesdeKz: 1 / 180 },
  { codigo: "MZN", nome: "Metical", simbolo: "MT", taxaDesdeKz: 1 / 14.5 },
  { codigo: "CVE", nome: "Escudo cabo-verdiano", simbolo: "$", taxaDesdeKz: 1 / 16.6 },
];

export function converterPreco(precoKz, moeda) {
  const valor = precoKz * moeda.taxaDesdeKz;

  // AOA/MZN/CVE sem casas decimais (mais natural para estas moedas em
  // valores altos); USD/EUR/BRL com 2 casas decimais.
  const casasDecimais = ["AOA", "MZN", "CVE"].includes(moeda.codigo) ? 0 : 2;

  const numeroFormatado = valor.toLocaleString("pt-PT", {
    minimumFractionDigits: casasDecimais,
    maximumFractionDigits: casasDecimais,
  });

  return `${moeda.simbolo} ${numeroFormatado}`;
}