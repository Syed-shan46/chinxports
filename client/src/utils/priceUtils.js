// Convert RMB → INR (same logic as ProductDetails)
export const RMB_RATE = 13.15;
export const MULTIPLIER = 1.25;

export const convertToINR = (chinaPrice) => {
  const cp = parseFloat(chinaPrice);
  if (!isFinite(cp)) return 0;
  const finalRMB = cp * MULTIPLIER;
  return Math.round(finalRMB * RMB_RATE);
};
