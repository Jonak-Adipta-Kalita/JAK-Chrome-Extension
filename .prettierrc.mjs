/**
 * @type {import('prettier').Options}
 */
export default {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    trailingComma: "es5",
    bracketSpacing: true,
    bracketSameLine: true,
    plugins: [
        "@ianvs/prettier-plugin-sort-imports",
        "prettier-plugin-tailwindcss",
    ],
    importOrder: [
        "<BUILTIN_MODULES>", // Node.js built-in modules
        "<THIRD_PARTY_MODULES>", // Imports not matched by other special words or groups.
        "", // Empty line
        "^@plasmo/(.*)$",
        "",
        "^@plasmohq/(.*)$",
        "",
        "^~(.*)$",
        "",
        "^[./]",
    ],
};
