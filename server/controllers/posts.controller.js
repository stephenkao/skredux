/*global require, module */

(function () {
    'use strict';

    var mongojs = require('mongojs'),
        db = mongojs('stephenkao', ['posts']),
        MongoClient, PostsController;

    PostsController = {
        getOne: function (postId) {
        },

        /**
         * Get multiple posts
         *
         * @param {!Object} queryOptions
         * @param {Object=} sortOptions
         */
        getMultiple: function (queryOptions, sortOptions) {
        },

        /**
         * Get the latest posts
         */
        getLatest: function (callback) {
            db.posts.find().sort({_id : -1}, callback);
        }
    };

    module.exports = PostsController;
})();
