/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                background: '#09090b', // Zinc 950
                surface: '#18181b', // Zinc 900
                surfaceHighlight: '#27272a', // Zinc 800
                primary: '#2563eb', // Blue 600
                primaryHover: '#1d4ed8', // Blue 700
                danger: '#ef4444', // Red 500
                success: '#22c55e', // Green 500
                warning: '#f59e0b', // Amber 500
                text: '#f4f4f5', // Zinc 100
                textMuted: '#a1a1aa', // Zinc 400
                border: '#27272a', // Zinc 800
            }
        },
    },
    plugins: [],
}
