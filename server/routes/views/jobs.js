/*global require, exports, module */

(function () {
    'use strict';

    var keystone = require('keystone');

    exports = module.exports = function(req, res) {
        var view = new keystone.View(req, res),
            locals = res.locals;

        locals.section = 'jobs';

        view.render('jobs');
    };
}());
