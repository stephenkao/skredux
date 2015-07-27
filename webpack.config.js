/*global module, require */

var path = require('path');

module.exports = {
    entry: './source/javascript/index.js',
    output: {
        filename: 'index.js',
        path: './target/javascript/'
    },
    resolve: {
        root: path.resolve('./source'),
        alias: {
            js: 'javascript'
        },
        extensions: ['', '.js', '.json']
    }
};
