/** @type {import('tailwindcss').Config} */
module.exports = {
    mode: "jit",
    darkMode: "class",
    content: ["./**/*.tsx"],
    theme: {
        extend: {
            fontFamily: {
                sans: ["DMSans", "sans-serif"],
            },
        },
    },
    plugins: [],
};
