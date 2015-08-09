/*global require, module, exports, process, __dirname */

'use strict';

var cookieParser = require('cookie-parser'),
    keystone = require('keystone'),
    middleware = require('./middleware'),
    importRoutes = keystone.importer(__dirname),
    views = importRoutes('./views');

// Common Middleware
keystone.pre('routes', middleware.initErrorHandlers);
keystone.pre('routes', middleware.initLocals);
keystone.pre('render', middleware.flashMessages);
keystone.pre('render', middleware.increaseCorruption);

 // Handle 404 errors
keystone.set('404', function (req, res, next) {
    res.notfound();
});

// Handle other errors
/*
keystone.set('500', function(err, req, res, next) {
    var title, message;
    if (err instanceof Error) {
        message = err.message;
        err = err.stack;
    }
    //        res.err(err, title, message);
    res.send(500);
});
*/

// Retrievals
exports = module.exports = function (app) {
    // Views
    app.get(/^\/(index)?$/, views.index);
    app.get(/^\/(blog)?$/, views.blog);
    app.get('/post/:slug', views.post);
    app.get(/^\/(jobs)?$/, views.jobs);
    app.get(/^\/(sexyvideos)?$/, views.sexyvideos);

    ////////// Static files
    app.get(/^(.+[css|svg|js|ttf|woff])$/, function(req, res) {
        var filename = process.cwd() + req.params[0];
        res.sendfile(filename);
    });
};
