const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    entry: "./src/js/index.ts",
    mode: process.env.NODE_ENV === "production" ? "production" : "development",
    module: {        
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader",
                exclude: /node_modules/,
              },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: "asset/resource",
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/i,
                type: "asset/resource",
            },
        ],
    },
    resolve: {
        extensions: [".ts", ".js"],
      },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js",
        clean: true,
    },
    optimization: {
        minimizer: ["...", new CssMinimizerPlugin()],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "./img", to: "./img" },
                { from: "./fonts", to: "./fonts" },
            ],
        }),
        new MiniCssExtractPlugin(),
        new HtmlWebpackPlugin({
            template: "./index.html",
        }),
    ],

    devtool:
        process.env.NODE_ENV === "production"
            ? "hidden-source-map"
            : "source-map",
};
