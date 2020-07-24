const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const pkg  = require(path.join(process.cwd(), 'package.json'));
const AutoDllPlugin = require('autodll-webpack-plugin');
const APP_PORT = 4500;
const APP_FOLDER = 'src';
const BUILD_FOLDER = 'build';

const vendor = Object.keys(pkg.dependencies);

const webpackConfig = {
    entry: {
        app: [
            'babel-polyfill',
            'react-hot-loader/patch',
            `webpack-dev-server/client?http://localhost:${APP_PORT}`,
            'webpack/hot/only-dev-server',
            path.join(process.cwd(), APP_FOLDER, 'index.jsx')
        ]
    },

    // Don't use hashes in dev mode for better performance
    output: {
        path: path.resolve(process.cwd(), BUILD_FOLDER),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].chunk.js',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test:    /\.css$/,
                include: /node_modules/,
                use:     ['style-loader', 'css-loader', 'resolve-url-loader'],
            },
            {
                test:    /\.scss$/,
                exclude: /node_modules/,
                use:     ['style-loader', 'css-loader', 'resolve-url-loader', 'sass-loader?sourceMap'],
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: [
                    /node_modules/,
                    /Icon/, // Icon`s svgs use svg-sprite-loader
                ],
                loader: 'url-loader?limit=10000',
            },
            {
                test: /\.svg$/,
                include: [/node_modules/],
                loader: 'svg-sprite-loader?' + JSON.stringify({
                    name: '[hash:8]_[name]',
                }),
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    },
    plugins: [
        // ...getDllPlugin(),
        new webpack.HotModuleReplacementPlugin(), // Tell webpack we want hot reloading
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /en|ru/), // eslint-disable-line no-useless-escape, max-len
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${APP_FOLDER}/assets/html/index.dev.html`,
            minify: false,
            inject: 'head',
        }),
        new AutoDllPlugin({
            inject: true,
            filename: '[name].js',
            entry: { vendor },
        }),
        new CircularDependencyPlugin({
            exclude: /a\.js|node_modules/, // exclude node_modules
            failOnError: false, // show a warning when there is a circular dependency
        }),
        new webpack.DefinePlugin({
            __DEV__: JSON.stringify(true),
            __PROD__: JSON.stringify(false),
        }),
        new webpack.NamedModulesPlugin(),
        // ...getAddAssetsPlugin()
    ],
    resolve: {
        modules: [APP_FOLDER, 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
        ],
    },
    cache: true,
    devtool: 'cheap-module-eval-source-map',
    target: 'web', // Make web variables accessible to webpack, e.g. window
    performance: {
        hints: false,
    },
    devServer: {
        port: APP_PORT,
        host: 'localhost',
        hot: true,
        stats: {
            assets: false,
            cached: false,
            children: false,
            chunks: false,
            chunkModules: false,
            modules: false,
            colors: true,
            errors: true,
            version: false,
            timings: true
        },
        historyApiFallback: true,
    },
};

module.exports = webpackConfig;
