/*global require, process, __dirname */

(function () {
    var keystone = require('keystone');
    keystone.init({
        'name': 'skredux',
        'favicon': 'public/favicon.ico',
        'less': 'public',
        'static': ['public'],
        'views': 'templates/views',
        'view engine': 'jade',
        'auto update': true,
        'mongo': 'mongodb://localhost/my-project',
        'session': true,
        'auth': true,
        'user model': 'User',
        'cookie secret': '(your secret here)'
    });
    require('./models');
    keystone.set('routes', require('./routes'));

	////////// AJAX calls
    keystone.get('/what', function (request, response) {
        console.log('what');
		response.setHeader('Content-Type', 'application/json');
		response.end(JSON.stringify({'what': 'blah'}));
    });

    keystone.start();
})();
