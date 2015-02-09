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
        'mongo': 'mongodb://localhost/stephenkao',
        'session': true,
        'auth': true,
        'user model': 'User',
        'cookie secret': 'pooploop',

        'cloudinary config': {
            cloud_name: 'djzskuqmo',
            api_key: '133465838845996',
            api_secret: 'zBX7CGYjl62SoYckhSEhbXdKc0g'
        },
        'cloudinary prefix': 'keystone',
        'cloudinary folders': true
    });

    require('./models');
    keystone.set('routes', require('./routes'));
    keystone.start();
})();
