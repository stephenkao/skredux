/*global require, exports, __dirname */

var _ = require('underscore'),
    keystone = require('keystone'),
    importRoutes = keystone.importer(__dirname),
    views = importRoutes('./views');

/**
 Initialises the standard view locals.
 Include anything that should be initialised before route controllers are executed.
 */
exports.initLocals = function(req, res, next) {
    var locals = res.locals;

    locals.user = req.user;
    locals.moment = require('moment');
    locals.data = locals.data || {};

    next();
};

/**
 Inits the error handler functions into `res`
 */
exports.initErrorHandlers = function(req, res, next) {

    res.notfound = function(title, message) {
        res.status(404).render('errors/404', {
            errorTitle: title,
            errorMsg: message
        });
    };

    res.err = function(err, title, message) {
        res.status(500).render('errors/500', {
            err: err,
            errorTitle: title,
            errorMsg: message
        });
    };

    next();
};

/**
 Fetches and clears the flashMessages before a view is rendered
 */
exports.flashMessages = function(req, res, next) {

    var flashMessages = {
        info: req.flash('info'),
        success: req.flash('success'),
        warning: req.flash('warning'),
        error: req.flash('error')
    };

    res.locals.messages = _.any(flashMessages, function(msgs) {
        return msgs.length;
    }) ? flashMessages : false;

    next();
};

/**
 * Queries current corruption level and increments it
 */
exports.increaseCorruption = function (req, res, next) {
    var locals = res.locals,
        corruption = 0;

    if (req.query.corruption) {
        corruption = parseInt(req.query.corruption, 10);
    } else {
        corruption = parseInt(req.cookies.skcorrupt, 10);

        // Increment corruption level
        // @TODO: Remove this when there's interactivity on the site!
        corruption = (corruption + 1) % 5;
        res.cookie('skcorrupt', corruption, {
            maxAge: 900000,
            httpOnly: false
        });
    }

    locals.corruption = corruption;
    next();
};
