// config.js
// Dynamically determine the API base URL based on the current window location
const getBaseUrl = () => {
    if (import.meta.env.VITE_API_URL) {
        return import.meta.env.VITE_API_URL;
    }
    // Default to Port 3000 on the current host (works for localhost and LAN IPs)
    const { protocol, hostname } = window.location;
    return `${protocol}//${hostname}:3000`;
};

export const BASE_URL = getBaseUrl();