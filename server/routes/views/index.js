/*global require, exports, module */

var keystone = require('keystone'),
    _ = require('underscore');

exports = module.exports = function(req, res) {
    var view = new keystone.View(req, res),
        locals = res.locals;

    locals.data = {
        posts: []
    };

    locals.section = 'index';

    if (req.cookies.hasOwnProperty('skcorrupt')) {
        debugger;
    }

    // Load the posts
    view.on('init', function(next) {

        var q = keystone.list('Post').model.find()
                .where('state', 'published')
                .populate('author categories')
                .sort('-publishedDate')
                .limit(3);

        q.exec(function(err, results) {
            var posts = _.pluck(results, '_doc');

            locals.moment = require('moment');
            locals.data.posts = posts;

            next(err);
        });

    });

    view.render('index');
};
