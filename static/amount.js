export const calculateAmount = (scale, unscaledValue) => {
  if (typeof scale === 'string' && typeof unscaledValue === 'string') {
    return 10 ** -parseInt(scale, 10) * parseInt(unscaledValue, 10);
  }

  if (typeof scale === 'number' && typeof unscaledValue === 'number') {
    return 10 ** -scale * unscaledValue;
  }

  return NaN;
};
