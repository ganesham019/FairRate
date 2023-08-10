const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "development",
    devtool: 'source-map',
    entry: "./src/index.js",
    devServer: {
        port: 3000
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                type: 'asset/resource'  // emitts a seperate file and export the URL
            },
            {
                test: /\.html/i,
                use: [{
                    loader: "html-loader",
                }]
            },
            {
                test: /\.(s?)css$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader', //convert css into common js format (js array format)
                    'postcss-loader', //adding vendor prefix
                    "sass-loader", //sass to css,
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: "index.html",
            template: "./src/pages/index.html",
            inject: "body",
        }),
        new MiniCssExtractPlugin({
            filename: "css/index.css"
        }),
    ]
}