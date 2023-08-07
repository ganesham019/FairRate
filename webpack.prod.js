const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    mode: "production",
    devtool: false,
    // devtool: 'source-map',
    output: {
        filename: "js/bundle.js",
        path: path.resolve(__dirname, "build"),
        assetModuleFilename: "images/[name].[hash][ext]"
    },
    module: {
        rules: [
            {
                test: /\.(png|jpg|gif|svg|webp)$/,
                type: 'asset/resource'
            },
            {
                test: /\.html/i,
                use: [{
                    loader: "html-loader",
                }]
            },
            {
                test: /\.scss$/i,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    'css-loader',
                    'postcss-loader',
                    "sass-loader",
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