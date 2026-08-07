const RMB_RATE = 14.7;
const MULTIPLIER = 1.25;

function convertToINR(price) {
  const cp = parseFloat(price);
  if (!isFinite(cp)) return 0;
  const finalRMB = cp * MULTIPLIER;
  return Math.round(finalRMB * RMB_RATE);
}

module.exports = { convertToINR };
