/*global require, module */

var keystone = require('keystone');

module.exports = function (req, res) {
    var view = new keystone.View(req, res);

    view.render('errors/500');
};
