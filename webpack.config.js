const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");

module.exports = (env) => {
    return {
        mode: "development",
        devtool: "source-map",
        devServer: {
            historyApiFallback: true,
            static: path.resolve(__dirname, "./public"),
            open: true,
            compress: true,
            hot: true,
            port: 8080,
        },

        entry: {
            main: path.resolve(__dirname, "./src/index.js"),
        },

        output: {
            path: path.resolve(__dirname, "./dist"),
            filename: "[name].bundle.js",
        },

        plugins: [
            new HtmlWebpackPlugin({
                title: "webpack Boilerplate",
                template: path.resolve(__dirname, "./public/index.html"), // template file
                filename: "index.html", // output file
                hash: true,
            }),
            new CleanWebpackPlugin(),
            new webpack.HotModuleReplacementPlugin(),
            new Dotenv({
                path: `./environments/.env.${env.file}`,
            }),
        ],

        module: {
            rules: [
                // JavaScript
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: ["babel-loader"],
                },
                // Images
                {
                    test: /\.(?:ico|gif|png|jpg|jpeg)$/i,
                    type: "asset/resource",
                },
                // Fonts and SVGs
                {
                    test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
                    type: "asset/inline",
                },
                // CSS and Sass
                {
                    test: /\.(scss|css)$/,
                    use: ["style-loader", "css-loader", "sass-loader"],
                },
                // Loader
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: "babel-loader",
                    },
                },
            ],
        },

        resolve: {
            extensions: [".ts", ".js", ".json", ".tsx"],
        },
    };
};
