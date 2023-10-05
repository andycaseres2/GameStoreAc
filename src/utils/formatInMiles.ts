export function formatInMiles(numeroString: string): string {
  const numero = parseFloat(numeroString);
  return numero.toLocaleString();
}
