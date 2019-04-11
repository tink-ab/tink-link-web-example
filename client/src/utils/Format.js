export const formatNumber = number => parseFloat(number).toFixed(2);

export const formatDate = date => {
  const month = date.getMonth() + 1;
  return (
    date.getFullYear() +
    "-" +
    month.toString().padStart(2, "0") +
    "-" +
    date.getDate()
  );
};
