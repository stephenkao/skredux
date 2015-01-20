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

exports = module.exports = function(app) {
	////////// Static files
	app.get(/^(.+[css|svg|js])$/, function(request, response){
        var what = process.cwd() + request.params[0];
        console.log(what);
		response.sendfile(what);
	});

	// Views
	app.get('/', routes.views.index);
//	app.get('/blog/:category?', routes.views.blog);
//	app.get('/blog/post/:post', routes.views.post);

    app.get('/what', function (request, response) {
        console.log('what');
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify({'what': 'blah'}));
    });
};
