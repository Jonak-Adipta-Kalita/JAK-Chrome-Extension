const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
module.exports = {
    mode: "production",
    entry: {
        background: path.resolve(__dirname, "src", "background.ts"),
        popup: path.resolve(__dirname, "src", "popup", "script.ts"),
    },
    output: {
        path: path.join(__dirname, "dist"),
        filename: (pathData) => {
            return pathData.chunk.name === "main"
                ? "[name].js"
                : "[name]/[name].js";
        },
    },
    resolve: {
        extensions: [".ts", ".js"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                loader: "ts-loader",
                exclude: /node_modules/,
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{ from: ".", to: ".", context: "public" }],
        }),
    ],
};
