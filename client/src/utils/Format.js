export function formatNumber(number) {
  return parseFloat(number).toFixed(2);
}

export function formatDate(date) {
  const month = date.getMonth() + 1;
  return date.getFullYear() + '-' + month.toString().padStart(2, '0') + '-' + date.getDate();
}
