/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'primary-gold': '#b28e44',
                'primary-gold-light': '#f4e9cf',
                'primary-gold-dark': '#8e7136',
                'deep-black': '#0a0a0b',
                'soft-black': '#1a1a1c',
                'charcoal': '#2d2d30',
                'warm-gray': '#7a766a',
                'soft-gray': '#f8f8f7',
                'off-white': '#fafaf9',
                'pure-white': '#ffffff',
            },
            fontFamily: {
                display: ['Cormorant Garamond', 'serif'],
                heading: ['Outfit', 'Montserrat', 'sans-serif'],
                body: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
