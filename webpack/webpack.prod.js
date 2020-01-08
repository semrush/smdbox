const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const webpack = require('webpack');

const PUBLIC_PATH = '/';
const APP_FOLDER = 'src';

const isDist = process.env.IS_DIST === 'true';

const BUILD_FOLDER = isDist ? 'dist' : 'build';

const POSTCSS_LOADER = {
    loader: 'postcss-loader',
    options: {
        plugins: () => {
            return [
                require('autoprefixer')
            ];
        }
    }
};

const webpackConfigWidget = {
    entry: {
        app: [
            'babel-polyfill',
            path.join(process.cwd(), APP_FOLDER, 'index.jsx')
        ]
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
            }, {
                test: /\.css$/,
                include: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', POSTCSS_LOADER, 'resolve-url-loader']
                })
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader', POSTCSS_LOADER, 'resolve-url-loader', 'sass-loader?sourceMap']
                })
            },
            {
                test: /\.(png|jpg|svg)$/,
                exclude: [
                    /node_modules/,
                ],
                loader: 'url-loader?limit=10000000',
            },
            {
                test: /\.svg$/,
                include: [/node_modules/],
                loader: `svg-sprite-loader?${
                    JSON.stringify({
                        name: '[hash:8]_[name]',
                    })
                }`
            },
            {
                test: /\.json$/,
                loader: 'json-loader',
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin([BUILD_FOLDER], {
            root: path.resolve(__dirname, '../'),
            verbose: false
        }),
        new ExtractTextPlugin(isDist ? '[name].css' : '[name].[hash].css'),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: `${APP_FOLDER}/assets/html/index.html`,
            minify: false,
            inject: 'body',
        }),
        new webpack.ContextReplacementPlugin(/moment[\/\\]locale/, /en|ru/), // eslint-disable-line no-useless-escape, max-len
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
            __DEV__: JSON.stringify(false),
            __PROD__: JSON.stringify(true),
        }),
        new webpack.NamedModulesPlugin(),

    ],
    resolve: {
        modules: [APP_FOLDER, 'node_modules'],
        extensions: [
            '.js',
            '.jsx',
        ],
    },
    output: {
        path: path.resolve(process.cwd(), BUILD_FOLDER),
        publicPath: PUBLIC_PATH,
        filename: isDist ? '[name].js' : '[name].[hash].js',
        chunkFilename: isDist ? 'chunk.[name].js' : 'chunk.[name].[hash].js'
    }
};

module.exports = webpackConfigWidget;
