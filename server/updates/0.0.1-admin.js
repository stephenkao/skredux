/*global require, exports, module */

(function () {
    'use strict';

    var keystone = require('keystone'),
        User = keystone.list('User');

    exports = module.exports = function(done) {
        new User.model({
            name: {
                first: 'Stephen',
                last: 'Kao'
            },
            email: 'stephen.yuchen.kao@gmail.com',
            password: 'admin',
            canAccessKeystone: true
        }).save(done);
    };
}());
