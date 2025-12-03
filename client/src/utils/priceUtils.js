export const MULTIPLIER = 1.25;

export const convertToINR = (chinaPrice, rmbRate) => {
  const cp = parseFloat(chinaPrice);
  if (!isFinite(cp) || !rmbRate) return 0;

  const finalRMB = cp * MULTIPLIER;
  const rawINR = finalRMB * rmbRate;

  // extract decimal
  const decimal = rawINR - Math.floor(rawINR);

  // apply your rounding rule
  if (decimal >= 0.5) {
    return Math.ceil(rawINR);   // round up
  } else {
    return Math.floor(rawINR);  // round down
  }
};
