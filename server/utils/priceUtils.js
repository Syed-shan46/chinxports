const RMB_RATE = 13.15;
const MULTIPLIER = 1.25;

function convertToINR(price) {
  const cp = parseFloat(price);
  if (!isFinite(cp)) return 0;
  const finalRMB = cp * MULTIPLIER;
  return Math.round(finalRMB * RMB_RATE);
}

module.exports = { convertToINR };
