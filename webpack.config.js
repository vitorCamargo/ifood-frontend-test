const fs = require('fs');
const path = require('path');
const lessToJs = require('less-vars-to-js');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');


const isProduction = process.env.NODE_ENV === 'production' || false;

module.exports = {
    entry: {
        main: path.join(__dirname, 'src', 'index.js'),
    },
    output: {
        publicPath: '/',
        path: path.join(__dirname, 'dist'),
        filename: isProduction ? '[name].[contenthash].js' : '[name].bundle.js',
    },
    devServer: {
        hot: true,
        port: 8080,
        compress: true,
        historyApiFallback: true,
        contentBase: path.join(__dirname, 'dist'),
    },
    optimization: {
        chunkIds: 'named',
        runtimeChunk: {
            name: entrypoint => `runtime_${entrypoint.name}`,
        },
        splitChunks: {
            cacheGroups: {
                vendor: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                },
            },
        },
    },
    module: {
        rules: [
            {
                test: /.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                options: {
                    plugins: [[
                        'import', {
                            libraryName: 'antd',
                            style: true,
                        },
                    ]],
                },
            },
            {
                test: /\.css$/, loader: 'style-loader!css-loader',
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {},
                    },
                ],
            },
            {
                test: /\.(gif|otf|eot|woff|woff2|ttf|svg)$/,
                loaders: [
                    'url-loader',
                ],
            },
            {
                test: /\.less$/,
                use: [{
                    loader: 'style-loader',
                }, {
                    loader: 'css-loader',
                }, {
                    loader: 'less-loader',
                    options: {
                        javascriptEnabled: true,
                        modifyVars: lessToJs(fs.readFileSync(
                            path.join(__dirname, 'assets', 'less', 'main.less'),
                            'utf8',
                        )),
                    },
                }],
            },
        ],
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
    },
    plugins: [
        new HtmlWebPackPlugin({
            minify: true,
            filename: 'index.html',
            template: path.join(__dirname, 'src', 'index.html'),
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
};
