export const MULTIPLIER = 1.15; // Reverted to Old Multiplier
export const FIXED_RMB = 15.2; // Reverted to Old RMB Rate

export const convertToINR = (chinaPrice) => {
  const cp = parseFloat(chinaPrice);
  if (!isFinite(cp)) return 0;

  const finalRMB = cp * MULTIPLIER;
  const rawINR = finalRMB * FIXED_RMB;

  // extract decimal
  const decimal = rawINR - Math.floor(rawINR);

  // apply your rounding rule
  if (decimal >= 0.5) {
    return Math.ceil(rawINR);   // round up
  } else {
    return Math.floor(rawINR);  // round down
  }
};
