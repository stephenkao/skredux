/*global require, exports, module */

(function () {
    'use strict';

    var keystone = require('keystone'),
        http = require('http');

    exports = module.exports = function(req, res) {
        var view = new keystone.View(req, res),
            locals = res.locals;

        locals.section = 'sexyvideos';

        // Make the request to GIPHY to get a sexy GIF
	    view.on('init', function (next) {
            http.get({
                host: 'api.giphy.com',
                path: '/v1/gifs/search?q=static&api_key=dc6zaTOxFJmzC'
            }, function (response, err) {
                // Continuously update stream with data
                var body = '';

                response.on('data', function(d) {
                    body += d;
                });

                response.on('end', function() {
                    body = JSON.parse(body);
                    locals.data = body.data;
                    next(err);
                });
            });
        });

        view.render('sexyvideos');
    };
}());
