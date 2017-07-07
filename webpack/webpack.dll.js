/**
 * WEBPACK DLL GENERATOR
 *
 * This profile is used to cache webpack's module
 * contexts for external library and framework type
 * dependencies which will usually not change often enough
 * to warrant building them from scratch every time we use
 * the webpack process.
 */

const path = require('path');
const fs = require('fs');
const webpack = require('webpack');

const pkg  = require(path.join(process.cwd(), 'package.json'));

// If dllPlugin not defined in package - exit;
if (!pkg.dllPlugin) { process.exit(0); }


const DllConfig = {
    version: pkg.version,

    /**
     * The DLL Plugin provides a dramatic speed increase to webpack build and hot module reloading
     * by caching the module metadata for all of our npm dependencies. We enable it by default
     * in development.
     *
     *
     * To disable the DLL Plugin, set this value to false.
     */
    path: pkg.dllPlugin.path,
    packageName: pkg.dllPlugin.packageName,
};


if (!pkg.dllPlugin) {
    process.exit(0);
}

const outputPath = path.join(process.cwd(), DllConfig.path);

const dllManifestPath = path.join(outputPath, 'package.json');

const exists = fs.existsSync;
const writeFile = fs.writeFileSync;


/**
 * Create a manifest so npm install doesn't warn us
 */
if (!exists(dllManifestPath)) {
    // First try to create path in node modules because it may absent
    fs.mkdir(outputPath, null, ()=>{
        writeFile(
            dllManifestPath,
            JSON.stringify({
                name: pkg.dllPlugin.packageName,
                private: true,
                author: pkg.author,
                repository: pkg.repository,
                version: pkg.version,
            }, null, 2),
            'utf8'
        );
    });
}

const webpackConfigDll = {
    context: process.cwd(),
    entry: {
        [DllConfig.packageName]: [
            'react',
            'react-dom',
            'react-router',
            'react-router-dom',
            'react-transition-group',
            'react-redux',
            'prop-types',
            'redux',
            'redux-saga',
            'reselect',
            'axios',
            'lodash',
            'core-js',
            'react-hot-loader',
            'babel-polyfill',
            'bem-cl',
            'copy-to-clipboard',
            'react-jsonschema-form',
            'react-json-tree',
            'react-bootstrap',
            'moment'
        ],
    },
    devtool: 'eval',
    output: {
        filename: '[name].dll.js',
        path: outputPath,
        library: '[name]',
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.DllPlugin({name: '[name]', path: path.join(outputPath, '[name].json') }),
    ],
    performance: {
        hints: false,
    },
};

module.exports = webpackConfigDll;
