export function FormatRealValue(numero) {
  const formatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });

  const valorFormatado = formatter.format(numero);

  return valorFormatado;
}
