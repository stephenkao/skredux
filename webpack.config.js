/*global module, require */

var path = require('path'),
    webpack = require('webpack');

module.exports = {
    module: {
        loaders: [{
            test: /.js?$/,
            loader: 'babel-loader',
            exclude: [path.resolve('node_modules')],
            query: {
                cacheDirectory: true,
                optional: ['runtime'],
                stage: 0
            }
        }]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js')
    ],

    resolve: {
        root: path.resolve('source'),
        alias: {
            js: 'javascript'
        },
        extensions: ['', '.js', '.json', 'jsx']
    },

    entry: {
        index: path.resolve('source/javascript/index.js'),
        vendor: [
            'react',
            'jquery'
        ]
    },
    output: {
        filename: 'index.js',
        path: './target/javascript/',
        publicPath: './target/javascript/'
    },

    watch: true
};
