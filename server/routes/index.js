/*global require, module, exports, process, __dirname */

(function () {
    'use strict';

    var keystone = require('keystone'),
        middleware = require('./middleware'),
        importRoutes = keystone.importer(__dirname),
        views = importRoutes('./views'),
        PostsController = require('../controllers/posts.controller'),
        serviceCallback;

    /**
     * A wrapper callback for when a Mongo error comes back
     */
    serviceCallback = function(response) {
        return function(err, obj) {
            if (err) {
                response.send(500);
            } else {
                response.send(obj);
            }
        };
    };

    // Common Middleware
    keystone.pre('routes', middleware.initErrorHandlers);
    keystone.pre('routes', middleware.initLocals);
    keystone.pre('render', middleware.flashMessages);

    /*
	// Handle 404 errors
	keystone.set('404', function(req, res, next) {
		res.notfound();
	});

	// Handle other errors
	keystone.set('500', function(err, req, res, next) {
		var title, message;
		if (err instanceof Error) {
			message = err.message;
			err = err.stack;
		}
		res.err(err, title, message);
	});
     */

    // Retrieve
    exports = module.exports = function(app) {
		// Views
        app.get(/^\/(index)?$/, views.index);
//        app.get(/^\/(blog)?$/, views.blog);

        // AJAX
        app.get('/posts/latest', function (request, response) {
            PostsController.getLatest(serviceCallback(response));
        });

        ////////// Static files
        app.get(/^(.+[css|svg|js|ttf|woff])$/, function(request, response){
            var filename = process.cwd() + request.params[0];
            response.sendfile(filename);
        });
    };
}());
