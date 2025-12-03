const axios = require("axios");

let RMB_RATE = 10;  // fallback

async function updateRate() {
    try {
        const res = await axios.get("https://open.er-api.com/v6/latest/CNY");

        if (res.data?.rates?.INR) {
            RMB_RATE = res.data.rates.INR;
            console.log("🔥 Updated RMB Rate:", RMB_RATE);
        } else {
            console.log("Unexpected API response:", res.data);
        }
    } catch (err) {
        console.log("Failed to update RMB rate:", err.message);
    }
}

// Run immediately
updateRate();

// Update every 6 hours
setInterval(updateRate, 6 * 60 * 60 * 1000);

module.exports = {
    getRmbRate: () => RMB_RATE
};
