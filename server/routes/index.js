/*global require, module, exports, process, __dirname */

(function () {
	var keystone = require('keystone'),
	    middleware = require('./middleware'),
	    importRoutes = keystone.importer(__dirname);

	var assetsDir = '../../target/';

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

	// Bind Routes
	var routes = {
		views: importRoutes('./views')
	};

	// Retrieve

	var PostsData = require('../data/posts');
	exports = module.exports = function(app) {
		// Views
		app.get(/^\/(index)?$/, routes.views.index);

		// AJAX
		app.get('/blog/latest', function (request, response) {
			PostsData.getLatest();

			response.setHeader('Content-Type', 'application/json');
			response.end(JSON.stringify({'what': 'blah'}));
		});

		////////// Static files
		app.get(/^(.+[css|svg|js|ttf|woff])$/, function(request, response){
			var filename = process.cwd() + request.params[0];
			response.sendfile(filename);
		});

		/*
		 app.get('/what', function (request, response) {
		 console.log('what');
		 });
		 */
	};
})();
