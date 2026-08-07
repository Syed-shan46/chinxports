// server/services/rmbRate.js
const axios = require("axios");

let RMB_RATE = 12;  // fallback
let lastUpdated = null;

async function updateRate() {
  try {
    // open.er-api.com returns rates as res.data.rates.<CUR>
    const res = await axios.get("https://open.er-api.com/v6/latest/CNY", { timeout: 8000 });

    if (res.data?.rates?.INR) {
      RMB_RATE = Number(res.data.rates.INR);
      lastUpdated = new Date();
      console.log("🔥 Updated RMB Rate:", RMB_RATE, "at", lastUpdated.toISOString());
    } else {
      console.warn("Unexpected API response for RMB rate:", res.data);
    }
  } catch (err) {
    console.warn("Failed to update RMB rate:", err.message || err);
  }
}

// run at startup
updateRate();
// refresh every 6 hours
setInterval(updateRate, 6 * 60 * 60 * 1000);

module.exports = {
  getRmbRate: () => RMB_RATE,
  getLastUpdated: () => lastUpdated,
  updateRate
};
