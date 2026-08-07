import { BASE_URL } from "../config";

/**
 * Ensures a product image URL is valid and absolute.
 * Handles relative paths from the backend and corrects 'localhost' 
 * if accessing via a different hostname (e.g., mobile testing).
 */
export const getSafeImageUrl = (url) => {
    if (!url) return "/images/no-image.png";

    let cleanUrl = "";
    if (typeof url === 'string') {
        cleanUrl = url;
    } else if (Array.isArray(url) && url.length > 0) {
        cleanUrl = url[0];
    }

    if (!cleanUrl || typeof cleanUrl !== 'string') return "/images/no-image.png";

    // Handle backslashes from Windows paths
    cleanUrl = cleanUrl.replace(/\\/g, '/');

    if (cleanUrl.startsWith('http')) {
        // If the URL contains localhost but we are not on localhost (mobile testing)
        if (cleanUrl.includes('localhost') && window.location.hostname !== 'localhost') {
            return cleanUrl.replace('localhost', window.location.hostname);
        }
        return cleanUrl;
    }

    // For relative paths (e.g., "uploads/image.jpg" or "/uploads/image.jpg"), prepend BASE_URL
    const separator = cleanUrl.startsWith('/') ? '' : '/';
    return `${BASE_URL}${separator}${cleanUrl}`;
};
