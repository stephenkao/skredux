/*global window, module, require */

/**
 * A global object that stores global information...globally
 */

'use strict';

////////// Dependencies
var Basil = require('./lib/basil.min');

////////// Set up storage
var basil = new Basil({
    namespace: 'syk',
    storages: ['local', 'cookie'],
    expireDays: 365
});

module.exports = {
    basil: basil
};
