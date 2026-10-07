import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    darkMode: "class",
    theme: {
        extend: {
            fontFamily: {
                sans: ["Inter", "sans-serif"],
                mono: ["Fira Code", "monospace"],
            },
            colors: {
                primary: {
                    50: "#f0f4ff",
                    100: "#e0eaff",
                    200: "#c7d8ff",
                    300: "#a4bdff",
                    400: "#7b94ff",
                    500: "#6366f1",
                    600: "#4f46e5",
                    700: "#4338ca",
                    800: "#3730a3",
                    900: "#312e81",
                },
                accent: {
                    400: "#a78bfa",
                    500: "#8b5cf6",
                    600: "#7c3aed",
                },
                dark: {
                    900: "#0a0a0f",
                    800: "#111118",
                    700: "#1a1a27",
                    600: "#222236",
                    500: "#2d2d4a",
                },
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "hero-glow": "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(99,102,241,0.3), transparent)",
            },
            animation: {
                "float": "float 6s ease-in-out infinite",
                "pulse-glow": "pulse-glow 2s ease-in-out infinite",
                "slide-up": "slideUp 0.5s ease forwards",
            },
            keyframes: {
                float: {
                    "0%, 100%": { transform: "translateY(0)" },
                    "50%": { transform: "translateY(-20px)" },
                },
                "pulse-glow": {
                    "0%, 100%": { opacity: "1" },
                    "50%": { opacity: "0.5" },
                },
                slideUp: {
                    from: { transform: "translateY(20px)", opacity: "0" },
                    to: { transform: "translateY(0)", opacity: "1" },
                },
            },
            boxShadow: {
                glow: "0 0 20px rgba(99,102,241,0.4)",
                "glow-lg": "0 0 40px rgba(99,102,241,0.3)",
            },
        },
    },
    plugins: [
        require("@tailwindcss/typography"),
    ],
};

export default config;
