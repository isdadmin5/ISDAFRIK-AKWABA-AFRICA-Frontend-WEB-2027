// Nous définissons ici une fonction utilitaire pour formater les montants en devise, en utilisant l'API Intl.NumberFormat de JavaScript.
export function formatCurrency(amount: number, currency = "XOF", locale = "fr-FR"): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}
